import { useEffect, useRef, useState } from 'react';

function getStatus(score) {
  if (score >= 80) return { label: 'Excellent', color: 'text-emerald-300', hex: '#34d399' };
  if (score >= 60) return { label: 'Good', color: 'text-amber-300', hex: '#f59e0b' };
  if (score >= 40) return { label: 'Moderate', color: 'text-orange-300', hex: '#fb923c' };
  return { label: 'Poor', color: 'text-red-300', hex: '#f87171' };
}

export default function SustainabilityScore({ value = null, size = 160 }) {
  const hasValue = value !== null && value !== undefined;
  const pct = hasValue ? Math.max(0, Math.min(100, Math.round(value))) : 0;
  const status = getStatus(pct);
  const innerSize = size - 36;

  // Animate from 0 → pct on mount / value change
  const [displayPct, setDisplayPct] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!hasValue) { setDisplayPct(0); return; }
    const start = performance.now();
    const duration = 900;
    const from = 0;

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayPct(Math.round(from + (pct - from) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [pct, hasValue]);

  const ringColor = hasValue ? status.hex : 'rgba(100,116,139,0.15)';
  const ringDeg = hasValue ? displayPct * 3.6 : 360;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative flex items-center justify-center rounded-full"
        style={{ width: size, height: size }}
      >
        {/* Track */}
        <div className="absolute inset-0 rounded-full bg-slate-800/50" />
        {/* Progress ring */}
        <div
          className="absolute inset-1 rounded-full transition-all duration-100"
          style={{
            background: hasValue
              ? `conic-gradient(${ringColor} ${ringDeg}deg, rgba(255,255,255,0.04) 0deg)`
              : 'conic-gradient(rgba(100,116,139,0.15) 360deg, transparent 0deg)',
          }}
        />
        {/* Inner face */}
        <div
          className="relative z-10 flex flex-col items-center justify-center rounded-full bg-slate-950"
          style={{ width: innerSize, height: innerSize }}
        >
          {hasValue ? (
            <>
              <p className="text-3xl font-black text-white leading-none animate-countUp">{displayPct}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Score</p>
            </>
          ) : (
            <>
              <p className="text-3xl font-black text-slate-600 leading-none">—</p>
              <p className="text-[10px] text-slate-600 uppercase tracking-wider mt-1">Score</p>
            </>
          )}
        </div>
      </div>
      <div className="text-center">
        <p className={`font-bold ${hasValue ? status.color : 'text-slate-600'}`}>
          {hasValue ? status.label : 'No data yet'}
        </p>
        <p className="text-xs text-slate-600 mt-0.5">Sustainability rating</p>
      </div>
    </div>
  );
}
