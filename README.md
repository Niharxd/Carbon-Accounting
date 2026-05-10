# GHG Platform - Carbon Accounting System

AI-Powered Greenhouse Gas (GHG) emission prediction platform with machine learning backend and analytics dashboard frontend.

## Quick Start

### Option 1: Start Everything (Recommended)

Double-click: **`start-all.bat`**

This will automatically start both backend and frontend servers in separate windows.

### Option 2: Start Individually

**Backend Only:**
- Double-click: **`start-backend.bat`**
- Backend will run at: http://127.0.0.1:8000
- API docs at: http://127.0.0.1:8000/docs

**Frontend Only:**
- Double-click: **`start-frontend.bat`**
- Frontend will run at: http://localhost:3000

## Project Structure

```
Carbon accounting/
├── backend/                 # FastAPI backend with ML model
│   ├── data/               # CSV datasets
│   ├── db/                 # Database connection
│   ├── ml/                 # Machine learning model
│   ├── utils/              # Utility functions
│   └── main.py             # FastAPI application
│
├── frontend/               # Next.js frontend dashboard
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   └── services/           # API integration
│
├── start-all.bat           # Start both servers
├── start-backend.bat       # Start backend only
└── start-frontend.bat      # Start frontend only
```

## Features

### Backend
- FastAPI REST API
- Machine Learning predictions (Linear Regression)
- MySQL database integration
- Formula-based calculations
- Historical logs storage
- Multi-region carbon intensity support

### Frontend
- Modern Next.js dashboard
- Real-time emission predictions
- Analytics dashboard with charts
- Emission trend visualization (Line Chart)
- Regional comparison (Bar Chart)
- Recent calculations table
- Responsive dark mode UI

## Prerequisites

### Backend
- Python 3.8+
- MySQL Server
- Virtual environment (recommended)

### Frontend
- Node.js 18+
- npm

## Manual Setup

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Configure MySQL database in `db/database.py`

5. Run server:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

## API Endpoints

| Method | Endpoint     | Description                    |
|--------|--------------|--------------------------------|
| GET    | `/`          | Health check                   |
| POST   | `/calculate` | Formula-based calculation      |
| POST   | `/predict`   | ML model prediction            |
| GET    | `/logs`      | Fetch calculation history      |

## Supported Regions

| Region | Country        | Carbon Intensity (gCO₂/kWh) |
|--------|----------------|------------------------------|
| IN     | India          | 700                          |
| US     | United States  | 400                          |
| SE     | Sweden         | 100                          |
| DE     | Germany        | 300                          |
| FR     | France         | 80                           |
| CN     | China          | 650                          |

## Technology Stack

### Backend
- FastAPI
- Python
- MySQL
- scikit-learn
- pandas
- joblib

### Frontend
- Next.js
- React
- Tailwind CSS
- Chart.js
- react-chartjs-2

## Usage

1. Start both servers using `start-all.bat`
2. Open browser at http://localhost:3000
3. Fill in the prediction form:
   - CPU cores
   - RAM (GB)
   - Storage (GB)
   - Region
4. Click "Predict Emissions"
5. View results and analytics dashboard

## Troubleshooting

### Backend won't start
- Ensure MySQL is running
- Check database credentials in `backend/db/database.py`
- Verify Python and dependencies are installed

### Frontend won't start
- Ensure Node.js is installed
- Run `npm install` in frontend folder
- Check if port 3000 is available

### Analytics not loading
- Ensure backend is running
- Make at least one prediction using `/calculate` endpoint
- Click "Retry" button in analytics dashboard

## License

MIT

## Author

GHG Platform Team
