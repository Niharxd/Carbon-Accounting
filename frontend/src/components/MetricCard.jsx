import { memo, useEffect, useRef, useState } from 'react';

const colors = {
  blue: {
    bg: 'from-blue-500/10 to-blue-600/5',
    border: 'border-blue-500/30',
    icon: 'bg-gradient-to-br from-blue-500/30 to-blue-600/20 text-blue-200',
    value: 'text-blue-300',
    glow: 'hover:shadow-blue-500/20',
  },
  green: {
    bg: 'from-emerald-500/10 to-teal-600/5',
    border: 'border-emerald-500/30',
    icon: 'bg-gradient-to-br from-emerald-500/30 to-teal-600/20 text-emerald-200',
    value: 'text-emerald-300',
    glow: 'hover:shadow-emerald-500/20',
  },
  orange: {
    bg: 'from-orange-500/10 to-amber-600/5',
    border: 'border-orange-500/30',
    icon: 'bg-gradient-to-br from-orange-500/30 to-amber-600/20 text-orange-200',
    value: 'text-orange-300',
    glow: 'hover:shadow-orange-500/20',
  },
  purple: {
    bg: 'from-purple-500/10 to-pink-600/5',
    border: 'border-purple-500/30',
    icon: 'bg-gradient-to-br from-purple-500/30 to-pink-600/20 text-purple-200',
    value: 'text-purple-300',
    glow: 'hover:shadow-purple-500/20',
  },
};

function useCountUp(target, duration = 700) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef(null);
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    const to = target;
    if (from === to) return;

    const start = performance.now();
    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      setDisplay(Number.isInteger(to) ? Math.round(current) : parseFloat(current.toFixed(2)));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else prevRef.current = to;
    }
    rafRef.current = requestAnimationFrame(step);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

function MetricCard({ title, value, unit, icon, color = 'blue', description }) {
  const c = colors[color] || colors.blue;
  const sparkHeights = [6, 12, 10, 16, 9];

  // Only animate if value is a plain number
  const isNumeric = typeof value === 'number' && !isNaN(value);
  const isEmpty = value === '—' || value === null || value === undefined;
  const animated = useCountUp(isNumeric ? value : 0);
  const displayValue = isNumeric ? animated : value;

  return (
    <div
      className={`group relative bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl p-5 backdrop-blur-sm flex flex-col gap-3 transition-all duration-300 shadow-lg ${c.glow} overflow-hidden ${!isEmpty ? 'hover:scale-[1.02] cursor-default' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

      <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${c.icon}`}>
        {icon}
      </div>

      <div className="relative min-w-0 flex-1">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest truncate">{title}</p>
        <div className="flex items-baseline gap-1.5 mt-2">
          <span
            key={String(value)}
            className={`text-3xl font-black ${isEmpty ? 'text-slate-600' : c.value} ${isNumeric ? 'animate-countUp' : ''}`}
          >
            {displayValue}
          </span>
          {unit && !isEmpty && <span className="text-slate-500 text-xs font-semibold">{unit}</span>}
        </div>
        {description && <p className="text-slate-500 text-xs mt-2 leading-4">{description}</p>}
      </div>

      <div className="flex items-end gap-1 h-6">
        {sparkHeights.map((height, idx) => (
          <span
            key={idx}
            className={`block rounded-full transition-all duration-500 ${isEmpty ? 'bg-slate-800' : 'bg-white/10 group-hover:bg-white/20'}`}
            style={{ width: 4, height: `${height}px` }}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(MetricCard);
