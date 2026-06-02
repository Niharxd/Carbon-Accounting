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
  cpu: 'Number of CPU cores used for this workload. Use whole numbers for the best estimate.',
  ram: 'RAM capacity in gigabytes. Higher RAM typically increases power draw.',
  storage: 'Total storage in gigabytes for your dataset or service.',
};

export default function PredictionForm() {
  const [form, setForm] = useState({ cpu: '', ram: '', storage: '', region: 'IN' });
  const [result, setResult] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    setSuccessMessage('');
  };

  const validateForm = () => {
    const errors = {};
    ['cpu', 'ram', 'storage'].forEach((field) => {
      const value = parseFloat(form[field]);
      if (!form[field]) {
        errors[field] = 'This field is required.';
      } else if (Number.isNaN(value) || value <= 0) {
        errors[field] = 'Enter a positive number.';
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage('');

    if (!validateForm()) {
      setError('Please fix the highlighted fields before submitting.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await predictEmissions({
        cpu: parseFloat(form.cpu),
        ram: parseFloat(form.ram),
        storage: parseFloat(form.storage),
        region: form.region,
      });
      setResult(response);
      setSuccessMessage('Prediction completed successfully. Review the details below for actionable insights.');
      window.dispatchEvent(new Event('predictionMade'));

      try {
        const sim = await simulateEmissions({
          cpu: parseFloat(form.cpu),
          ram: parseFloat(form.ram),
          storage: parseFloat(form.storage),
          region: form.region,
        });
        setSimulation(sim);
      } catch (simErr) {
        console.warn('Simulation failed', simErr);
      }
    } catch (err) {
      setError(err.message || 'Could not reach backend. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!result) return;

    setReportLoading(true);
    setError(null);
    try {
      const blob = await generateReport({
        summary: result,
        recommendations: result.recommendations || [],
        forecast: simulation ? { forecast_7: [], forecast_30: [] } : {},
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
          <div className="w-2 h-10 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/50"></div>
          <div>
            <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Predictive Analytics</span>
            <p className="text-slate-400 text-xs mt-1">Real-time CO₂ estimation</p>
          </div>
        </div>
        <h2 className="text-4xl font-black bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent">Run Prediction</h2>
        <p className="text-slate-400 text-lg mt-3">Enter your infrastructure specs for instant carbon footprint estimation</p>
      </div>

      <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-10 shadow-lg shadow-emerald-500/15 overflow-hidden relative">

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: 'cpu', label: 'CPU Cores', placeholder: 'e.g. 8' },
              { name: 'ram', label: 'RAM (GB)', placeholder: 'e.g. 16' },
              { name: 'storage', label: 'Storage (GB)', placeholder: 'e.g. 500' },
            ].map((field) => (
              <div key={field.name} className="group space-y-2.5">
                <label htmlFor={field.name} className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    id={field.name}
                    type="number"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    step="0.1"
                    placeholder={field.placeholder}
                    aria-describedby={`${field.name}-help ${field.name}-error`}
                    className={`w-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border text-white rounded-xl px-5 py-3.5 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 transition-all duration-200 ${fieldErrors[field.name] ? 'border-red-400/70 focus:border-red-400 focus:ring-red-400/30' : 'border-slate-700/50 focus:border-emerald-500/60 focus:ring-emerald-400/30'}`}
                  />
                </div>
                <p id={`${field.name}-help`} className="text-xs text-slate-500">{fieldHelp[field.name]}</p>
                {fieldErrors[field.name] && (
                  <p id={`${field.name}-error`} className="text-xs text-red-300">{fieldErrors[field.name]}</p>
                )}
              </div>
            ))}

            <div className="group space-y-2.5">
              <label className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                Region
              </label>
              <div className="relative">
                <select
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  className="w-full appearance-none bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 text-white rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-400/30 transition-all duration-200 cursor-pointer font-medium"
                >
                  {regions.map((region) => (
                    <option key={region.value} value={region.value}>
                      {region.label} — {region.intensity} gCO₂/kWh
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-3 text-sm text-red-300 bg-gradient-to-r from-red-500/15 to-red-600/10 border border-red-500/40 rounded-xl px-5 py-4 animate-fadeInUp">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-start gap-3 text-sm text-emerald-200 bg-gradient-to-r from-emerald-400/10 to-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-4 animate-fadeInUp">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.25-4.5l-3.5-3.5 1.06-1.06 2.44 2.44 5.44-5.44 1.06 1.06-6.5 6.5z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary hover:shadow-2xl hover:shadow-emerald-500/50 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group text-lg uppercase tracking-wide"
          >
            {loading ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Analyzing Your Infrastructure...</span>
              </>
            ) : (
              <>
                <span>Run Prediction</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-3xl p-10 space-y-8 animate-fadeInUp shadow-lg shadow-emerald-500/15 overflow-hidden relative">
          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-4xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">Prediction & Optimization</h3>
              <p className="text-slate-400 text-lg">Results, sustainability score, and targeted recommendations.</p>
            </div>
            <button
              onClick={handleDownloadReport}
              disabled={reportLoading}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {reportLoading ? 'Generating Report...' : 'Download Report'}
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/20">
                <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-4">Predicted Emissions</p>
                <p className="text-5xl font-black text-emerald-400">{result.predicted_emissions.toFixed(2)}</p>
                <p className="text-slate-400 mt-2 text-sm">kg CO₂ — estimated carbon footprint for your configuration.</p>
              </div>
              <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/20">
                <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-4">Carbon Intensity</p>
                <p className="text-5xl font-black text-blue-400">{result.carbon_intensity}</p>
                <p className="text-slate-400 mt-2 text-sm">gCO₂/kWh — use this value to compare regions.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/20 flex flex-col items-center justify-center gap-4">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-slate-900/70 shadow-inner shadow-slate-950/30">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(${result.sustainability_score >= 70 ? '#34d399' : result.sustainability_score >= 50 ? '#fbbf24' : '#f87171'} ${result.sustainability_score * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
                  }}
                />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-950/90 text-center">
                  <div>
                    <p className="text-4xl font-black text-white">{result.sustainability_score}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-[0.3em]">Score</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-slate-200 font-bold text-lg">{result.sustainability_rating}</p>
                <p className="text-slate-400 text-sm">Sustainability score based on emissions, efficiency, and anomaly risk.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/20">
              <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-4">Efficiency Score</p>
              <p className="text-4xl font-black text-emerald-300">{result.efficiency_score}</p>
              <p className="text-slate-400 mt-3 text-sm">Higher values mean the model sees your setup as more efficient.</p>
            </div>
            <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/20">
              <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-4">Model Used</p>
              <p className="text-3xl font-black text-blue-300">{result.model_used}</p>
              <p className="text-slate-400 mt-3 text-sm">This is the algorithm powering the prediction.</p>
            </div>
            <div className={`rounded-3xl p-6 shadow-lg transition-all duration-300 ${result.anomaly_detected ? 'border border-red-500/40 bg-red-500/10 shadow-red-500/20' : 'border border-emerald-500/40 bg-emerald-500/10 shadow-emerald-500/20'}`}>
              <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-4">Anomaly Status</p>
              <p className={`text-4xl font-black ${result.anomaly_detected ? 'text-red-200' : 'text-emerald-200'}`}>{result.anomaly_detected ? 'Alert' : 'Normal'}</p>
              <p className="text-slate-400 mt-3 text-sm">{result.anomaly_detected ? 'Potential emissions spike detected.' : 'Predictive output is within normal thresholds.'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
            <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/20">
              <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-4">AI Insights</p>
              <div className="space-y-3">
                {result.insights?.map((insight, index) => (
                  <div key={index} className="rounded-2xl border border-slate-700/40 bg-slate-900/80 p-4 text-slate-300">
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-6 shadow-lg shadow-slate-950/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-400 uppercase tracking-[0.3em] text-[11px] font-semibold">Carbon Reduction Simulator</p>
                  <h4 className="text-white text-xl font-black">Optimization Preview</h4>
                </div>
                <span className="rounded-full bg-slate-800/90 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">Simulated</span>
              </div>
              {simulation ? (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-700/50">
                    <p className="text-slate-400 text-xs uppercase tracking-[0.3em] mb-2">Current Emissions</p>
                    <p className="text-3xl font-black text-emerald-300">{simulation.current_emissions.toFixed(2)} kg CO₂</p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-700/50">
                    <p className="text-slate-400 text-xs uppercase tracking-[0.3em] mb-2">Optimized Emissions</p>
                    <p className="text-3xl font-black text-blue-300">{simulation.optimized_emissions.toFixed(2)} kg CO₂</p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-700/50">
                    <p className="text-slate-400 text-xs uppercase tracking-[0.3em] mb-2">Potential Reduction</p>
                    <p className="text-3xl font-black text-emerald-300">{simulation.reduction_pct.toFixed(1)}%</p>
                    <p className="text-slate-400 text-sm mt-2">Carbon saved: {simulation.carbon_saved.toFixed(2)} kg CO₂</p>
                  </div>
                </div>
              ) : (
                <p className="text-slate-400">Simulation values will appear after prediction.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {result.recommendations?.map((recommendation, index) => (
              <div key={index} className="group rounded-3xl border border-slate-700/40 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20 transition-all duration-300 hover:scale-[1.01]">
                <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-3">{recommendation.title}</p>
                <p className="text-slate-100 text-sm leading-6 mb-4">{recommendation.description}</p>
                <span className="inline-flex rounded-full bg-slate-800/70 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">Impact: {recommendation.impact}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
