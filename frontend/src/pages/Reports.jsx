import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateReport, fetchLogs } from '../services/api';
import { getToken, getUsernameFromToken } from '../services/auth';
import LoadingSpinner from '../components/LoadingSpinner';

function downloadBlob(blob, filename) {
  const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
  const a = document.createElement('a');
  a.href = url;
  a.setAttribute('download', filename);
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export default function Reports() {
  const [lastResult, setLastResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = getToken();

  // Pick up the last prediction from localStorage (saved by PredictionForm)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('lastPrediction');
      if (stored) setLastResult(JSON.parse(stored));
    } catch {}

    if (token) {
      fetchLogs()
        .then((res) => setLogs(res.logs || []))
        .catch(() => {});
    }

    function onPrediction(e) {
      const result = e?.detail?.result;
      if (result) {
        setLastResult(result);
        try { localStorage.setItem('lastPrediction', JSON.stringify(result)); } catch {}
      }
    }
    window.addEventListener('predictionMade', onPrediction);
    return () => window.removeEventListener('predictionMade', onPrediction);
  }, []);

  const handleDownload = async (type) => {
    setError(null);
    setSuccess(null);
    setLoading(type);
    try {
      const avgEmissions = logs.length
        ? (logs.reduce((s, l) => s + l.emissions, 0) / logs.length).toFixed(2)
        : null;

      const payload = {
        summary: lastResult
          ? {
              cpu: lastResult.cpu,
              ram: lastResult.ram,
              storage: lastResult.storage,
              region: lastResult.region,
              carbon_intensity: lastResult.carbon_intensity,
              predicted_emissions: lastResult.predicted_emissions,
              sustainability_score: lastResult.sustainability_score,
              anomaly_detected: lastResult.anomaly_detected,
              model_used: lastResult.model_used,
              ...(avgEmissions ? { average_emissions: avgEmissions } : {}),
            }
          : { note: type === 'executive' ? 'Executive summary — no prediction data available.' : 'No prediction data available.' },
        recommendations: lastResult?.recommendations || [],
        forecast: {},
      };

      const blob = await generateReport(payload);
      downloadBlob(blob, type === 'executive' ? 'ghg_executive_summary.pdf' : 'ghg_sustainability_report.pdf');
      setSuccess(`${type === 'executive' ? 'Executive summary' : 'Sustainability report'} downloaded.`);
    } catch (err) {
      setError(err.message || 'Failed to generate report. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-fadeInUp">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-12 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30" />
          <div>
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Documentation Center</span>
            <p className="text-slate-400 text-xs mt-1">Generate and export sustainability reports</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Reports
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mt-4">
              Download PDF sustainability reports generated from your latest prediction data.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-400 hover:text-blue-300"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      {/* Status messages */}
      {error && (
        <div className="rounded-2xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">{error}</div>
      )}
      {success && (
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-300">✓ {success}</div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Last prediction summary */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last Prediction Data</p>
          {lastResult ? (
            <div className="space-y-2 text-sm">
              {[
                ['Region', lastResult.region],
                ['CPU', `${lastResult.cpu} cores`],
                ['RAM', `${lastResult.ram} GB`],
                ['Storage', `${lastResult.storage} GB`],
                ['Predicted Emissions', `${lastResult.predicted_emissions} kg CO₂`],
                ['Sustainability Score', `${lastResult.sustainability_score} / 100`],
                ['Anomaly', lastResult.anomaly_detected ? '⚠ Detected' : '✓ Normal'],
                ['Model', lastResult.model_used],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-500">{label}</span>
                  <span className="text-slate-200 font-semibold">{val}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center space-y-2">
              <p className="text-slate-400 text-sm">No prediction data yet.</p>
              <Link to="/dashboard" className="text-emerald-400 text-sm hover:underline">Run a prediction first →</Link>
            </div>
          )}

          {logs.length > 0 && (
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-500 flex justify-between">
              <span>Total logged predictions</span>
              <span className="text-slate-300 font-semibold">{logs.length}</span>
            </div>
          )}
        </div>

        {/* Download actions */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Export Options</p>

          <div className="space-y-3">
            <button
              onClick={() => handleDownload('full')}
              disabled={!!loading}
              className="w-full flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                <span>Download Sustainability Report</span>
              </div>
              {loading === 'full' ? <LoadingSpinner size="sm" /> : <span className="text-xs opacity-70">PDF</span>}
            </button>

            <button
              onClick={() => handleDownload('executive')}
              disabled={!!loading}
              className="w-full flex items-center justify-between gap-3 rounded-2xl border border-slate-600 bg-slate-800/80 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Generate Executive Summary</span>
              </div>
              {loading === 'executive' ? <LoadingSpinner size="sm" /> : <span className="text-xs opacity-50">PDF</span>}
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed pt-2">
            Reports are generated from your most recent prediction. Run a new prediction on the Dashboard to refresh the data before downloading.
          </p>
        </div>
      </div>
    </div>
  );
}
