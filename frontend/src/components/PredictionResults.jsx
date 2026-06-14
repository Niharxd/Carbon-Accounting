import { useEffect, useState } from 'react';
import SustainabilityScore from './SustainabilityScore';

export default function PredictionResults() {
  const [result, setResult] = useState(null);
  const [simulation, setSimulation] = useState(null);

  useEffect(() => {
    function handle(e) {
      const detail = e?.detail || {};
      if (detail.result) setResult(detail.result);
      if (detail.simulation) setSimulation(detail.simulation);
    }
    window.addEventListener('predictionMade', handle);
    return () => window.removeEventListener('predictionMade', handle);
  }, []);

  if (!result) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-10 flex flex-col items-center justify-center gap-5 h-full min-h-[320px] text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
          <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-white">No prediction yet</p>
          <p className="text-slate-400 text-sm mt-1 max-w-xs">
            Fill in your infrastructure specs on the left and run a prediction to see AI insights here.
          </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold animate-pulse">
          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Start with the form
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/40 overflow-hidden space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Prediction Results</p>
          <h3 className="text-xl font-black text-white mt-1">Analysis & Optimization</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 border border-slate-700/50 px-3 py-1.5 text-xs text-slate-300 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {result.model_used || 'Model'}
        </span>
      </div>

      {/* Anomaly banner */}
      {result.anomaly_detected && (
        <div className="flex items-center gap-3 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span><strong>Anomaly detected</strong> — emissions spike above expected threshold.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-4">
          {/* Predicted emissions */}
          <div className="rounded-2xl p-4 bg-slate-900/80 border border-slate-700/50">
            <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-1">Predicted Emissions</p>
            <p className={`text-4xl font-black ${
              result.anomaly_detected
                ? 'text-red-400'
                : result.predicted_emissions > 18.8
                ? 'text-amber-300'
                : 'text-emerald-300'
            }`}>{result.predicted_emissions.toFixed(2)}</p>
            <p className="text-slate-500 text-xs mt-1">kg CO₂ for this configuration</p>
          </div>

          {/* Efficiency + Anomaly */}
          <div className="rounded-2xl p-4 bg-slate-900/80 border border-slate-700/50 grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-1">Efficiency</p>
              <p className="text-2xl font-black text-emerald-300">{result.efficiency_score}</p>
              <p className="text-slate-500 text-xs mt-1">Higher = better</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-1">Status</p>
              <p className={`text-2xl font-black ${result.anomaly_detected ? 'text-red-400' : 'text-emerald-300'}`}>
                {result.anomaly_detected ? 'Alert' : 'Normal'}
              </p>
              <p className="text-slate-500 text-xs mt-1">{result.anomaly_detected ? 'Spike detected' : 'In range'}</p>
            </div>
          </div>

          {/* Top recommendation */}
          <div className="rounded-2xl p-4 bg-slate-900/80 border border-slate-700/50">
            <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-2">Top Recommendation</p>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <p className="text-white text-sm font-semibold">{result.recommendations?.[0]?.title}</p>
                <p className="text-slate-400 text-xs mt-1">{result.recommendations?.[0]?.description}</p>
                {result.recommendations?.[0]?.impact && (
                  <span className="inline-block mt-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2 py-0.5">
                    {result.recommendations[0].impact} impact
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4 items-center">
          <div className="w-full flex items-center justify-center py-2">
            <SustainabilityScore value={result.sustainability_score} />
          </div>

          {/* Carbon intensity */}
          <div className="w-full rounded-2xl p-4 bg-slate-900/80 border border-slate-700/50">
            <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-1">Carbon Intensity</p>
            <p className="text-2xl font-black text-blue-300">{result.carbon_intensity} <span className="text-sm font-normal text-slate-500">gCO₂/kWh</span></p>
            <p className="text-slate-500 text-xs mt-1">Region grid metric</p>
          </div>

          {/* Simulation preview */}
          {simulation && (
            <div className="w-full rounded-2xl p-4 bg-slate-900/80 border border-emerald-500/20">
              <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-3">Optimized Scenario</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Current</span>
                  <span className="font-bold text-white">{simulation.current_emissions.toFixed(2)} kg CO₂</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Optimized</span>
                  <span className="font-bold text-emerald-300">{simulation.optimized_emissions.toFixed(2)} kg CO₂</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-700"
                    style={{ width: `${Math.max(5, 100 - simulation.reduction_pct)}%` }}
                  />
                </div>
                <p className="text-emerald-400 text-xs font-semibold text-right">{simulation.reduction_pct.toFixed(1)}% potential reduction</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Insights */}
      {result.insights?.length > 0 && (
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">AI Insights</p>
          <div className="space-y-2">
            {result.insights.map((ins, i) => (
              <div key={i} className="flex items-start gap-2 rounded-xl p-3 bg-slate-900/60 border border-slate-700/40">
                <span className="mt-0.5 text-emerald-400 text-xs">✦</span>
                <p className="text-slate-300 text-sm">{ins}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
