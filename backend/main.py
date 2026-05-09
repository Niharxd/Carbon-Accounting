from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils.carbon_data import get_carbon_intensity
from db.database import create_table, insert_log, get_logs
import joblib
from pathlib import Path
import numpy as np

app = FastAPI(title="GHG Platform Backend")

# Load ML model
try:
    model_path = Path(__file__).parent / "ml" / "model.pkl"
    model = joblib.load(model_path)
    print(f"Model loaded successfully from {model_path}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None


@app.on_event("startup")
def startup():
    create_table()


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


@app.get("/")
def root():
    return {"message": "GHG Platform Backend Running"}


@app.post("/calculate")
def calculate_emissions(data: EmissionInput):
    energy = data.cpu * 0.5 + data.ram * 0.2 + data.storage * 0.1
    carbon_intensity = get_carbon_intensity(data.region)
    emissions = energy * carbon_intensity / 1000
    
    insert_log(data.cpu, data.ram, data.storage, data.region, energy, emissions)
    
    return {"energy": energy, "carbon_intensity": carbon_intensity, "emissions": emissions}


@app.get("/logs")
def fetch_logs():
    logs = get_logs(10)
    return {"logs": logs}


@app.post("/predict")
def predict_emissions(data: PredictionInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded. Please check server logs.")
    
    try:
        # Get carbon intensity for the region
        carbon_intensity = get_carbon_intensity(data.region)
        
        # Build feature array in exact order: [cpu, ram, storage, carbon_intensity]
        features = np.array([[data.cpu, data.ram, data.storage, carbon_intensity]])
        
        # Make prediction
        prediction = model.predict(features)
        predicted_emissions = float(prediction[0])
        
        # Return response
        return {
            "cpu": data.cpu,
            "ram": data.ram,
            "storage": data.storage,
            "region": data.region,
            "carbon_intensity": carbon_intensity,
            "predicted_emissions": predicted_emissions
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
