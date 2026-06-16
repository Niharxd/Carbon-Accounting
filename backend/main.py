import json
from datetime import datetime
from typing import List, Optional
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
from fpdf import FPDF

app = FastAPI(title="GHG Platform Backend")

import os

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:4173",
        os.environ.get("FRONTEND_URL", ""),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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


def compute_emissions(cpu: float, ram: float, storage: float, region: str) -> float:
    energy = cpu * 0.5 + ram * 0.2 + storage * 0.1
    carbon_intensity = get_carbon_intensity(region)
    return energy * carbon_intensity / 1000


def compute_efficiency_score(predicted_emissions: float) -> int:
    stats = get_emissions_statistics()
    mean = stats["mean"] if stats["mean"] > 0 else 100
    score = int(round(max(0, 100 * (1 - (predicted_emissions / max(mean, 1)) * 0.9))))
    return max(0, min(100, score))


def compute_sustainability_score(predicted_emissions: float, carbon_intensity: float, anomaly_detected: bool, efficiency_score: int) -> int:
    target = max(predicted_emissions / 100.0, 1)
    emissions_penalty = min(30, target * 12)
    intensity_penalty = min(20, carbon_intensity / 50)
    anomaly_penalty = 18 if anomaly_detected else 0
    efficiency_bonus = max(-10, min(25, (efficiency_score - 50) * 0.4))
    score = 78 - emissions_penalty - intensity_penalty - anomaly_penalty + efficiency_bonus
    return max(0, min(100, int(round(score))))


def get_sustainability_rating(score: int) -> str:
    if score >= 90:
        return "Excellent"
    if score >= 70:
        return "Good"
    if score >= 50:
        return "Moderate"
    return "Poor"


def get_region_carbon_intensities() -> dict:
    csv_path = Path(__file__).parent.parent / "data" / "carbon_intensity.csv"
    try:
        df = pd.read_csv(csv_path)
        return {row["region"]: float(row["carbon_intensity"]) for _, row in df.iterrows()}
    except Exception:
        return {}


def get_best_region(current_region: str) -> str:
    intensities = get_region_carbon_intensities()
    if not intensities:
        return current_region
    best = min(intensities, key=intensities.get)
    return best if intensities.get(best, 0) < intensities.get(current_region, 9999) else current_region


def compute_simulation(cpu: float, ram: float, storage: float, region: str) -> dict:
    current_emissions = compute_emissions(cpu, ram, storage, region)
    optimized_region = get_best_region(region)
    optimized_cpu = max(1.0, cpu * 0.82)
    optimized_ram = max(1.0, ram * 0.82)
    optimized_storage = max(10.0, storage * 0.85)
    optimized_emissions = compute_emissions(optimized_cpu, optimized_ram, optimized_storage, optimized_region)
    reduction_pct = round(max(0.0, (current_emissions - optimized_emissions) / max(current_emissions, 1) * 100), 2)
    carbon_saved = round(max(0.0, current_emissions - optimized_emissions), 2)
    return {
        "current_emissions": round(current_emissions, 2),
        "optimized_emissions": round(optimized_emissions, 2),
        "reduction_pct": reduction_pct,
        "carbon_saved": carbon_saved,
        "optimized_region": optimized_region,
        "optimized_cpu": optimized_cpu,
        "optimized_ram": optimized_ram,
        "optimized_storage": optimized_storage,
    }


