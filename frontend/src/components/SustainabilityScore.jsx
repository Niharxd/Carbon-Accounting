function getStatus(score) {
  if (score >= 80) return { label: 'Excellent', color: 'text-emerald-300', hex: '#34d399' };
  if (score >= 60) return { label: 'Good', color: 'text-amber-300', hex: '#f59e0b' };
  if (score >= 40) return { label: 'Moderate', color: 'text-orange-300', hex: '#fb923c' };
  return { label: 'Poor', color: 'text-red-300', hex: '#f87171' };
}

export default function SustainabilityScore({ value = 0, size = 160 }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const status = getStatus(pct);
  const innerSize = size - 36;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{ width: size, height: size }}
      >
        {/* Track */}
        <div className="absolute inset-0 rounded-full bg-slate-800/60" />
        {/* Progress ring */}
        <div
          className="absolute inset-1 rounded-full"
          style={{
            background: `conic-gradient(${status.hex} ${pct * 3.6}deg, rgba(255,255,255,0.04) 0deg)`,
          }}
        />
        {/* Inner face */}
        <div
          className="relative z-10 flex flex-col items-center justify-center rounded-full bg-slate-950"
          style={{ width: innerSize, height: innerSize }}
        >
          <p className="text-3xl font-black text-white leading-none">{pct}</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Score</p>
        </div>
      </div>
      <div className="text-center">
        <p className={`font-bold ${status.color}`}>{status.label}</p>
        <p className="text-xs text-slate-500 mt-0.5">Sustainability rating</p>
      </div>
    </div>
  );
}
