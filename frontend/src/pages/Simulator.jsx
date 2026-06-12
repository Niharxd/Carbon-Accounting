import { useState } from 'react';
import { Link } from 'react-router-dom';
import { simulateEmissions } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const regions = [
  { value: 'IN', label: 'India', intensity: 700 },
  { value: 'US', label: 'United States', intensity: 400 },
  { value: 'CN', label: 'China', intensity: 650 },
  { value: 'DE', label: 'Germany', intensity: 300 },
  { value: 'FR', label: 'France', intensity: 80 },
  { value: 'SE', label: 'Sweden', intensity: 100 },
];

export default function Simulator() {
  const [form, setForm] = useState({ cpu: '', ram: '', storage: '', region: 'IN' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await simulateEmissions({
        cpu: parseFloat(form.cpu),
        ram: parseFloat(form.ram),
        storage: parseFloat(form.storage),
        region: form.region,
      });
      setResult(res);
    } catch (err) {
      setError(err.message || 'Simulation failed. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const reductionBarWidth = result
    ? Math.max(5, 100 - result.reduction_pct)
    : 100;

  return (
    <div className="space-y-10 animate-fadeInUp">
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-12 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full shadow-lg shadow-emerald-500/30" />
          <div>
            <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Optimization Lab</span>
            <p className="text-slate-400 text-xs mt-1">Simulate emission reductions before deploying changes</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Carbon Simulator
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mt-4">
              Enter your current infrastructure specs to see how optimization changes your emissions profile.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input form */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 space-y-5">
          <p className="text-slate-300 font-semibold">Current Infrastructure</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'cpu', label: 'CPU Cores', placeholder: '8' },
                { name: 'ram', label: 'RAM (GB)', placeholder: '16' },
                { name: 'storage', label: 'Storage (GB)', placeholder: '500' },
              ].map((f) => (
                <div key={f.name} className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{f.label}</label>
                  <input
                    type="number"
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    required
                    step="0.1"
                    placeholder={f.placeholder}
                    className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:border-emerald-500/60 focus:ring-emerald-400/20 transition"
                  />
                </div>
              ))}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Region</label>
                <div className="relative">
                  <select
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    className="w-full appearance-none bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:border-emerald-500/60 focus:ring-emerald-400/20 transition cursor-pointer"
                  >
                    {regions.map((r) => (
                      <option key={r.value} value={r.value} className="bg-slate-900">
                        {r.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary text-white font-bold py-3 rounded-xl transition hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-40 flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
            >
              {loading ? <><LoadingSpinner size="sm" /><span>Simulating...</span></> : 'Run Simulation'}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 space-y-5">
          <p className="text-slate-300 font-semibold">Simulation Results</p>

          {!result && !loading && (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-center border border-dashed border-slate-700 rounded-2xl">
              <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-slate-500 text-sm">Submit your specs to see the optimization results.</p>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center h-48">
              <LoadingSpinner size="lg" text="Running simulation..." />
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-950/80 border border-slate-700/50 p-4">
                  <p className="text-slate-400 uppercase text-[11px] tracking-widest font-semibold mb-2">Current</p>
                  <p className="text-3xl font-black text-white">{result.current_emissions.toFixed(2)}</p>
                  <p className="text-slate-500 text-xs mt-1">kg CO₂</p>
                </div>
                <div className="rounded-2xl bg-slate-950/80 border border-emerald-500/30 p-4">
                  <p className="text-slate-400 uppercase text-[11px] tracking-widest font-semibold mb-2">Optimized</p>
                  <p className="text-3xl font-black text-emerald-300">{result.optimized_emissions.toFixed(2)}</p>
                  <p className="text-slate-500 text-xs mt-1">kg CO₂</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="rounded-2xl bg-slate-950/80 border border-slate-700/50 p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Reduction potential</span>
                  <span className="font-black text-emerald-300">{result.reduction_pct.toFixed(1)}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-700"
                    style={{ width: `${Math.max(5, 100 - reductionBarWidth)}%` }}
                  />
                </div>
                <p className="text-slate-400 text-xs">
                  Carbon saved: <span className="text-emerald-400 font-semibold">{result.carbon_saved.toFixed(2)} kg CO₂</span>
                </p>
              </div>

              {/* Optimized config */}
              <div className="rounded-2xl bg-slate-950/80 border border-slate-700/50 p-4">
                <p className="text-slate-400 uppercase text-[11px] tracking-widest font-semibold mb-3">Suggested Config</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    ['CPU', `${result.optimized_cpu?.toFixed(1)} cores`],
                    ['RAM', `${result.optimized_ram?.toFixed(1)} GB`],
                    ['Storage', `${result.optimized_storage?.toFixed(0)} GB`],
                    ['Region', result.optimized_region],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-slate-500">{label}</span>
                      <span className="text-emerald-300 font-semibold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
