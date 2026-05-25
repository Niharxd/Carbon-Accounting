# GHG Platform Frontend

A Vite + React + Tailwind CSS frontend for the GHG Platform, now enhanced with analytics cards, anomaly warnings, and recommendation UI.

## Setup

1. Copy `.env.example` to `.env`.
2. Set the backend URL in `.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

3. Install dependencies:

```bash
cd frontend
npm install
```

4. Run the frontend server:

```bash
npm run dev
```

5. Open the app in your browser at the displayed Vite URL.

## Features

- Prediction form with real-time carbon analytics
- Efficiency score display and green/yellow/red indicator logic
- Anomaly warning banner for unusually high emissions
- Recommendation cards with actionable carbon reduction guidance
- Model metrics cards showing active model and score performance
- Analytics dashboard with emission trends, region charts, and recent history

## Project Structure

- `src/App.jsx` — React Router entrypoint and app layout
- `src/pages/` — main page components
- `src/components/` — reusable UI components and analytics widgets
- `src/services/` — backend API and authentication helpers
- `src/index.css` — Tailwind global styles

## Notes

- JWT tokens are stored in `localStorage`.
- The frontend consumes new backend ML endpoints:
  - `POST /predict`
  - `GET /model-metrics`
- Model metrics and recommendations are shown directly after each prediction.
- Chart rendering uses `chart.js` and `react-chartjs-2`.
