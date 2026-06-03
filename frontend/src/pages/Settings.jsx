import { Link } from 'react-router-dom';

export default function Settings() {
  return (
    <div className="space-y-10 animate-fadeInUp">
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-12 bg-gradient-to-b from-teal-400 to-emerald-500 rounded-full shadow-lg shadow-emerald-500/30"></div>
          <div>
            <span className="text-xs font-bold text-teal-300 tracking-widest uppercase">Account Controls</span>
            <p className="text-slate-400 text-xs mt-1">Update preferences and security settings</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-teal-300 via-emerald-300 to-green-300 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mt-4">
              Manage your account, notifications, and sustainability reporting preferences from one secure panel.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-teal-400 hover:text-teal-300"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-700/50 bg-slate-950/90 p-6">
            <p className="text-slate-400 uppercase tracking-[0.3em] text-[11px] font-semibold mb-3">Security</p>
            <p className="text-slate-200 leading-relaxed">
              Configure your access settings, change password, and manage how the platform communicates updates to you.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-700/50 bg-slate-950/90 p-6">
            <p className="text-slate-400 uppercase tracking-[0.3em] text-[11px] font-semibold mb-3">Preferences</p>
            <p className="text-slate-200 leading-relaxed">
              Enable dark mode, notifications, and carbon reporting preferences for a more tailored analytics experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
