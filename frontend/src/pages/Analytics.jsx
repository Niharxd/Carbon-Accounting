import { Link } from 'react-router-dom';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

export default function Analytics() {
  return (
    <div className="space-y-10 animate-fadeInUp">
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-lg shadow-blue-500/50" />
            <div>
              <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Deep Insights</span>
              <p className="text-slate-400 text-xs mt-1">Trend charts and prediction history</p>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-400 hover:text-blue-300"
          >
            ← Dashboard
          </Link>
        </div>

        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl">
          View recorded predictions, model performance, and regional emissions insights.
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}
