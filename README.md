# GHG Platform

A lightweight carbon accounting app with a FastAPI backend and a React + Vite frontend.

## Local setup

### Backend

```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The backend uses SQLite by default and will create `backend/ghg.db` automatically.

### Frontend

```powershell
cd frontend
npm install
copy .env.example .env
npm run dev
```

Set `VITE_API_URL=http://127.0.0.1:8000` in `frontend/.env`.

## Build

```powershell
cd frontend
npm run build
```

## Deployment

- Backend can be deployed with Render or any Python host.
- Frontend can be deployed with Vercel, Netlify, or any static host.
- In production, set `VITE_API_URL` to the backend URL.

## Resources

- Backend entry: `backend/main.py`
- Frontend entry: `frontend/src/main.jsx`
- Backend models: `backend/ml/model.pkl`
- Backend SQLite database: `backend/ghg.db`

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
