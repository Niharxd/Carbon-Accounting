const colors = {
  blue:   { bg: 'from-blue-500/15 to-blue-600/10', border: 'border-blue-500/40', icon: 'bg-gradient-to-br from-blue-500/40 to-blue-600/30 text-blue-200 shadow-lg shadow-blue-500/20', value: 'text-blue-400', glow: 'shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/30' },
  green:  { bg: 'from-emerald-500/15 to-teal-600/10', border: 'border-emerald-500/40', icon: 'bg-gradient-to-br from-emerald-500/40 to-teal-600/30 text-emerald-200 shadow-lg shadow-emerald-500/20', value: 'text-emerald-400', glow: 'shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/30' },
  orange: { bg: 'from-orange-500/15 to-amber-600/10', border: 'border-orange-500/40', icon: 'bg-gradient-to-br from-orange-500/40 to-amber-600/30 text-orange-200 shadow-lg shadow-orange-500/20', value: 'text-orange-400', glow: 'shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/30' },
  purple: { bg: 'from-purple-500/15 to-pink-600/10', border: 'border-purple-500/40', icon: 'bg-gradient-to-br from-purple-500/40 to-pink-600/30 text-purple-200 shadow-lg shadow-purple-500/20', value: 'text-purple-400', glow: 'shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/30' },
};

export default function MetricCard({ title, value, unit, icon, color = 'blue' }) {
  const c = colors[color];
  return (
    <div className={`group relative bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl p-6 backdrop-blur-sm flex flex-col gap-3 hover:border-opacity-80 transition-all duration-300 hover:scale-105 cursor-default ${c.glow} overflow-hidden`}>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      {/* Icon */}
      <div className={`relative w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 ${c.icon} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>

      {/* Content */}
      <div className="relative min-w-0 flex-1">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest truncate">{title}</p>
        <div className="flex items-baseline gap-2 mt-3">
          <span className={`text-4xl font-black ${c.value}`}>{value}</span>
          {unit && <span className="text-slate-500 text-sm font-semibold">{unit}</span>}
        </div>
      </div>

      {/* Right accent */}
      <div className={`absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
    </div>
  );
}
