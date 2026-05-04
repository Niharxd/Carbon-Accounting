from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="GHG Platform Backend")


class EmissionInput(BaseModel):
    cpu: float
    ram: float
    storage: float


@app.get("/")
def root():
    return {"message": "GHG Platform Backend Running"}


@app.post("/calculate")
def calculate_emissions(data: EmissionInput):
    energy = data.cpu * 0.5 + data.ram * 0.2 + data.storage * 0.1
    carbon_intensity = 0.5
    emissions = energy * carbon_intensity
    return {"energy": energy, "emissions": emissions}
