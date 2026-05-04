# GHG Platform Backend

A minimal FastAPI backend for GHG (Greenhouse Gas) emission calculations.

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

| Method | Endpoint     | Description              |
|--------|--------------|--------------------------|
| GET    | `/`          | Health check             |
| POST   | `/calculate` | Calculate GHG emissions  |

### POST `/calculate` — Example Request

```json
{
  "cpu": 4.0,
  "ram": 8.0,
  "storage": 100.0
}
```

### Example Response

```json
{
  "energy": 13.6,
  "emissions": 6.8
}
```
