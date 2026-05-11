# GHG Platform Backend

A FastAPI backend for GHG (Greenhouse Gas) emission calculations with JWT authentication.

## Prerequisites

- Python 3.8+
- MySQL Server installed and running

## Setup

**1. Create MySQL Database**

```sql
CREATE DATABASE ghg_db;
```

**2. Configure Database Connection**

Edit `backend/db/database.py` and update:

```python
host="localhost"
user="root"
password="your_password"
database="ghg_db"
```

**3. Create virtual environment and install dependencies**

```bash
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

pip install -r requirements.txt
```

**4. Run the server**

```bash
uvicorn main:app --reload
```

Tables (`users`, `usage_logs`) are created automatically on startup.

---

## Authentication Flow

1. User calls `POST /signup` → account created, password bcrypt-hashed
2. User calls `POST /login` → receives JWT access token
3. Client stores token and sends it as `Authorization: Bearer <token>` on protected requests
4. Backend verifies token via `get_current_user` FastAPI dependency

### JWT Configuration

| Setting                    | Value                        |
|----------------------------|------------------------------|
| Algorithm                  | HS256                        |
| Token expiry               | 60 minutes                   |
| Secret key location        | `auth/auth.py` → `SECRET_KEY`|

> Change `SECRET_KEY` to a strong random value in production.

### Password Hashing

Uses `passlib[bcrypt]`. Helper functions in `auth/auth.py`:
- `hash_password(password)` — returns bcrypt hash
- `verify_password(plain, hashed)` — returns bool

---

## Protected Routes

| Route      | Auth Required | Notes                              |
|------------|---------------|------------------------------------|
| GET /logs  | ✅ Yes        | Returns only the current user's logs |
| POST /calculate | Optional | Logs saved only when authenticated |

---

## API Endpoints

Swagger UI: http://127.0.0.1:8000/docs

| Method | Endpoint     | Auth     | Description                        |
|--------|--------------|----------|------------------------------------|
| GET    | `/`          | No       | Health check                       |
| POST   | `/signup`    | No       | Register new user                  |
| POST   | `/login`     | No       | Login, returns JWT token           |
| POST   | `/calculate` | Optional | Calculate emissions (logs if auth) |
| POST   | `/predict`   | No       | ML-based emission prediction       |
| GET    | `/logs`      | ✅ Yes   | Fetch current user's logs          |

---

## Sample Requests

### POST `/signup`

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Response:
```json
{ "message": "User created successfully" }
```

### POST `/login`

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### GET `/logs` (authenticated)

```
Authorization: Bearer <token>
```

Response:
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
      "user_id": 1,
      "timestamp": "2024-01-15 10:30:45"
    }
  ]
}
```

---

## Database Schema

**Table: users**

| Column          | Type         | Description              |
|-----------------|--------------|--------------------------|
| id              | INT          | Auto-increment PK        |
| username        | VARCHAR(100) | Display name             |
| email           | VARCHAR(255) | Unique email             |
| hashed_password | VARCHAR(255) | bcrypt hash              |
| created_at      | TIMESTAMP    | Auto-generated           |

**Table: usage_logs**

| Column    | Type         | Description                    |
|-----------|--------------|--------------------------------|
| id        | INT          | Auto-increment PK              |
| cpu       | FLOAT        | CPU cores                      |
| ram       | FLOAT        | RAM in GB                      |
| storage   | FLOAT        | Storage in GB                  |
| region    | VARCHAR(10)  | Region code                    |
| energy    | FLOAT        | Calculated energy (kWh)        |
| emissions | FLOAT        | Calculated emissions (kg CO₂)  |
| user_id   | INT          | FK → users.id (nullable)       |
| timestamp | TIMESTAMP    | Auto-generated                 |

---

## Required Dependencies

```
fastapi
uvicorn
mysql-connector-python
python-jose[cryptography]
passlib[bcrypt]
scikit-learn
joblib
pandas
requests
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
