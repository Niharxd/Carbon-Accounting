# GHG Platform Backend

A FastAPI backend for GHG (Greenhouse Gas) emission calculations using dataset-based carbon intensity values.

## Prerequisites

- Python 3.8+
- MySQL Server installed and running

## Setup

**1. Create MySQL Database**

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE ghg_db;
```

**2. Configure Database Connection**

Edit `backend/db/database.py` and update the connection settings:

```python
host="localhost"
user="root"
password="your_password"  # Change this to your MySQL password
database="ghg_db"
```

**3. Create and activate a virtual environment**

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

**4. Install dependencies**

```bash
pip install -r requirements.txt
```

**5. Run the server**

```bash
uvicorn main:app --reload
```

The table `usage_logs` will be created automatically on startup.

## API

Swagger UI: http://127.0.0.1:8000/docs

| Method | Endpoint     | Description                           |
|--------|--------------|---------------------------------------|
| GET    | `/`          | Health check                          |
| POST   | `/calculate` | Calculate GHG emissions (formula)     |
| POST   | `/predict`   | Predict GHG emissions (ML model)      |
| GET    | `/logs`      | Fetch last 10 calculation logs        |

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

### POST `/predict` — Example Request

```json
{
  "cpu": 20.0,
  "ram": 16.0,
  "storage": 300.0,
  "region": "IN"
}
```

### Example Response

```json
{
  "cpu": 20.0,
  "ram": 16.0,
  "storage": 300.0,
  "region": "IN",
  "carbon_intensity": 700.0,
  "predicted_emissions": 9.45
}
```

> **Note:** Changing the region (e.g., from "IN" to "SE") will produce different predictions based on carbon intensity.

### GET `/logs` — Example Response

```json
{
  "logs": [
    {
      "id": 1,
      "cpu": 4.0,
      "ram": 8.0,
      "storage": 100.0,
      "region": "IN",
      "energy": 13.6,
      "emissions": 9.52,
      "timestamp": "2024-01-15 10:30:45"
    }
  ]
}
```

## Database Schema

**Table: usage_logs**

| Column    | Type         | Description                      |
|-----------|--------------|----------------------------------|
| id        | INT          | Auto-increment primary key       |
| cpu       | FLOAT        | CPU cores                        |
| ram       | FLOAT        | RAM in GB                        |
| storage   | FLOAT        | Storage in GB                    |
| region    | VARCHAR(10)  | Region code                      |
| energy    | FLOAT        | Calculated energy in kWh         |
| emissions | FLOAT        | Calculated emissions in kg CO₂   |
| timestamp | TIMESTAMP    | Auto-generated timestamp         |

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

## Machine Learning Model Integration

The `/predict` endpoint uses a trained **Linear Regression model** (`ml/model.pkl`) to predict emissions.

**Model Features:**
- CPU cores
- RAM (GB)
- Storage (GB)
- Carbon intensity (gCO₂/kWh) based on region

**Training:**

The model was trained on 100 samples from `data/emissions_data.csv`.

To retrain the model:

```bash
python ml/train_model.py
```

**Model Loading:**

The model is loaded once during server startup using `joblib` for optimal performance.

## Endpoint Comparison: `/calculate` vs `/predict`

| Feature              | `/calculate`                     | `/predict`                       |
|----------------------|----------------------------------|----------------------------------|
| Method               | Formula-based                    | Machine Learning model           |
| Formula              | `cpu×0.5 + ram×0.2 + storage×0.1`| Trained Linear Regression        |
| Accuracy             | Fixed calculation                | Learned from training data       |
| Database Logging     | Yes                              | No                               |
| Use Case             | Quick estimation                 | Data-driven prediction           |

## Notes

- Carbon intensity values are loaded from `data/carbon_intensity.csv`
- `emissions` is in kg CO₂ (`energy (kWh) × carbon_intensity (gCO₂/kWh) / 1000`)
- `/calculate` logs are automatically saved to MySQL database
- `/predict` uses ML model and does not log to database
- If database connection fails, the API will continue to work but logs won't be saved
- If ML model fails to load, `/predict` endpoint will return a 500 error
