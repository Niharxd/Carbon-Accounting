# GHG Platform — Carbon Accounting System

A portfolio-ready emissions prediction platform with advanced ML analytics, anomaly detection, and recommendations.

## What changed

- Added Random Forest alongside Linear Regression
- Automatically compare models using training and testing scores
- Select and save the best model to `backend/ml/model.pkl`
- Store model metadata in `backend/ml/model_metrics.json`
- Add anomaly detection for unusually high emissions
- Add an efficiency score from 0–100
- Add rule-based carbon reduction recommendations
- Extend `/predict` to return analytics, anomaly status, and recommendations
- Add `/model-metrics` endpoint for live model reporting
- Enhance frontend dashboard with model metrics, warning UI, recommendation cards, and polished analytics UI
- Add richer dashboard metric cards with icons, trend visuals, grouped overview sections, and stronger CTA styling
- Improve sidebar active state highlighting and navigation feedback

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

Use the included batch files:

- `start-backend.bat`
- `start-frontend.bat`
- `start-all.bat`

---

## Current Project Structure

```
Carbon accounting/
├── backend/
│   ├── auth/
│   │   └── auth.py
│   ├── db/
│   │   └── database.py
│   ├── ml/
│   │   ├── model.pkl
│   │   └── model_metrics.json
│   ├── scripts/
│   │   ├── create_mysql_user.py
│   │   └── test_create_user.py
│   ├── utils/
│   │   └── carbon_data.py
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   └── README.md
├── README.md
├── start-all.bat
├── start-backend.bat
└── start-frontend.bat
```

---

## Prerequisites

- Python 3.10+ (or 3.11/3.14)
- Node.js 18+
- MySQL Server

> SQLite is not used in this project. The backend requires a working MySQL database.

### MySQL setup

If MySQL is installed and running, use the helper script in `backend/scripts/create_mysql_user.py` or configure your own credentials in `backend/db/database.py`.

`backend/db/database.py` currently uses:

```python
host="localhost"
user="root"
password="newpassword123"
database="ghg_db"
```

If you need to change credentials, update those values and restart the backend.

---

## Backend behavior

- `POST /signup` registers a new user.
- `POST /login` returns a JWT token.
- `POST /calculate` computes emissions and stores logs when the request is authenticated.
- `POST /predict` returns ML-based emission predictions.
- `GET /logs` returns the authenticated user's history.
- `GET /model-metrics` returns model metadata.

The backend also creates the required tables automatically during startup.

---

## Frontend behavior

The frontend is built with Vite, React, Tailwind CSS, and React Router.

Features:

- Login and signup flow
- Dashboard with prediction form
- Analytics page with charts and model metrics
- Enhanced dashboard card visuals, icons, and trend indicators
- Stronger call-to-action and clearer page hierarchy
- Sidebar active-route highlighting for better navigation feedback
- Protected routes for authenticated actions
- Responsive layout for desktop and mobile

---

## API Endpoints

| Method | Endpoint         | Auth required | Description |
|--------|------------------|---------------|-------------|
| GET    | `/`              | No            | Health check |
| POST   | `/signup`        | No            | Register a new user |
| POST   | `/login`         | No            | Login and receive JWT |
| POST   | `/calculate`     | Optional      | Calculate emissions; optional auth logs the result |
| POST   | `/predict`       | No            | ML-based prediction with efficiency score |
| GET    | `/model-metrics` | No            | Get model name and scores |
| GET    | `/logs`          | Yes           | Fetch user-specific logs |

### Example requests

`POST /signup`

```json
{ "username": "johndoe", "email": "john@example.com", "password": "secret123" }
```

`POST /login`

```json
{ "email": "john@example.com", "password": "secret123" }
```

`POST /calculate`

```json
{ "cpu": 20.0, "ram": 16.0, "storage": 300.0, "region": "IN" }
```

`POST /predict`

```json
{ "cpu": 20.0, "ram": 16.0, "storage": 300.0, "region": "IN" }
```

---

## Notes

