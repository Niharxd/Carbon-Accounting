# GHG Platform Backend

A FastAPI backend for GHG (Greenhouse Gas) emission calculations using dataset-based carbon intensity values.

## Setup

**1. Create and activate a virtual environment**

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

**2. Install dependencies**

```bash
pip install -r requirements.txt
```

**3. Run the server**

```bash
uvicorn main:app --reload
```

## API

Swagger UI: http://127.0.0.1:8000/docs

| Method | Endpoint     | Description             |
|--------|--------------|-------------------------|
| GET    | `/`          | Health check            |
| POST   | `/calculate` | Calculate GHG emissions |

### POST `/calculate` — Example Request

```json
{
  "cpu": 4.0,
  "ram": 8.0,
  "storage": 100.0,
  "region": "IN"
}
```

### Example Response

```json
{
  "energy": 13.6,
  "carbon_intensity": 700.0,
  "emissions": 9.52
}
```

## Supported Regions

| Region | Carbon Intensity (gCO₂/kWh) |
|--------|------------------------------|
| IN     | 700                          |
| US     | 400                          |
| SE     | 100                          |
| DE     | 300                          |
| FR     | 80                           |
| CN     | 650                          |

> If an unsupported region is provided, carbon intensity defaults to `500`.

## Notes

- Carbon intensity values are loaded from `data/carbon_intensity.csv`
- `emissions` is in kg CO₂ (`energy (kWh) × carbon_intensity (gCO₂/kWh) / 1000`)
