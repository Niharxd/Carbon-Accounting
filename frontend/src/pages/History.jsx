import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchLogs } from '../services/api';
import { getToken } from '../services/auth';
import LoadingSpinner from '../components/LoadingSpinner';

export default function History() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = getToken();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchLogs()
      .then((res) => setLogs(res.logs || []))
      .catch((err) => setError(err.message || 'Failed to load history.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10 animate-fadeInUp">
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-12 bg-gradient-to-b from-slate-500 to-slate-700 rounded-full shadow-lg shadow-slate-500/30" />
          <div>
            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Prediction Archive</span>
            <p className="text-slate-400 text-xs mt-1">Review past predictions and sustainability progress</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-5xl font-black bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 bg-clip-text text-transparent">
            Prediction History
          </h1>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 overflow-hidden shadow-xl">
        {!token && (
          <div className="p-10 text-center space-y-4">
            <p className="text-slate-400">Sign in to see your prediction history.</p>
            <Link to="/login" className="inline-block px-5 py-2 gradient-primary text-white rounded-xl text-sm font-semibold">
              Sign In
            </Link>
          </div>
        )}

        {token && loading && (
          <div className="p-16 flex justify-center">
            <LoadingSpinner size="lg" text="Loading history..." />
          </div>
        )}

        {token && error && (
          <div className="p-10 text-center text-red-400 text-sm">{error}</div>
        )}

        {token && !loading && !error && logs.length === 0 && (
          <div className="p-10 text-center text-slate-400 text-sm">
            No predictions yet. <Link to="/dashboard" className="text-emerald-400 hover:underline">Run one now →</Link>
          </div>
        )}

        {token && !loading && logs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-950/50">
                  {['CPU', 'RAM', 'Storage', 'Region', 'Emissions', 'Time'].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={log.id || i} className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 text-slate-200 font-semibold">{log.cpu}</td>
                    <td className="px-6 py-4 text-slate-300">{log.ram} GB</td>
                    <td className="px-6 py-4 text-slate-300">{log.storage} GB</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-500/15 text-blue-300 rounded-lg text-xs font-bold border border-blue-500/30">
                        {log.region}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-emerald-400 font-black">{log.emissions.toFixed(2)} kg</td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
