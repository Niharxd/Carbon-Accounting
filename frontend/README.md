# GHG Platform Frontend

This frontend is a Vite + React + Tailwind CSS migration of the original Next.js UI.

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

4. Run the development server:

```bash
npm run dev
```

5. Open the app in your browser at the displayed Vite URL.

## Project Structure

- `src/App.jsx` — React Router entrypoint and layout
- `src/pages/` — page components for Dashboard, Login, Signup, Analytics
- `src/components/` — reusable UI pieces
- `src/services/` — API and auth integration
- `src/index.css` — Tailwind global styles

## Notes

- The backend API is unchanged.
- JWT tokens are stored in `localStorage`.
- Routing is handled with `react-router-dom`.
- Chart rendering uses `chart.js` and `react-chartjs-2`.
