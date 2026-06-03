import React from 'react';

function getStatus(score) {
  if (score >= 80) return { label: 'Excellent', color: 'text-emerald-300', ring: 'from-emerald-400 to-emerald-600' };
  if (score >= 60) return { label: 'Good', color: 'text-amber-300', ring: 'from-amber-400 to-amber-600' };
  if (score >= 40) return { label: 'Moderate', color: 'text-orange-300', ring: 'from-orange-400 to-orange-600' };
  return { label: 'Poor', color: 'text-red-300', ring: 'from-red-400 to-red-600' };
}

export default function SustainabilityScore({ value = 0, size = 120 }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const status = getStatus(pct);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <div className="absolute inset-0 rounded-full bg-slate-900/70" />
        <div
          className="absolute inset-1 rounded-full"
          style={{
            background: `conic-gradient(${status.color === 'text-emerald-300' ? '#34d399' : status.color === 'text-amber-300' ? '#f59e0b' : status.color === 'text-orange-300' ? '#fb923c' : '#f87171'} ${pct * 3.6}deg, rgba(255,255,255,0.04) 0deg)`,
          }}
        />
        <div className="relative inset-0 flex items-center justify-center" style={{ width: size, height: size }}>
          <div className="flex flex-col items-center justify-center rounded-full bg-slate-950/95" style={{ width: size - 36, height: size - 36 }}>
            <p className="text-3xl font-black text-white">{pct}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Score</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className={`font-bold ${status.color}`}>{status.label}</p>
        <p className="text-xs text-slate-400">Based on emissions, efficiency, and anomaly risk</p>
      </div>
    </div>
  );
}
