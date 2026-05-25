import json
from fastapi import FastAPI, HTTPException, Request, Response, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from utils.carbon_data import get_carbon_intensity
from db.database import create_table, insert_log, get_logs, create_user, get_user_by_email
from auth.auth import (
    hash_password, verify_password,
    create_access_token,
    get_current_user, get_optional_user
)
import joblib
from pathlib import Path
import numpy as np
import pandas as pd

app = FastAPI(title="GHG Platform Backend")


@app.middleware("http")
async def add_cors_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response


@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str):
    return Response(
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
    )


def load_model_and_metrics():
    model_path = Path(__file__).parent / "ml" / "model.pkl"
    metrics_path = Path(__file__).parent / "ml" / "model_metrics.json"

    loaded_model = None
    loaded_metrics = {}

    try:
        loaded_model = joblib.load(model_path)
        print(f"Model loaded from {model_path}")
    except Exception as e:
        print(f"Error loading model: {e}")
        loaded_model = None

    if metrics_path.exists():
        try:
            loaded_metrics = json.loads(metrics_path.read_text())
        except Exception as e:
            print(f"Error loading model metrics: {e}")
            loaded_metrics = {}
    else:
        print(f"Metrics file not found at {metrics_path}")

    return loaded_model, loaded_metrics


model, model_metrics = load_model_and_metrics()


@app.on_event("startup")
def startup():
    create_table()


def get_current_model_name():
    if model_metrics and model_metrics.get("model_name"):
        return model_metrics["model_name"]
    return model.__class__.__name__ if model else "Unknown"


def get_anomaly_threshold():
    return float(model_metrics.get("anomaly_threshold", 0))


def get_emissions_statistics():
    return {
        "mean": float(model_metrics.get("emissions_mean", 0)),
        "std": float(model_metrics.get("emissions_std", 0)),
        "threshold": get_anomaly_threshold(),
    }


def compute_efficiency_score(predicted_emissions: float) -> int:
    stats = get_emissions_statistics()
    mean = stats["mean"] if stats["mean"] > 0 else 100
    score = int(round(max(0, 100 * (1 - (predicted_emissions / max(mean, 1)) * 0.9))))
    return max(0, min(100, score))


def generate_recommendations(predicted_emissions: float, carbon_intensity: float, region: str, storage: float) -> list:
    recommendations = []
    stats = get_emissions_statistics()
    mean = stats["mean"]
    std = stats["std"]

    if predicted_emissions > stats["threshold"] and stats["threshold"] > 0:
        recommendations.append("Unusually high emissions detected. Consider reducing workload or shifting to lower-carbon infrastructure.")
    elif mean > 0 and predicted_emissions > mean:
        recommendations.append("Current emissions are higher than average. Optimize compute and storage usage.")
    else:
        recommendations.append("Your predicted emissions are within a normal range. Keep optimizing for efficiency.")

    if carbon_intensity > 300:
        recommendations.append("Switch to region SE or another low-carbon region to reduce emissions.")
    elif region.upper() != "SE":
        recommendations.append("Try running workloads in region SE to lower carbon intensity.")

    if storage > 500:
        recommendations.append("Reduce storage usage where possible to improve efficiency.")
    else:
        recommendations.append("Storage usage is moderate. Maintain efficient storage policies.")

    if len(recommendations) > 5:
        recommendations = recommendations[:5]

    return recommendations


# ── Schemas ───────────────────────────────────────────────────────────────────

class EmissionInput(BaseModel):
    cpu: float
    ram: float
    storage: float
    region: str


class PredictionInput(BaseModel):
    cpu: float
    ram: float
    storage: float
    region: str


class SignupInput(BaseModel):
    username: str
    email: str
    password: str


class LoginInput(BaseModel):
    email: str
    password: str


# ── Auth endpoints ────────────────────────────────────────────────────────────

@app.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(data: SignupInput):
    if get_user_by_email(data.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    user_id = create_user(data.username, data.email, hash_password(data.password))
    if user_id is None:
        raise HTTPException(status_code=500, detail="Failed to create user")
    return {"message": "User created successfully"}


@app.post("/login")
def login(data: LoginInput):
    user = get_user_by_email(data.email)
    if not user or not verify_password(data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": str(user["id"]), "email": user["email"], "username": user["username"]})
    return {"access_token": token, "token_type": "bearer"}


# ── Core endpoints ────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "GHG Platform Backend Running"}


@app.post("/calculate")
def calculate_emissions(data: EmissionInput, current_user: dict = Depends(get_optional_user)):
    energy = data.cpu * 0.5 + data.ram * 0.2 + data.storage * 0.1
    carbon_intensity = get_carbon_intensity(data.region)
    emissions = energy * carbon_intensity / 1000

    user_id = int(current_user["sub"]) if current_user else None
    if user_id is not None:
        insert_log(data.cpu, data.ram, data.storage, data.region, energy, emissions, user_id)

    return {"energy": energy, "carbon_intensity": carbon_intensity, "emissions": emissions}


@app.get("/logs")
def fetch_logs(current_user: dict = Depends(get_current_user)):
    user_id = int(current_user["sub"])
    logs = get_logs(10, user_id=user_id)
    return {"logs": logs}


@app.post("/predict")
def predict_emissions(data: PredictionInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    try:
        carbon_intensity = get_carbon_intensity(data.region)
        features = pd.DataFrame(
            [[data.cpu, data.ram, data.storage, carbon_intensity]],
            columns=["cpu", "ram", "storage", "carbon_intensity"],
        )
        predicted_emissions = float(model.predict(features)[0])

        anomaly_threshold = get_anomaly_threshold()
        anomaly_detected = predicted_emissions > anomaly_threshold if anomaly_threshold > 0 else False
        efficiency_score = compute_efficiency_score(predicted_emissions)
        recommendations = generate_recommendations(predicted_emissions, carbon_intensity, data.region, data.storage)

        return {
            "cpu": data.cpu,
            "ram": data.ram,
            "storage": data.storage,
            "region": data.region,
            "carbon_intensity": carbon_intensity,
            "predicted_emissions": predicted_emissions,
            "efficiency_score": efficiency_score,
            "anomaly_detected": anomaly_detected,
            "model_used": get_current_model_name(),
            "recommendations": recommendations,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


@app.get("/model-metrics")
def get_model_metrics():
    return {
        "model_name": model_metrics.get("model_name", get_current_model_name()),
        "training_score": model_metrics.get("training_score"),
        "testing_score": model_metrics.get("testing_score"),
    }
