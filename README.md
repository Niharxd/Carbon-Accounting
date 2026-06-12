# GHG Platform — Carbon Accounting System

A portfolio-ready emissions prediction platform built with FastAPI, React, and scikit-learn. Provides ML-based carbon footprint estimation, anomaly detection, sustainability scoring, optimization simulation, and PDF report generation.

## Quick Start

### Backend

```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

### Run both

```powershell
start-backend.bat
start-frontend.bat
# or both at once:
start-all.bat
```

---

## Prerequisites

- Python 3.10+
- Node.js 18+
- MySQL Server running locally

> SQLite is not used. The backend requires a working MySQL database.

### MySQL setup

Configure credentials in `backend/db/database.py`:

```python
host="localhost"
user="root"
password="newpassword123"
database="ghg_db"
```

Tables (`users`, `usage_logs`) are created automatically on backend startup.

---

## Project Structure

```
Carbon accounting/
├── .github/
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── auth/
│   │   └── auth.py
│   ├── data/
│   │   ├── carbon_intensity.csv
│   │   └── emissions_data.csv
│   ├── db/
│   │   └── database.py
│   ├── ml/
│   │   ├── model.pkl
│   │   ├── model_metrics.json
│   │   └── train_model.py
│   ├── scripts/
│   │   ├── create_mysql_user.py
│   │   └── test_create_user.py
│   ├── utils/
│   │   └── carbon_data.py
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnalyticsDashboard.jsx
│   │   │   ├── BrandIcons.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── MetricCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PredictionForm.jsx
│   │   │   ├── PredictionResults.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── SustainabilityScore.jsx
│   │   ├── pages/
│   │   │   ├── Analytics.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Simulator.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
├── start-all.bat
├── start-backend.bat
└── start-frontend.bat
```

---

## API Endpoints

| Method | Endpoint           | Auth     | Description |
|--------|--------------------|----------|-------------|
| GET    | `/`                | No       | Health check |
| POST   | `/signup`          | No       | Register a new user |
| POST   | `/login`           | No       | Login and receive JWT |
| POST   | `/calculate`       | Optional | Compute emissions; logs result if authenticated |
| POST   | `/predict`         | No       | ML prediction with scores, anomaly, recommendations, simulation |
| POST   | `/simulate`        | No       | Standalone optimization simulation |
| GET    | `/forecast`        | Optional | 7-day and 30-day emission forecasts |
| GET    | `/logs`            | Yes      | Fetch authenticated user's prediction history |
| GET    | `/model-metrics`   | No       | Active model name, training/testing scores |
| POST   | `/generate-report` | No       | Generate and download a PDF sustainability report |

### Example: `POST /predict`

Request:
```json
{ "cpu": 20.0, "ram": 16.0, "storage": 300.0, "region": "IN" }
```

Response:
```json
{
  "cpu": 20.0,
  "ram": 16.0,
  "storage": 300.0,
  "region": "IN",
  "carbon_intensity": 700.0,
  "predicted_emissions": 14.37,
  "efficiency_score": 72,
  "sustainability_score": 65,
  "sustainability_rating": "Good",
  "anomaly_detected": false,
  "model_used": "Random Forest",
  "recommendations": [{ "title": "...", "description": "...", "impact": "8-18%" }],
  "insights": ["..."],
  "simulation": {
    "current_emissions": 14.37,
    "optimized_emissions": 11.82,
    "reduction_pct": 17.74,
    "carbon_saved": 2.55,
    "optimized_region": "FR"
  }
}
```

### Example: `GET /logs` — requires `Authorization: Bearer <token>`

```json
{
  "logs": [
    { "id": 1, "cpu": 20.0, "ram": 16.0, "storage": 300.0, "region": "IN",
      "energy": 43.2, "emissions": 30.24, "user_id": 1, "timestamp": "2024-01-15 10:30:45" }
  ]
}
```

---

## Frontend Pages

| Route        | Description |
|--------------|-------------|
| `/`          | Dashboard — KPI cards, prediction form, results panel |
| `/analytics` | Charts, model metrics, recent logs table |
| `/simulator` | Live optimization simulator wired to `/simulate` |
| `/history`   | Full prediction log table (requires login) |
| `/reports`   | Download PDF sustainability report from last prediction |
| `/settings`  | Profile info, logout, preferences, password verification |
| `/login`     | Email + password → JWT stored in localStorage |
| `/signup`    | Username, email, password → redirects to login |

### Dashboard

- KPI row (Sustainability Score, Total Predictions, Avg Emissions, Reduction Potential) updates live after each prediction via a `predictionMade` custom event
- Two-column layout: `PredictionForm` left, `PredictionResults` right
- `PredictionResults` shows predicted emissions, efficiency score, anomaly status, top recommendation, sustainability score widget, simulation preview, and AI insights
- Region selector lets users choose from 6 regions with different carbon intensities
- PDF report button appears after first prediction

### Simulator

- Live form → calls `/simulate` → shows current vs optimized emissions side-by-side
- Progress bar visualises reduction percentage
- Displays suggested optimized CPU, RAM, storage, and region

### Reports

- Reads last prediction from `localStorage` (persists across navigation)
- Two download buttons: full sustainability report and executive summary
- Both call the real `/generate-report` backend endpoint and download a PDF

### Settings

- Profile card shows username and email decoded from the JWT
- Working Sign Out button
- Toggle switches for preferences saved to `localStorage`
- Password verification form (checks current password against backend)

---

## ML Model

- Algorithms: Linear Regression and Random Forest (both trained, best test score wins)
- Current best model: **Random Forest** (test score: 0.9974, training score: 0.9995)
- Features: `cpu`, `ram`, `storage`, `carbon_intensity`
- Trained on: `backend/data/emissions_data.csv`
- Anomaly threshold: `mean + 2 × std_dev` of training emissions (~43.7 kg CO₂)
- Efficiency score: 0–100, higher = lower emissions relative to mean
- Sustainability score: composite of emissions, carbon intensity, anomaly status, and efficiency
- To retrain: `py -3.13 backend/ml/train_model.py`

---

## Database Schema

**users**

| Column          | Type         | Description           |
|-----------------|--------------|-----------------------|
| id              | INT          | Auto-increment PK     |
| username        | VARCHAR(100) | Display name          |
| email           | VARCHAR(255) | Unique                |
| hashed_password | VARCHAR(255) | pbkdf2_sha256 hash    |
| created_at      | TIMESTAMP    | Auto-generated        |

**usage_logs**

| Column    | Type        | Description              |
|-----------|-------------|--------------------------|
| id        | INT         | Auto-increment PK        |
| cpu       | FLOAT       | CPU cores                |
| ram       | FLOAT       | RAM in GB                |
| storage   | FLOAT       | Storage in GB            |
| region    | VARCHAR(10) | Region code              |
| energy    | FLOAT       | Energy in kWh            |
| emissions | FLOAT       | Emissions in kg CO₂      |
| user_id   | INT         | FK → users.id (nullable) |
| timestamp | TIMESTAMP   | Auto-generated           |

---

## Supported Regions

| Region | Country       | Carbon Intensity (gCO₂/kWh) |
|--------|---------------|------------------------------|
| IN     | India         | 700                          |
| US     | United States | 400                          |
| CN     | China         | 650                          |
| DE     | Germany       | 300                          |
| SE     | Sweden        | 100                          |
| FR     | France        | 80                           |

---

## Tech Stack

| Layer    | Technology                                        |
|----------|---------------------------------------------------|
| Backend  | FastAPI, MySQL, python-jose, passlib, fpdf        |
| ML       | scikit-learn (Linear Regression, Random Forest)   |
| Frontend | Vite, React 19, Tailwind CSS, Chart.js, Axios     |

## Backend Dependencies

```
fastapi
uvicorn
pandas
scikit-learn
mysql-connector-python
python-jose[cryptography]
passlib[bcrypt]
bcrypt==4.0.1
fpdf
joblib
requests
```

---

## GitHub CI

Workflow at `.github/workflows/ci.yml` runs on `push` and `pull_request` to `main`/`master`:

- **Backend** — installs dependencies, validates Python files with `py_compile`
- **Frontend** — installs npm dependencies, runs `npm run build`

---

## Troubleshooting

- **Backend won't start** — ensure MySQL is running and credentials in `backend/db/database.py` are correct
- **`No module named jose`** — run `pip install "python-jose[cryptography]" "passlib[bcrypt]" "bcrypt==4.0.1"`
- **`No module named fpdf`** — run `pip install fpdf`
- **Analytics not loading** — log out and back in to get a fresh token, then make a prediction
- **Signup "Failed to fetch"** — backend is not running; start it with `uvicorn main:app --reload`
- **Reports page shows no data** — run a prediction on the Dashboard first; the last result is stored in `localStorage`
- **Port conflict** — run `npm run dev -- --port 3001`
