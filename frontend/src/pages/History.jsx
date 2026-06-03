import { Link } from 'react-router-dom';

export default function History() {
  return (
    <div className="space-y-10 animate-fadeInUp">
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-12 bg-gradient-to-b from-slate-500 to-slate-700 rounded-full shadow-lg shadow-slate-500/30"></div>
          <div>
            <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Prediction Archive</span>
            <p className="text-slate-400 text-xs mt-1">Review past predictions and sustainability progress</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 bg-clip-text text-transparent">
              Prediction History
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mt-4">
              Access your historical carbon forecasts, compare trends, and identify patterns in your infrastructure emissions.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-400 hover:text-slate-200"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-700/50 bg-slate-950/90 p-6">
            <p className="text-slate-400 uppercase tracking-[0.3em] text-[11px] font-semibold mb-3">Recent runs</p>
            <div className="space-y-4">
              {['Jan 24 • AI Prediction • 487 kg CO₂', 'Jan 17 • AI Prediction • 503 kg CO₂', 'Jan 09 • AI Prediction • 468 kg CO₂'].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-900/90 p-4 border border-slate-700/40 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-emerald-500/30 bg-slate-950/80 p-6">
            <p className="text-slate-400 uppercase tracking-[0.3em] text-[11px] font-semibold mb-3">Trend summary</p>
            <p className="text-slate-200 leading-relaxed">
              This page will show charts, filters, and recorded prediction details once your dataset is available.
              It’s designed to help you understand long-term carbon performance across operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
