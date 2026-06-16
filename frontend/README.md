# Frontend

React + Vite frontend for the GHG Platform.

## Setup

```bash
cd frontend
npm install
copy .env.example .env
```

Edit `frontend/.env` and set:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Run locally:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- The frontend sends API requests to `VITE_API_URL`.
- Authentication tokens are stored in `localStorage`.
- Deploy the build output from `frontend/dist` to a static host.
