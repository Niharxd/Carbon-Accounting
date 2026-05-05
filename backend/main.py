from fastapi import FastAPI
from pydantic import BaseModel
from utils.carbon_data import get_carbon_intensity

app = FastAPI(title="GHG Platform Backend")


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
    return {"energy": energy, "carbon_intensity": carbon_intensity, "emissions": emissions}
