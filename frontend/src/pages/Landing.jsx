import { Link } from 'react-router-dom';
import { BrandLogo } from '../components/BrandIcons';

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    label: 'ML Predictions',
    desc: 'Random Forest model with 99.7% accuracy',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: 'Anomaly Detection',
    desc: 'Flags emission spikes in real time',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    label: '6 Global Regions',
    desc: 'From India (700) to France (80) gCO₂/kWh',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: 'PDF Reports',
    desc: 'Export sustainability reports instantly',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden flex flex-col">
      {/* Orbs */}
      <div className="orb orb-emerald" aria-hidden="true" />
      <div className="orb orb-blue" aria-hidden="true" />
      <div className="orb orb-purple" aria-hidden="true" />

      {/* Minimal top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <BrandLogo className="w-9 h-9" />
          <span className="font-black text-white text-lg">GHG Platform</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate-400 hover:text-white transition font-semibold">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="text-sm font-bold gradient-primary text-white px-4 py-2 rounded-xl transition hover:shadow-lg hover:shadow-emerald-500/30"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16 max-w-4xl mx-auto w-full">
        <div className="animate-fadeInUp space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered Carbon Accounting
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Track & Reduce
            </span>
            <br />
            <span className="text-white">Your Carbon Footprint</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Predict computing infrastructure emissions with machine learning, detect anomalies,
            simulate optimizations, and generate sustainability reports — all in one platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:shadow-emerald-500/40"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Feature pills */}
        <div className="animate-fadeInUp delay-300 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-16 w-full">
          {features.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 text-left space-y-2 hover:border-emerald-500/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                {f.icon}
              </div>
              <p className="text-sm font-bold text-white">{f.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-slate-600 text-xs border-t border-slate-800">
        Built by{' '}
        <a href="https://github.com/Niharxd" className="text-emerald-500 hover:text-emerald-400 transition">
          Nihar Ranjan Patra
        </a>
        {' '}· © {new Date().getFullYear()} GHG Platform
      </footer>
    </div>
  );
}
