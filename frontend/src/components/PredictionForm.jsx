import { useState } from 'react';
import { predictEmissions, simulateEmissions, generateReport } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const regions = [
  { value: 'IN', label: 'India', intensity: 700 },
  { value: 'US', label: 'United States', intensity: 400 },
  { value: 'CN', label: 'China', intensity: 650 },
  { value: 'DE', label: 'Germany', intensity: 300 },
  { value: 'FR', label: 'France', intensity: 80 },
  { value: 'SE', label: 'Sweden', intensity: 100 },
];

const fieldHelp = {
  cpu: 'Number of CPU cores for this workload.',
  ram: 'RAM in GB — higher RAM increases power draw.',
  storage: 'Total storage in GB for your dataset or service.',
};

export default function PredictionForm() {
  const [form, setForm] = useState({ cpu: '', ram: '', storage: '', region: 'IN' });
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [lastResult, setLastResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccessMessage('');
  };

  const validateForm = () => {
    const errors = {};
    ['cpu', 'ram', 'storage'].forEach((field) => {
      const value = parseFloat(form[field]);
      if (!form[field]) errors[field] = 'Required.';
      else if (Number.isNaN(value) || value <= 0) errors[field] = 'Enter a positive number.';
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        cpu: parseFloat(form.cpu),
        ram: parseFloat(form.ram),
        storage: parseFloat(form.storage),
        region: form.region,
      };
      const response = await predictEmissions(payload);
      setLastResult(response);
      try { localStorage.setItem('lastPrediction', JSON.stringify(response)); } catch {}
      setSuccessMessage('Prediction complete — review the results panel.');

      let simResult = null;
      try {
        simResult = await simulateEmissions(payload);
      } catch (simErr) {
        console.warn('Simulation failed', simErr);
      }

      try {
        window.dispatchEvent(new CustomEvent('predictionMade', { detail: { result: response, simulation: simResult } }));
      } catch {
        window.dispatchEvent(new Event('predictionMade'));
      }
    } catch (err) {
      setError(err.message || 'Could not reach backend. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!lastResult) return;
    setReportLoading(true);
    setError(null);
    try {
      const blob = await generateReport({
        summary: lastResult,
        recommendations: lastResult.recommendations || [],
        forecast: {},
      });
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ghg_sustainability_report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'Failed to generate report.');
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <section id="predictions" className="space-y-8 animate-fadeInUp">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-10 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/50" />
          <div>
            <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Predictive Analytics</span>
            <p className="text-slate-400 text-xs mt-1">Real-time CO₂ estimation</p>
          </div>
        </div>
        <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">
          Run Prediction
        </h2>
        <p className="text-slate-400 text-lg mt-3">Enter your infrastructure specs for instant carbon footprint estimation</p>
      </div>

      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-8 shadow-lg shadow-emerald-500/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { name: 'cpu', label: 'CPU Cores', placeholder: 'e.g. 8' },
              { name: 'ram', label: 'RAM (GB)', placeholder: 'e.g. 16' },
              { name: 'storage', label: 'Storage (GB)', placeholder: 'e.g. 500' },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label htmlFor={field.name} className="block text-sm font-semibold text-slate-200">
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type="number"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  step="0.1"
                  placeholder={field.placeholder}
                  className={`w-full bg-slate-800/60 border text-white rounded-xl px-4 py-3 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 transition-all ${
                    fieldErrors[field.name]
                      ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/20'
                      : 'border-slate-700 focus:border-emerald-500/60 focus:ring-emerald-400/20'
                  }`}
                />
                <p className="text-xs text-slate-500">{fieldHelp[field.name]}</p>
                {fieldErrors[field.name] && (
                  <p className="text-xs text-red-400">{fieldErrors[field.name]}</p>
                )}
              </div>
            ))}

            {/* Region select */}
            <div className="space-y-2">
              <label htmlFor="region" className="block text-sm font-semibold text-slate-200">
                Region
              </label>
              <div className="relative">
                <select
                  id="region"
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  className="w-full appearance-none bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:border-emerald-500/60 focus:ring-emerald-400/20 transition-all cursor-pointer"
                >
                  {regions.map((r) => (
                    <option key={r.value} value={r.value} className="bg-slate-900">
                      {r.label} — {r.intensity} gCO₂/kWh
                    </option>
                  ))}
                </select>
                {/* Custom chevron */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {/* Live carbon intensity preview */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">Grid carbon intensity</p>
                <span className="text-xs font-bold text-emerald-400 animate-countUp">
                  {regions.find((r) => r.value === form.region)?.intensity ?? '—'} gCO₂/kWh
                </span>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-3 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start gap-3 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 gradient-primary hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Run Prediction</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            {lastResult && (
              <button
                type="button"
                onClick={handleDownloadReport}
                disabled={reportLoading}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-300 text-sm font-semibold hover:border-emerald-500/50 hover:text-emerald-300 transition-all disabled:opacity-40"
              >
                {reportLoading ? <LoadingSpinner size="sm" /> : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    PDF Report
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
