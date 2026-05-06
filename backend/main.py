from fastapi import FastAPI
from pydantic import BaseModel
from utils.carbon_data import get_carbon_intensity
from db.database import create_table, insert_log, get_logs

app = FastAPI(title="GHG Platform Backend")


@app.on_event("startup")
def startup():
    create_table()


class EmissionInput(BaseModel):
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
