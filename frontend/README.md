# GHG Platform Frontend

A Vite + React + Tailwind CSS frontend for the GHG Platform with an animated splash screen, full marketing landing page, and comprehensive carbon analytics dashboard.

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

**Landing & Entry:**
- Animated splash screen with logo scaling and typewriter tagline
- Full SaaS-style marketing landing page with hero, features, how-it-works, and tech stack sections
- Premium first impression with auto-redirect to landing page

**Dashboard & Analytics:**
- Prediction form with real-time carbon emissions calculations
- Efficiency score display with green/yellow/red indicator logic
- Anomaly warning banner for unusually high emissions (>2σ from mean)
- Recommendation cards with actionable carbon reduction guidance
- Model metrics cards showing active Random Forest model and accuracy (99.74%)
- Richer dashboard metrics with icons, descriptions, and mini trend visuals
- Analytics dashboard with emission trends, region comparisons, and recent history charts
- Optimization simulator — test infrastructure changes before committing
- PDF report export functionality
- Sidebar active-route highlighting for clearer navigation

## Project Structure

- `src/App.jsx` — React Router entrypoint with route configuration
- `src/pages/` — main page components:
  - `Splash.jsx` — animated entry/splash screen
  - `Landing.jsx` — full SaaS marketing landing page
  - `Dashboard.jsx` — main carbon prediction dashboard
  - `Analytics.jsx` — emission analytics and charts
  - `Simulator.jsx` — optimization simulator
  - `History.jsx` — prediction history
  - `Reports.jsx` — PDF report management
  - `Login.jsx` / `Signup.jsx` — authentication pages
- `src/components/` — reusable UI components:
  - `Navbar.jsx` — top navigation bar
  - `Sidebar.jsx` — left sidebar navigation
  - `PredictionForm.jsx` — infrastructure input form
  - `PredictionResults.jsx` — results and recommendations
  - `AnalyticsDashboard.jsx` — charts and trend visualizations
  - `MetricCard.jsx` — reusable metric card component
  - `SustainabilityScore.jsx` — efficiency score display
  - `BrandIcons.jsx` — brand logo and icons
- `src/services/` — backend API and authentication helpers
- `src/index.css` — Tailwind global styles and custom animations

## User Flow

1. **Splash Screen** (`/`) — Animated entry with logo and typewriter tagline (auto-redirects in 4s)
2. **Landing Page** (`/landing`) — Full marketing page with features, how-it-works, and CTA
3. **Authentication** — Sign up or login to access the dashboard
4. **Dashboard** (`/dashboard`) — Main carbon prediction and analytics interface
5. **Other Pages** — Analytics, Simulator, History, Reports, Settings

## Notes

- JWT tokens are stored in `localStorage`
- The frontend consumes backend ML endpoints:
  - `POST /predict` — predict emissions from infrastructure specs
  - `GET /model-metrics` — get Random Forest model performance metrics
  - `POST /export-pdf` — generate and download sustainability reports
- Animations:
  - Logo scaling: 0.8s cubic-bezier with spring effect
  - Typewriter tagline: 3s character-by-character reveal
  - Fade-in button: 0.6s ease-in
  - Orbital background: continuous floating animation
- Chart rendering uses `chart.js` and `react-chartjs-2`
- Responsive design with Tailwind CSS (mobile-first, breakpoints at sm/md/lg)
