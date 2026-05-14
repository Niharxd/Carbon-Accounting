# GHG Platform — Carbon Accounting System

AI-Powered Greenhouse Gas (GHG) emission prediction platform with JWT authentication, machine learning backend, and modern analytics dashboard.

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
│   │   └── globals.css           # Global styles + animations
│   ├── components/
│   │   ├── Navbar.jsx            # Fixed top navbar with auth
│   │   ├── Sidebar.jsx           # Collapsible navigation sidebar
│   │   ├── PredictionForm.jsx    # Emission prediction form
│   │   ├── AnalyticsDashboard.jsx # Charts + metrics + logs table
│   │   ├── MetricCard.jsx        # Reusable metric display card
│   │   ├── LoadingSpinner.jsx    # Reusable loading component
│   │   └── EmptyState.jsx        # Reusable empty state component
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

## Features

### Backend
- FastAPI REST API
- JWT authentication with bcrypt password hashing
- Machine Learning predictions (Linear Regression)
- MySQL database integration
- Formula-based calculations
- Historical logs storage per user
- Multi-region carbon intensity support

### Frontend
- Modern Next.js dashboard with professional UI/UX
- Fixed top navbar with user profile
- Collapsible sidebar navigation (mobile responsive)
- Real-time emission predictions
- Interactive analytics dashboard:
  - 4 metric cards (total predictions, avg emissions, carbon intensity, active region)
  - Emission trend line chart
  - Regional comparison bar chart
  - Recent calculations table
- Loading states and spinners
- Empty states with helpful messages
- Smooth animations and transitions
- Fully responsive design (mobile, tablet, desktop)
- Dark mode theme
- Reusable component architecture

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
| POST   | `/predict`   | No       | ML-based emission prediction with efficiency score and anomaly detection |
| GET    | `/model-metrics` | No   | Returns current model name, training score, and testing score |
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
