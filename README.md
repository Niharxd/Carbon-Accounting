# GHG Platform — Carbon Accounting System

AI-Powered Greenhouse Gas (GHG) emission prediction platform with JWT authentication, machine learning backend, and analytics dashboard.

## Quick Start

**Option 1 — Start everything at once:**

Double-click `start-all.bat` — launches both backend and frontend in separate windows.

**Option 2 — Start individually:**

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:3000
- Backend API docs: http://127.0.0.1:8000/docs

---

## Project Structure

```
Carbon accounting/
├── backend/
│   ├── auth/
│   │   └── auth.py               # JWT + password hashing
│   ├── data/
│   │   ├── carbon_intensity.csv  # Region → carbon intensity values
│   │   └── emissions_data.csv    # Training data for ML model
│   ├── db/
│   │   └── database.py           # MySQL connection + CRUD
│   ├── ml/
│   │   ├── model.pkl             # Trained Linear Regression model
│   │   └── train_model.py        # Script to retrain the model
│   ├── utils/
│   │   └── carbon_data.py        # Carbon intensity lookup by region
│   ├── main.py                   # FastAPI app + all routes
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   │   ├── login/
│   │   │   └── page.js           # Login page
│   │   ├── signup/
│   │   │   └── page.js           # Signup page
│   │   ├── page.tsx              # Main dashboard
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── Navbar.jsx            # Auth-aware navbar
│   │   ├── PredictionForm.jsx    # Emission prediction form
│   │   └── AnalyticsDashboard.jsx # Charts + logs table
│   └── services/
│       ├── auth.js               # Auth functions + token management
│       └── api.js                # Emission API calls
│
├── README.md
├── start-all.bat                 # Start both servers
├── start-backend.bat             # Start backend only
└── start-frontend.bat            # Start frontend only
```

---

## Prerequisites

- Python 3.8+ and MySQL Server
- Node.js 18+

### MySQL Setup

```sql
CREATE DATABASE ghg_db;
```

Update credentials in `backend/db/database.py`:
```python
host="localhost", user="root", password="your_password", database="ghg_db"
```

Tables (`users`, `usage_logs`) are created automatically on first startup.

---

## Authentication

### Flow

1. `POST /signup` → creates account, bcrypt-hashes password
2. `POST /login` → returns JWT access token
3. Frontend stores token in `localStorage` under key `token`
4. Protected requests send `Authorization: Bearer <token>`

### JWT Config

| Setting      | Value                         |
|--------------|-------------------------------|
| Algorithm    | HS256                         |
| Token expiry | 24 hours                      |
| Secret key   | `auth/auth.py` → `SECRET_KEY` |

> Change `SECRET_KEY` to a strong random value in production.

### Password Hashing

Uses `passlib` with `bcrypt==4.0.1` (pinned for compatibility):
- `hash_password(password)` — returns bcrypt hash
- `verify_password(plain, hashed)` — returns bool

---

## API Endpoints

| Method | Endpoint     | Auth     | Description                        |
|--------|--------------|----------|------------------------------------|
| GET    | `/`          | No       | Health check                       |
| POST   | `/signup`    | No       | Register new user                  |
| POST   | `/login`     | No       | Login, returns JWT token           |
| POST   | `/calculate` | Optional | Calculate emissions (logs if auth) |
| POST   | `/predict`   | No       | ML-based emission prediction       |
| GET    | `/logs`      | ✅ Yes   | Fetch current user's logs only     |

### POST `/signup`
```json
{ "username": "johndoe", "email": "john@example.com", "password": "secret123" }
```
```json
{ "message": "User created successfully" }
```

### POST `/login`
```json
{ "email": "john@example.com", "password": "secret123" }
```
```json
{ "access_token": "eyJhbGci...", "token_type": "bearer" }
```

### POST `/calculate` or `/predict`
```json
{ "cpu": 20.0, "ram": 16.0, "storage": 300.0, "region": "IN" }
```

`/calculate` response:
```json
{ "energy": 43.2, "carbon_intensity": 700.0, "emissions": 30.24 }
```

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

- Algorithm: Linear Regression
- Features: CPU, RAM, Storage, Carbon Intensity
- Trained on: `data/emissions_data.csv` (100 samples)
- To retrain: `py -3.13 ml/train_model.py`

---

## Frontend

- `/signup` — username, email, password form → redirects to `/login`
- `/login` — email, password form → stores token → redirects to `/`
- Navbar shows username + Logout when authenticated, Login + Sign Up when not
- Analytics dashboard shows only the logged-in user's logs with charts and table
- All errors displayed inline with red banners

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
