import { Link } from 'react-router-dom';

export default function Reports() {
  return (
    <div className="space-y-10 animate-fadeInUp">
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-12 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30"></div>
          <div>
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">Documentation Center</span>
            <p className="text-slate-400 text-xs mt-1">Generate reports and export sustainability summaries</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
              Reports
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mt-4">
              Create downloadable summaries and executive-ready sustainability reports from your prediction data.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-blue-400 hover:text-blue-300"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-700/50 bg-slate-950/90 p-6">
            <p className="text-slate-400 uppercase tracking-[0.3em] text-[11px] font-semibold mb-3">Export options</p>
            <p className="text-slate-200 leading-relaxed">
              Download detailed climate impact reports, executive summaries, and trend insights for stakeholders.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-700/50 bg-slate-950/90 p-6 space-y-4">
            <button className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-90">
              Download Sustainability Report
            </button>
            <button className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-400">
              Generate Executive Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
