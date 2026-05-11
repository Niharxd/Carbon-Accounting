# GHG Platform Frontend

A Next.js frontend for the AI-Powered GHG Platform with JWT authentication.

## Tech Stack

- **Next.js** — React framework
- **Tailwind CSS** — Styling
- **Chart.js / react-chartjs-2** — Data visualization

## Setup

```bash
npm install
npm run dev
```

Frontend runs at: **http://localhost:3000**  
Backend must be running at: **http://127.0.0.1:8000**

---

## Auth Pages

| Route     | File                        | Description          |
|-----------|-----------------------------|----------------------|
| /login    | `app/login/page.js`         | Email + password login |
| /signup   | `app/signup/page.js`        | Username, email, password registration |

### Flow

1. User visits `/signup` → fills form → account created → redirected to `/login`
2. User visits `/login` → fills form → JWT token stored in `localStorage` → redirected to `/`
3. Authenticated requests include `Authorization: Bearer <token>` header automatically

---

## Token Storage

Token is stored in `localStorage` under the key `token`:

```js
localStorage.setItem('token', data.access_token);  // on login
localStorage.getItem('token');                       // on API calls
localStorage.removeItem('token');                    // on logout
```

Helper functions are in `services/auth.js`:
- `loginUser({ email, password })` — logs in and stores token
- `signupUser({ username, email, password })` — registers user
- `logout()` — removes token
- `getToken()` — returns current token or null

---

## Authenticated API Requests

`services/api.js` automatically attaches the token:

```js
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
}
```

- `fetchLogs()` — requires auth, returns only the current user's logs
- `predictEmissions(data)` — no auth required; also calls `/calculate` with token if logged in to save the log

---

## Project Structure

```
frontend/
├── app/
│   ├── login/
│   │   └── page.js          # Login page
│   ├── signup/
│   │   └── page.js          # Signup page
│   ├── page.tsx             # Main dashboard
│   ├── layout.tsx           # Root layout
│   └── globals.css
├── components/
│   ├── PredictionForm.jsx
│   └── AnalyticsDashboard.jsx
├── services/
│   ├── api.js               # Emission API calls (auth-aware)
│   └── auth.js              # Auth functions + token management
└── package.json
```

---

## Error Handling

- Invalid credentials → red error banner displayed on form
- Duplicate email on signup → error message shown
- Expired/invalid token → `fetchLogs` throws "Not authenticated"
- All errors are caught and displayed inline — no crashes

---

## Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint
```