def generate_recommendations(predicted_emissions: float, carbon_intensity: float, region: str, storage: float) -> list:
    recommendations = []
    stats = get_emissions_statistics()
    mean = stats["mean"]

    if predicted_emissions > stats["threshold"] and stats["threshold"] > 0:
        recommendations.append({
            "title": "Address high emission risk",
            "impact": "15-25%",
            "description": "Peak emissions are above safe thresholds. Reduce workload or shift to lower-carbon infrastructure."
        })
    elif mean > 0 and predicted_emissions > mean:
        recommendations.append({
            "title": "Optimize infrastructure usage",
            "impact": "8-18%",
            "description": "Current emissions are higher than your average. Lower CPU, RAM, or storage where possible."
        })
    else:
        recommendations.append({
            "title": "Maintain current efficiency",
            "impact": "5-10%",
            "description": "Emissions are within expected levels. Continue monitoring and optimize regularly."
        })

    if carbon_intensity > 300:
        recommendations.append({
            "title": "Switch region",
            "impact": "10-20%",
            "description": f"Move workload to a lower carbon intensity region such as {get_best_region(region)}."
        })
    elif region.upper() != "SE":
        recommendations.append({
            "title": "Try a cleaner region",
            "impact": "5-12%",
            "description": "Your current region is not the lowest carbon option. Test a greener region for lower emissions."
        })

    if storage > 500:
        recommendations.append({
            "title": "Reduce storage allocation",
            "impact": "6-14%",
            "description": "Storage contributes significantly to emissions. Trim unused capacity."
        })
    else:
        recommendations.append({
            "title": "Keep storage optimized",
            "impact": "3-8%",
            "description": "Your storage levels are moderate. Ensure unused data is archived."
        })

    if len(recommendations) > 5:
        recommendations = recommendations[:5]

    return recommendations


def generate_insights(predicted_emissions: float, carbon_intensity: float, efficiency_score: int, anomaly_detected: bool, storage: float, region: str) -> list:
    insights = []
    if storage > 500:
        insights.append("Storage contributes most to emissions. Consider archiving or pruning unused data.")
    if carbon_intensity > 300:
        insights.append("Current region has above-average carbon intensity. A lower-carbon region could reduce emissions.")
    else:
        insights.append("Your region is reasonably efficient for carbon intensity. Keep monitoring usage patterns.")
    if efficiency_score >= 80:
        insights.append("Infrastructure efficiency is strong and supports sustainability goals.")
    elif efficiency_score >= 60:
        insights.append("Efficiency is moderate; small infrastructure improvements can improve the score.")
    else:
        insights.append("Efficiency is below target. Optimizing CPU or RAM usage will help reduce emissions.")
    if anomaly_detected:
        insights.append("Anomaly status suggests a potential spike; review high-load tasks and infrastructure settings.")
    return insights


def compute_forecast(emission_values: list, days: int) -> list:
    if not emission_values:
        base = float(model_metrics.get("emissions_mean", 100))
        return [round(base, 2) for _ in range(days)]
    recent = emission_values[:max(3, min(len(emission_values), 7))]
    avg = sum(recent) / len(recent)
    trend = 0.0
    if len(recent) >= 2:
        trend = (recent[0] - recent[-1]) / max(len(recent) - 1, 1)
    return [round(max(0, avg + trend * (i + 1)), 2) for i in range(days)]


def get_forecast_data(user_id: Optional[int]) -> dict:
    logs = get_logs(30, user_id=user_id) if user_id else []
    emissions = [log["emissions"] for log in logs]
    if not emissions:
        mean = float(model_metrics.get("emissions_mean", 100))
        emissions = [mean] * 7
    return {
        "forecast_7": compute_forecast(emissions, 7),
        "forecast_30": compute_forecast(emissions, 30),
        "trend": "up" if len(emissions) >= 2 and emissions[0] > emissions[-1] else "down",
    }


def get_last_training_date() -> str:
    model_path = Path(__file__).parent / "ml" / "model.pkl"
    if model_path.exists():
        return datetime.fromtimestamp(model_path.stat().st_mtime).strftime("%Y-%m-%d")
    return "Unknown"


