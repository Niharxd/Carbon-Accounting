# Backend

FastAPI backend for the GHG Platform.

## Setup

```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Database

- Uses SQLite by default.
- The app creates `backend/ghg.db` automatically.
- To customize the path, set `DB_FILE`.

## Endpoints

- `GET /` — health check
- `POST /signup` — create user
- `POST /login` — authenticate user
- `POST /calculate` — compute emissions and optionally save log
- `POST /predict` — ML prediction with analytics
- `POST /simulate` — emission optimization simulation
- `GET /forecast` — emission forecast
- `GET /logs` — user prediction history
- `GET /model-metrics` — model metrics
- `POST /generate-report` — PDF report generation

## Deployment notes

- `backend/render.yaml` is configured for Render.
- `FRONTEND_URL` should be set in Render for CORS support.
