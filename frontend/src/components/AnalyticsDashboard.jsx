import { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchLogs, fetchModelMetrics } from '../services/api';
import { getToken } from '../services/auth';
import { Link } from 'react-router-dom';
import MetricCard from './MetricCard';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#cbd5e1', font: { size: 13, weight: '600' } } },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      borderWidth: 1,
      titleColor: '#f1f5f9',
      bodyColor: '#cbd5e1',
      padding: 12,
      borderRadius: 8,
    },
  },
  scales: {
    x: {
      ticks: { color: '#94a3b8', font: { size: 12 } },
      grid: { color: 'rgba(16, 185, 129, 0.05)' },
    },
    y: {
      ticks: { color: '#94a3b8', font: { size: 12 } },
      grid: { color: 'rgba(16, 185, 129, 0.05)' },
    },
  },
};

export default function AnalyticsDashboard() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modelMetrics, setModelMetrics] = useState(null);
  const [metricsError, setMetricsError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(getToken());
  }, []);

  const loadLogs = async () => {
    if (!getToken()) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetchLogs();
      setLogs(res.logs || []);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load data. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const loadModelMetrics = async () => {
    try {
      const res = await fetchModelMetrics();
      setModelMetrics(res);
      setMetricsError(null);
    } catch (err) {
      setMetricsError('Failed to load model metrics.');
    }
  };

  useEffect(() => {
    if (token === null) return;

    loadLogs();
    loadModelMetrics();

    const handler = () => {
      setTimeout(() => {
        loadLogs();
        loadModelMetrics();
      }, 1000);
    };

    window.addEventListener('predictionMade', handler);
    return () => window.removeEventListener('predictionMade', handler);
  }, [token]);

  const total = logs.length;
  const avgEmissions = total ? (logs.reduce((sum, item) => sum + item.emissions, 0) / total).toFixed(2) : '—';
  const regionCount = logs.reduce((acc, item) => {
    acc[item.region] = (acc[item.region] || 0) + 1;
    return acc;
  }, {});
  const topRegion = total ? Object.entries(regionCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '—' : '—';
  const maxEmission = total ? Math.max(...logs.map((item) => item.emissions)).toFixed(2) : '—';

  const recent = [...logs].slice(0, 10).reverse();
  const lineData = {
    labels: recent.map((_, index) => `Pred #${index + 1}`),
    datasets: [
      {
        label: 'Emissions (kg CO₂)',
        data: recent.map((item) => item.emissions),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16,185,129,0.1)',
        tension: 0.3,
        fill: true,
        pointBackgroundColor: '#10b981',
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderColor: '#059669',
        pointBorderWidth: 2,
      },
    ],
  };

  const regionData = logs.reduce((acc, item) => {
    if (!acc[item.region]) acc[item.region] = { total: 0, count: 0 };
    acc[item.region].total += item.emissions;
    acc[item.region].count += 1;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(regionData),
    datasets: [
      {
        label: 'Avg Emissions (kg CO₂)',
        data: Object.values(regionData).map((item) => (item.total / item.count).toFixed(2)),
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  if (!token) {
    return (
      <section id="analytics">
        <EmptyState
          icon="🔒"
          title="Sign in to view your analytics"
          message="Your personal dashboard with charts, history, and detailed insights will appear here after login."
          action={
            <div className="flex justify-center gap-3 pt-2">
              <Link to="/login" className="px-5 py-2 gradient-primary hover:shadow-lg hover:shadow-emerald-500/30 text-white text-sm rounded-lg transition font-semibold">Sign In</Link>
              <Link to="/signup" className="px-5 py-2 glass border border-emerald-500/30 text-emerald-300 hover:text-emerald-200 text-sm rounded-lg transition font-semibold">Sign Up</Link>
            </div>
          }
        />
      </section>
    );
  }

  if (loading) {
    return (
      <section id="analytics" className="glass border border-emerald-500/20 rounded-2xl p-16 flex justify-center">
        <LoadingSpinner size="lg" text="Loading your analytics..." />
      </section>
    );
  }

  if (error) {
    return (
      <section id="analytics" className="bg-red-500/10 border border-red-500/30 rounded-2xl p-10 text-center space-y-4">
        <p className="text-red-300">{error}</p>
        <button onClick={loadLogs} className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg transition font-medium">Retry</button>
      </section>
    );
  }

  if (!total) {
    return (
      <section id="analytics">
        <EmptyState icon="📊" title="No predictions yet" message="Run your first prediction above to see analytics, trends, and detailed insights here." />
      </section>
    );
  }

  return (
    <section id="analytics" className="space-y-10 animate-fadeInUp">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-10 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full shadow-lg shadow-blue-500/50"></div>
            <div>
              <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Data Intelligence</span>
              <p className="text-slate-400 text-xs mt-1">Detailed insights & trends</p>
            </div>
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">Analytics Dashboard</h2>
          <p className="text-slate-400 text-lg mt-3">Based on your {total} prediction{total !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={loadLogs}
          className="group flex items-center gap-2.5 px-6 py-3 text-sm text-slate-300 hover:text-emerald-300 glass border border-emerald-500/30 hover:border-emerald-400/50 rounded-xl transition-all hover:scale-105 font-semibold"
        >
          <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Total Predictions" value={total} icon="📊" color="blue" />
        <MetricCard title="Avg Emissions" value={avgEmissions} unit="kg CO₂" icon="🌱" color="green" />
        <MetricCard title="Peak Emission" value={maxEmission} unit="kg CO₂" icon="⚡" color="orange" />
        <MetricCard title="Top Region" value={topRegion} icon="🌍" color="purple" />
      </div>

      {modelMetrics && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <MetricCard title="Active Model" value={modelMetrics.model_name || 'Unknown'} icon="🧠" color="purple" />
          <MetricCard title="Training Score" value={modelMetrics.training_score?.toFixed(3) ?? '—'} icon="📈" color="blue" />
          <MetricCard title="Testing Score" value={modelMetrics.testing_score?.toFixed(3) ?? '—'} icon="✅" color="green" />
        </div>
      )}

      {metricsError && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          {metricsError}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass border border-emerald-500/30 rounded-3xl p-8 shadow-2xl shadow-emerald-500/15 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-40 -mt-40"></div>
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-white">Emission Trend</h3>
              <p className="text-slate-400 text-sm mt-2">Last 10 predictions over time</p>
            </div>
            <span className="text-3xl">📈</span>
          </div>
          <div className="h-80 relative z-10">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>

        <div className="glass border border-blue-500/30 rounded-3xl p-8 shadow-2xl shadow-blue-500/15 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -ml-40 -mt-40"></div>
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-white">Emissions by Region</h3>
              <p className="text-slate-400 text-sm mt-2">Average CO₂ per region</p>
            </div>
            <span className="text-3xl">🌍</span>
          </div>
          <div className="h-80 relative z-10">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div id="history" className="glass border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/15 relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -ml-40 -mt-40"></div>
        <div className="px-8 py-6 border-b border-emerald-500/20 relative z-10 flex items-center gap-4">
          <span className="text-3xl">📋</span>
          <div>
            <h3 className="text-2xl font-bold text-white">Recent Calculations</h3>
            <p className="text-slate-400 text-sm mt-1">Your latest {Math.min(10, logs.length)} predictions</p>
          </div>
        </div>
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-emerald-500/20 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent">
                {['CPU', 'RAM', 'Storage', 'Region', 'Emissions', 'Time'].map((heading) => (
                  <th key={heading} className="px-8 py-5 text-left text-xs font-black text-slate-300 uppercase tracking-wider">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.slice(0, 10).map((log, index) => (
                <tr key={log.id || index} className="border-b border-emerald-500/10 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:via-transparent hover:to-transparent transition-colors group">
                  <td className="px-8 py-5 text-slate-200 font-bold group-hover:text-emerald-300 transition-colors">{log.cpu}</td>
                  <td className="px-8 py-5 text-slate-300">{log.ram} GB</td>
                  <td className="px-8 py-5 text-slate-300">{log.storage} GB</td>
                  <td className="px-8 py-5">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-blue-600/10 text-blue-300 rounded-lg text-xs font-bold border border-blue-500/30 group-hover:border-blue-400/50 transition-all group-hover:bg-gradient-to-r group-hover:from-blue-500/30 group-hover:to-blue-600/20">
                      {log.region}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-emerald-400 font-black text-lg">{log.emissions.toFixed(2)}</td>
                  <td className="px-8 py-5 text-slate-500 text-xs font-semibold">{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
