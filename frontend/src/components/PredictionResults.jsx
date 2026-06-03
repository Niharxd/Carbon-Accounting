import React, { useEffect, useState } from 'react';
import SustainabilityScore from './SustainabilityScore';
import { ScoreIcon } from './BrandIcons';

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
      <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 flex items-center justify-center h-full">
        <div className="text-center text-slate-400">
          <p className="font-semibold">No prediction yet</p>
          <p className="text-sm mt-2">Run a prediction to see detailed AI insights and optimization recommendations.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-700/60 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/40 overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Prediction Results</p>
          <h3 className="text-2xl font-black text-white">Prediction & Optimization</h3>
          <p className="text-slate-400 text-sm">AI-powered analysis, anomaly detection, and prioritized recommendations.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-2 text-xs text-slate-300">Model: <strong className="ml-2 text-white">{result.model_used || 'unknown'}</strong></span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="rounded-2xl p-4 bg-slate-900/80 border border-slate-700/50">
            <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-2">Predicted Emissions</p>
            <p className="text-4xl font-black text-emerald-300">{result.predicted_emissions.toFixed(2)} kg CO₂</p>
            <p className="text-slate-400 text-sm mt-2">Estimated footprint for this configuration.</p>
          </div>

          <div className="rounded-2xl p-4 bg-slate-900/80 border border-slate-700/50 grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-2">Efficiency Score</p>
              <p className="text-2xl font-black text-emerald-300">{result.efficiency_score}</p>
              <p className="text-slate-400 text-sm mt-2">Higher means more efficient.</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-2">Anomaly Status</p>
              <p className={`text-2xl font-black ${result.anomaly_detected ? 'text-red-300' : 'text-emerald-300'}`}>{result.anomaly_detected ? 'Alert' : 'Normal'}</p>
              <p className="text-slate-400 text-sm mt-2">{result.anomaly_detected ? 'Potential spike detected' : 'Within expected range'}</p>
            </div>
          </div>

          <div className="rounded-2xl p-4 bg-slate-900/80 border border-slate-700/50">
            <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-2">Top Recommendation</p>
            <p className="text-white font-semibold">{result.recommendations?.[0]?.title || 'Optimize storage performance'}</p>
            <p className="text-slate-400 text-sm mt-2">{result.recommendations?.[0]?.description || 'Reduce idle storage and use region with lower carbon intensity.'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <div className="w-full flex items-center justify-center">
            <SustainabilityScore value={result.sustainability_score} />
          </div>

          <div className="w-full rounded-2xl p-4 bg-slate-900/80 border border-slate-700/50">
            <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-2">Carbon Intensity</p>
            <p className="text-2xl font-black text-blue-300">{result.carbon_intensity}</p>
            <p className="text-slate-400 text-sm mt-2">gCO₂/kWh — region metric used for this prediction.</p>
          </div>

          <div className="w-full rounded-2xl p-4 bg-slate-900/80 border border-slate-700/50">
            <p className="text-slate-400 uppercase tracking-widest text-[11px] font-semibold mb-2">Simulation Preview</p>
            {simulation ? (
              <div>
                <p className="text-white font-bold">Optimized: {simulation.optimized_emissions.toFixed(2)} kg CO₂</p>
                <p className="text-slate-400 text-sm">Potential reduction: {simulation.reduction_pct.toFixed(1)}%</p>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">Run a prediction to generate optimization preview.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-3">AI Insights</div>
        <div className="space-y-2">
          {(result.insights && result.insights.length > 0) ? result.insights.map((ins, i) => (
            <div key={i} className="rounded-xl p-3 bg-slate-900/80 border border-slate-700/40 text-slate-300">{ins}</div>
          )) : (
            <div className="rounded-xl p-3 bg-slate-900/80 border border-slate-700/40 text-slate-400">Insights will appear here after a prediction.</div>
          )}
        </div>
      </div>
    </div>
  );
}
