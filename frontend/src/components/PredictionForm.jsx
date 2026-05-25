import { useState } from 'react';
import { predictEmissions } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const regions = [
  { value: 'IN', label: 'India', intensity: 700, flag: '🇮🇳' },
  { value: 'US', label: 'United States', intensity: 400, flag: '🇺🇸' },
  { value: 'CN', label: 'China', intensity: 650, flag: '🇨🇳' },
  { value: 'DE', label: 'Germany', intensity: 300, flag: '🇩🇪' },
  { value: 'FR', label: 'France', intensity: 80, flag: '🇫🇷' },
  { value: 'SE', label: 'Sweden', intensity: 100, flag: '🇸🇪' },
];

export default function PredictionForm() {
  const [form, setForm] = useState({ cpu: '', ram: '', storage: '', region: 'IN' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await predictEmissions({
        cpu: parseFloat(form.cpu),
        ram: parseFloat(form.ram),
        storage: parseFloat(form.storage),
        region: form.region,
      });
      setResult(response);
      window.dispatchEvent(new Event('predictionMade'));
    } catch (err) {
      setError(err.message || 'Could not reach backend. Make sure the server is running.');
    } finally {
      setLoading(false);
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

      <div className="glass border border-emerald-500/30 rounded-3xl p-10 shadow-2xl shadow-emerald-500/20 backdrop-blur-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-40 -mt-40" />

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: 'cpu', label: 'CPU Cores', placeholder: 'e.g. 8', icon: '⚙️' },
              { name: 'ram', label: 'RAM (GB)', placeholder: 'e.g. 16', icon: '💾' },
              { name: 'storage', label: 'Storage (GB)', placeholder: 'e.g. 500', icon: '📦' },
            ].map((field) => (
              <div key={field.name} className="group space-y-2.5">
                <label className="flex items-center gap-2.5 text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                  <span className="text-lg">{field.icon}</span>
                  <span>{field.label}</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    required
                    step="0.1"
                    placeholder={field.placeholder}
                    className="w-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 text-white rounded-xl px-5 py-3.5 text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-400/30 transition-all duration-200"
                  />
                </div>
              </div>
            ))}

            <div className="group space-y-2.5">
              <label className="flex items-center gap-2.5 text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                <span className="text-lg">🌍</span>
                <span>Region</span>
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
                      {region.flag} {region.label} — {region.intensity} gCO₂/kWh
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none">🌍</div>
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
                <span>⚡ Run Prediction</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 group-hover:scale-110 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      {result && (
        <div className="glass border border-emerald-500/40 rounded-3xl p-10 space-y-8 animate-fadeInUp shadow-2xl shadow-emerald-500/20 backdrop-blur-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -ml-40 -mt-40" />

          <div className="relative z-10">
            <h3 className="text-4xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent mb-2">✨ Results</h3>
            <p className="text-slate-400 text-lg">Your carbon emissions prediction</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
            {[
              { label: 'CPU', value: `${result.cpu}`, unit: 'cores' },
              { label: 'RAM', value: `${result.ram}`, unit: 'GB' },
              { label: 'Storage', value: `${result.storage}`, unit: 'GB' },
              { label: 'Region', value: result.region, unit: '' },
            ].map((item) => (
              <div key={item.label} className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 hover:from-slate-700/60 hover:to-slate-800/40 rounded-xl p-5 border border-slate-600/40 hover:border-emerald-500/40 transition-all duration-300 hover:scale-105">
                <p className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-wide">{item.label}</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-white font-black text-2xl">{item.value}</p>
                  {item.unit && <p className="text-slate-500 text-xs font-semibold">{item.unit}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
            <div className="group bg-gradient-to-br from-blue-600/20 to-blue-700/10 hover:from-blue-600/30 hover:to-blue-700/15 border border-blue-500/40 rounded-2xl p-8 shadow-2xl shadow-blue-500/15 transition-all duration-300 hover:scale-105 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-500/0 group-hover:from-blue-400/5 group-hover:to-blue-500/5 transition-all duration-300" />
              <div className="relative z-10">
                <p className="text-blue-300 text-xs font-black uppercase tracking-widest mb-3">Carbon Intensity</p>
                <p className="text-5xl font-black text-blue-400">{result.carbon_intensity}</p>
                <p className="text-slate-400 text-sm font-semibold mt-3">gCO₂/kWh</p>
              </div>
            </div>
            <div className="group bg-gradient-to-br from-emerald-600/20 to-teal-700/10 hover:from-emerald-600/30 hover:to-teal-700/15 border border-emerald-500/40 rounded-2xl p-8 shadow-2xl shadow-emerald-500/15 transition-all duration-300 hover:scale-105 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 to-emerald-500/0 group-hover:from-emerald-400/5 group-hover:to-emerald-500/5 transition-all duration-300" />
              <div className="relative z-10">
                <p className="text-emerald-300 text-xs font-black uppercase tracking-widest mb-3">Predicted Emissions</p>
                <p className="text-5xl font-black text-emerald-400">{result.predicted_emissions.toFixed(2)}</p>
                <p className="text-slate-400 text-sm font-semibold mt-3">kg CO₂</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/60 border border-slate-700/40 rounded-2xl p-6 shadow-lg shadow-slate-900/20 transition-all duration-300 hover:scale-[1.01] overflow-hidden relative">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">Efficiency Score</p>
              <p className="text-4xl font-black text-emerald-300">{result.efficiency_score}</p>
              <p className="text-slate-400 text-sm mt-2">Higher is better</p>
            </div>
            <div className="group bg-gradient-to-br from-slate-800/50 to-slate-900/60 border border-slate-700/40 rounded-2xl p-6 shadow-lg shadow-slate-900/20 transition-all duration-300 hover:scale-[1.01] overflow-hidden relative">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-3">Model Used</p>
              <p className="text-3xl font-black text-blue-300">{result.model_used}</p>
              <p className="text-slate-400 text-sm mt-2">Best-performing model</p>
            </div>
            <div className={`group rounded-2xl p-6 shadow-lg transition-all duration-300 ${result.anomaly_detected ? 'bg-red-600/20 border border-red-500/40 shadow-red-500/20 hover:scale-[1.01]' : 'bg-emerald-600/15 border border-emerald-500/30 shadow-emerald-500/15 hover:scale-[1.01]'}`}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3">Anomaly Status</p>
              <p className={`text-4xl font-black ${result.anomaly_detected ? 'text-red-200' : 'text-emerald-200'}`}>
                {result.anomaly_detected ? 'Alert' : 'Normal'}
              </p>
              <p className={`text-sm mt-2 ${result.anomaly_detected ? 'text-red-100' : 'text-slate-300'}`}>
                {result.anomaly_detected ? 'Unusually high emissions detected' : 'Emissions are within expected range'}
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className={`rounded-3xl p-6 mt-6 border ${result.anomaly_detected ? 'border-red-500/30 bg-red-500/10' : 'border-emerald-500/30 bg-emerald-500/10'} text-sm text-slate-100`}> 
              <p className="font-bold text-white mb-2">{result.anomaly_detected ? 'Warning:' : 'Status:'}</p>
              <p>{result.anomaly_detected ? 'This prediction is above expected emission levels and may need immediate optimization.' : 'Emissions are within the normal range for this infrastructure profile.'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10 mt-6">
            {result.recommendations?.map((recommendation, index) => (
              <div key={index} className="group bg-gradient-to-br from-slate-800/50 to-slate-900/60 border border-slate-700/40 rounded-3xl p-6 shadow-lg shadow-slate-900/20 transition-all duration-300 hover:scale-[1.01] overflow-hidden relative">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Recommendation</p>
                <p className="text-slate-100 text-sm leading-6">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