- The current auth implementation uses `passlib` with `pbkdf2_sha256`.
- The frontend expects the backend API base URL to be set via `VITE_API_URL`.
- The repository is configured to run the backend on `127.0.0.1:8000` and frontend on `localhost:5173`.

`/predict` response:
```json
{ "cpu": 20.0, "ram": 16.0, "storage": 300.0, "region": "IN", "carbon_intensity": 700.0, "predicted_emissions": 14.37 }
```

### GET `/logs` — requires `Authorization: Bearer <token>`
```json
{
  "logs": [
    { "id": 1, "cpu": 20.0, "ram": 16.0, "storage": 300.0, "region": "IN",
      "energy": 43.2, "emissions": 30.24, "user_id": 1, "timestamp": "2024-01-15 10:30:45" }
  ]
}
```

---

## Database Schema

**users**

| Column          | Type         | Description       |
|-----------------|--------------|-------------------|
| id              | INT          | Auto-increment PK |
| username        | VARCHAR(100) | Display name      |
| email           | VARCHAR(255) | Unique            |
| hashed_password | VARCHAR(255) | bcrypt hash       |
| created_at      | TIMESTAMP    | Auto-generated    |

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

## ML Model

- Algorithms: Linear Regression and Random Forest
- Features: CPU, RAM, Storage, Carbon Intensity
- Trained on: `data/emissions_data.csv` (100 samples)
- Best-performing model is selected automatically and saved to `backend/ml/model.pkl`
- Model metadata is stored in `backend/ml/model_metrics.json`
- Anomaly detection logic: `predicted_emissions > (mean + 2 * std_dev)`
- Efficiency score is a simple 0–100 rating where lower predicted emissions result in a higher score
- To retrain: `py -3.13 ml/train_model.py`

---

## Frontend Dashboard

### Navigation
- Fixed top navbar with logo, username, and logout
- Collapsible sidebar with navigation links:
  - Dashboard
  - Predictions
  - Analytics
  - History
  - Profile
- Mobile responsive with overlay

### Pages
- `/` — Main dashboard with prediction form and analytics
- `/login` — Email + password form → stores token → redirects to `/`
- `/signup` — Username, email, password form → redirects to `/login`

### Dashboard Components
- Prediction form with improved validation and loading states
- 4 metric cards showing key statistics
- Emission trend line chart (last 10 predictions)
- Regional emissions bar chart
- Recent calculations table with hover effects
- Empty states for no data scenarios
- Loading spinners for async operations

### UI/UX Improvements
- Professional dark theme with gradient accents
- Smooth animations and transitions
- Hover effects on interactive elements
- Responsive grid layouts
- Custom scrollbar styling
- Improved form focus states
- Better error message displays
- Reusable component architecture

---

## Supported Regions

| Region | Country       | Carbon Intensity (gCO₂/kWh) |
|--------|---------------|------------------------------|
| IN     | India         | 700                          |
| US     | United States | 400                          |
| SE     | Sweden        | 100                          |
| DE     | Germany       | 300                          |
| FR     | France        | 80                           |
| CN     | China         | 650                          |

---

## Tech Stack

| Layer    | Technology                           |
|----------|--------------------------------------|
| Backend  | FastAPI, MySQL, python-jose, passlib |
| ML       | scikit-learn, Linear Regression      |
| Frontend | Next.js, Tailwind CSS, Chart.js      |

## Backend Dependencies

```
fastapi
uvicorn
mysql-connector-python
python-jose[cryptography]
passlib[bcrypt]
bcrypt==4.0.1
scikit-learn
joblib
pandas
requests
```

---

## Troubleshooting

- **Backend won't start** — ensure MySQL is running and credentials in `db/database.py` are correct
- **`No module named jose`** — run `py -3.13 -m pip install "python-jose[cryptography]" "passlib[bcrypt]" "bcrypt==4.0.1"`
- **Analytics not loading** — log out and log back in to get a fresh token, then make a prediction
- **Signup "Failed to fetch"** — backend is not running, start it with `uvicorn main:app --reload`
- **Port 3000 in use** — run `npm run dev -- -p 3001`
- **Sidebar not showing** — ensure you're on desktop view or click the hamburger menu on mobile
