# GHG Platform Frontend

A modern Next.js frontend dashboard for the AI-Powered GHG (Greenhouse Gas) Platform.

## Tech Stack

- **Next.js** - React framework
- **React** - UI library
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization
- **react-chartjs-2** - React wrapper for Chart.js
- **JavaScript** - Programming language

## Features

- Modern dark mode UI
- Real-time emission predictions
- Multi-region support (IN, US, SE, DE, FR, CN)
- Live backend integration
- Responsive design
- Fast and lightweight
- Analytics dashboard with charts
- Historical data visualization
- Recent calculations table
- Emission trend line chart
- Regional emissions bar chart

## Prerequisites

- Node.js 18+ installed
- Backend server running on `http://127.0.0.1:8000`

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The frontend will start at: **http://localhost:3000**

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx          # Main dashboard page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── PredictionForm.jsx      # Prediction form component
│   └── AnalyticsDashboard.jsx  # Analytics dashboard with charts
├── services/
│   └── api.js            # Backend API integration
├── package.json
└── README.md
```

## Backend Dependency

This frontend requires the FastAPI backend to be running.

**Backend URL:** `http://127.0.0.1:8000`

**Backend Endpoints:**
- `POST /predict` - Get emission predictions
- `GET /logs` - Fetch calculation history

### Start Backend Server

```bash
cd ../backend
uvicorn main:app --reload
```

## Usage

1. **Start the backend server** (see above)
2. **Start the frontend** with `npm run dev`
3. **Open browser** at http://localhost:3000
4. **Fill in the form:**
   - CPU cores (e.g., 20)
   - RAM in GB (e.g., 16)
   - Storage in GB (e.g., 300)
   - Select region (IN, US, SE, DE, FR, CN)
5. **Click "Predict Emissions"**
6. **View results:**
   - Carbon intensity (gCO₂/kWh)
   - Predicted emissions (kg CO₂)
7. **Explore Analytics Dashboard:**
   - View emission trends over time
   - Compare emissions by region
   - Check recent calculation history

## API Integration

The frontend communicates with the backend using the `services/api.js` module:

```javascript
predictEmissions(data) → POST /predict
fetchLogs() → GET /logs
```

**Request Format:**
```json
{
  "cpu": 20.0,
  "ram": 16.0,
  "storage": 300.0,
  "region": "IN"
}
```

**Response Format:**
```json
{
  "cpu": 20.0,
  "ram": 16.0,
  "storage": 300.0,
  "region": "IN",
  "carbon_intensity": 700.0,
  "predicted_emissions": 9.45
}
```

## Error Handling

- Backend connection errors are caught and displayed
- Form validation prevents invalid inputs
- Loading states during API calls
- User-friendly error messages

## Supported Regions

| Region Code | Country        | Carbon Intensity (gCO₂/kWh) |
|-------------|----------------|------------------------------|
| IN          | India          | 700                          |
| US          | United States  | 400                          |
| SE          | Sweden         | 100                          |
| DE          | Germany        | 300                          |
| FR          | France         | 80                           |
| CN          | China          | 650                          |

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Component Overview

**PredictionForm.jsx**
- Handles user input
- Manages form state
- Calls backend API
- Displays prediction results
- Shows error messages

**AnalyticsDashboard.jsx**
- Fetches historical logs from backend
- Displays emission trend line chart
- Shows regional emissions bar chart
- Renders recent calculations table
- Handles loading and error states

**page.tsx**
- Main dashboard layout
- Renders PredictionForm
- Renders AnalyticsDashboard
- Displays header and footer

**api.js**
- Backend communication
- Error handling
- API endpoint configuration

## Analytics Dashboard

The analytics dashboard provides visual insights into your emission calculations:

### Emission Trend Chart (Line Chart)
- Displays the last 10 emission calculations
- Shows trend over time
- Helps identify patterns in resource usage

### Regional Emissions Chart (Bar Chart)
- Compares average emissions across different regions
- Aggregates data by region
- Color-coded for easy identification

### Recent Calculations Table
- Shows the last 10 calculations
- Displays CPU, RAM, Storage, Region, Emissions, and Timestamp
- Sortable and scrollable
- Refresh button to reload data

## Troubleshooting

### Backend Connection Error

**Error:** "Failed to connect to backend"

**Solution:**
1. Ensure backend is running: `uvicorn main:app --reload`
2. Check backend URL: `http://127.0.0.1:8000`
3. Verify CORS is enabled in backend

### Analytics Not Loading

**Error:** "Failed to load analytics data"

**Solution:**
1. Ensure backend is running
2. Make at least one prediction using `/calculate` endpoint
3. Check that `/logs` endpoint is accessible
4. Click the "Retry" button in the dashboard

### Port Already in Use

**Error:** "Port 3000 is already in use"

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

## Dependencies

### Core Dependencies
- `next` - Next.js framework
- `react` - React library
- `react-dom` - React DOM
- `chart.js` - Charting library
- `react-chartjs-2` - React wrapper for Chart.js

### Dev Dependencies
- `tailwindcss` - CSS framework
- `eslint` - Code linting
- `typescript` - Type checking

## Future Enhancements

- [ ] Export charts as images
- [ ] Export results to CSV
- [ ] Dark/Light mode toggle
- [ ] Multiple prediction comparison
- [ ] User authentication
- [ ] Saved predictions
- [ ] Date range filtering for analytics
- [ ] More chart types (pie, doughnut)

## License

MIT

## Author

GHG Platform Team
