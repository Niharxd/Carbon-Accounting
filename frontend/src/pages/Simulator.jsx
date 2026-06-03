import { Link } from 'react-router-dom';

export default function Simulator() {
  return (
    <div className="space-y-10 animate-fadeInUp">
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-12 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full shadow-lg shadow-emerald-500/30"></div>
          <div>
            <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">Optimization Lab</span>
            <p className="text-slate-400 text-xs mt-1">Simulate emission reductions and operational upgrades</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Carbon Reduction Simulator
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mt-4">
              Test infrastructure changes and see how your estimated emissions and savings evolve before deploying them.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-6">
            <p className="text-slate-400 uppercase tracking-[0.3em] text-[11px] font-semibold mb-3">Simulate scenarios</p>
            <p className="text-slate-200 leading-relaxed">
              Compare energy-saving actions like server consolidation, cloud workload scheduling, and regional carbon-intensity shifts.
              Use this page to test how changes impact your annual emissions forecast.
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-500/30 bg-slate-950/80 p-6">
            <div className="space-y-3">
              <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-700/50">
                <p className="text-slate-400 uppercase text-[11px] tracking-[0.3em] mb-2">Current Emissions</p>
                <p className="text-3xl font-black text-emerald-300">452.6 kg CO₂</p>
              </div>
              <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-700/50">
                <p className="text-slate-400 uppercase text-[11px] tracking-[0.3em] mb-2">Optimized Emissions</p>
                <p className="text-3xl font-black text-cyan-300">372.1 kg CO₂</p>
              </div>
              <div className="rounded-2xl bg-slate-900/90 p-4 border border-slate-700/50">
                <p className="text-slate-400 uppercase text-[11px] tracking-[0.3em] mb-2">Projected Savings</p>
                <p className="text-3xl font-black text-emerald-300">17.8%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