def generate_pdf_report(payload: dict) -> bytes:
    pdf = FPDF()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_font("Arial", "B", 18)
    pdf.cell(0, 10, "GHG Platform Sustainability Report", ln=True)
    pdf.set_font("Arial", "", 11)
    pdf.cell(0, 8, f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}", ln=True)
    pdf.ln(6)

    pdf.set_font("Arial", "B", 14)
    pdf.cell(0, 8, "Prediction Summary", ln=True)
    pdf.set_font("Arial", "", 11)
    summary = payload.get("summary", {})
    for key, value in [
        ("CPU", summary.get("cpu")),
        ("RAM", summary.get("ram")),
        ("Storage", summary.get("storage")),
        ("Region", summary.get("region")),
        ("Carbon Intensity", summary.get("carbon_intensity")),
        ("Predicted Emissions", f"{summary.get('predicted_emissions')} kg CO2"),
        ("Sustainability Score", f"{summary.get('sustainability_score')}/100"),
        ("Anomaly Status", "Yes" if summary.get("anomaly_detected") else "No"),
        ("Model", summary.get("model_used")),
    ]:
        if value is not None:
            pdf.cell(0, 8, f"{key}: {value}", ln=True)
    pdf.ln(4)

    pdf.set_font("Arial", "B", 14)
    pdf.cell(0, 8, "Recommendations", ln=True)
    pdf.set_font("Arial", "", 11)
    for rec in payload.get("recommendations", []):
        pdf.multi_cell(0, 7, f"- {rec.get('title')}: {rec.get('description')} ({rec.get('impact')})")
    pdf.ln(4)

    pdf.set_font("Arial", "B", 14)
    pdf.cell(0, 8, "Forecast Summary", ln=True)
    pdf.set_font("Arial", "", 11)
    forecast = payload.get("forecast", {})
    pdf.cell(0, 7, f"7-day forecast: {', '.join(str(x) for x in forecast.get('forecast_7', []))}", ln=True)
    pdf.cell(0, 7, f"30-day forecast sample: {', '.join(str(x) for x in forecast.get('forecast_30', [])[:5])} ...", ln=True)
    pdf.ln(4)

    pdf.set_font("Arial", "I", 10)
    pdf.cell(0, 7, "Generated by GHG Platform for sustainability decision support.", ln=True)
    return pdf.output(dest="S").encode("latin-1")


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
    try:
        user = get_user_by_email(data.email)
        if not user or not verify_password(data.password, user["hashed_password"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")

        token = create_access_token({
            "sub": str(user["id"]),
            "email": user["email"],
            "username": user["username"],
        })
        return {"access_token": token, "token_type": "bearer"}
    except HTTPException:
        raise
    except Exception as error:
        print(f"Login error: {error}")
        raise HTTPException(status_code=500, detail="Unable to process login at this time")


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
        sustainability_score = compute_sustainability_score(predicted_emissions, carbon_intensity, anomaly_detected, efficiency_score)
        sustainability_rating = get_sustainability_rating(sustainability_score)
        recommendations = generate_recommendations(predicted_emissions, carbon_intensity, data.region, data.storage)
        insights = generate_insights(predicted_emissions, carbon_intensity, efficiency_score, anomaly_detected, data.storage, data.region)
        simulation = compute_simulation(data.cpu, data.ram, data.storage, data.region)

        return {
            "cpu": data.cpu,
            "ram": data.ram,
            "storage": data.storage,
            "region": data.region,
            "carbon_intensity": carbon_intensity,
            "predicted_emissions": round(predicted_emissions, 2),
            "efficiency_score": efficiency_score,
            "sustainability_score": sustainability_score,
            "sustainability_rating": sustainability_rating,
            "anomaly_detected": anomaly_detected,
            "model_used": get_current_model_name(),
            "recommendations": recommendations,
            "insights": insights,
            "simulation": simulation,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


class ReportPayload(BaseModel):
    summary: dict
    recommendations: Optional[List[dict]] = []
    forecast: Optional[dict] = {}


@app.post("/generate-report")
def generate_report(payload: ReportPayload):
    try:
        pdf_bytes = generate_pdf_report(payload.dict())
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=ghg_sustainability_report.pdf"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")


@app.post("/simulate")
def simulate_reduction(data: PredictionInput):
    return compute_simulation(data.cpu, data.ram, data.storage, data.region)


@app.get("/forecast")
def fetch_forecast(current_user: dict = Depends(get_optional_user)):
    user_id = int(current_user["sub"]) if current_user else None
    return get_forecast_data(user_id)


@app.get("/model-metrics")
def get_model_metrics():
    return {
        "model_name": model_metrics.get("model_name", get_current_model_name()),
        "training_score": model_metrics.get("training_score"),
        "testing_score": model_metrics.get("testing_score"),
        "last_training_date": get_last_training_date(),
    }
