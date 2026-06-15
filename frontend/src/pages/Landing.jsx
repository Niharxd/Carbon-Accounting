import { Link } from 'react-router-dom';
import { BrandLogo } from '../components/BrandIcons';

/* ── Data ───────────────────────────────────────────────────────────────── */

const features = [
  {
    color: 'emerald',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    title: 'ML-Powered Predictions',
    desc: 'Random Forest model trained on real emissions data with a 99.74% test accuracy. Predicts CO₂ output from CPU, RAM, storage, and region inputs instantly.',
  },
  {
    color: 'red',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: 'Anomaly Detection',
    desc: 'Automatically flags emission spikes above 2 standard deviations from the mean (~43.7 kg CO₂). Get instant visual alerts before they become problems.',
  },
  {
    color: 'blue',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Optimization Simulator',
    desc: 'Test infrastructure changes before committing. See exact current vs optimized emissions, reduction %, and suggested CPU, RAM, storage, and region config.',
  },
  {
    color: 'purple',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: '6 Global Regions',
    desc: 'From India (700 gCO₂/kWh) to France (80 gCO₂/kWh). Carbon intensity varies massively — choose your region to get accurate, location-aware predictions.',
  },
  {
    color: 'teal',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Analytics Dashboard',
    desc: 'Visualise emission trends, compare regions, and track model performance with live Chart.js charts updated after every prediction you run.',
  },
  {
    color: 'orange',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'PDF Report Export',
    desc: 'Generate and download a full sustainability report or executive summary from any prediction. Includes recommendations, simulation data, and model metadata.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Enter your infrastructure',
    desc: 'Input CPU cores, RAM, storage, and select your cloud region. Takes less than 10 seconds.',
    color: 'emerald',
  },
  {
    n: '02',
    title: 'Get an instant prediction',
    desc: 'The ML model returns predicted emissions, efficiency score, sustainability rating, anomaly status, and AI insights immediately.',
    color: 'blue',
  },
  {
    n: '03',
    title: 'Simulate & optimise',
    desc: 'Run the optimizer to see how adjusting your config reduces emissions. Switch regions, scale down resources, and compare results.',
    color: 'purple',
  },
  {
    n: '04',
    title: 'Export & report',
    desc: 'Download a PDF sustainability report for stakeholders, or track your history in the analytics dashboard over time.',
    color: 'teal',
  },
];

const techStack = [
  { label: 'FastAPI', sublabel: 'Backend API', color: 'emerald' },
  { label: 'scikit-learn', sublabel: 'Random Forest ML', color: 'blue' },
  { label: 'React 19', sublabel: 'Frontend', color: 'cyan' },
  { label: 'Tailwind CSS', sublabel: 'Styling', color: 'teal' },
  { label: 'MySQL', sublabel: 'Database', color: 'orange' },
  { label: 'Chart.js', sublabel: 'Analytics charts', color: 'purple' },
  { label: 'JWT Auth', sublabel: 'Secure sessions', color: 'pink' },
  { label: 'fpdf', sublabel: 'PDF generation', color: 'red' },
];

const colorMap = {
  emerald: { border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', icon: 'text-emerald-400', dot: 'bg-emerald-400', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  blue:    { border: 'border-blue-500/30',    bg: 'bg-blue-500/10',    icon: 'text-blue-400',    dot: 'bg-blue-400',    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/30' },
  purple:  { border: 'border-purple-500/30',  bg: 'bg-purple-500/10',  icon: 'text-purple-400',  dot: 'bg-purple-400',  badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
  teal:    { border: 'border-teal-500/30',    bg: 'bg-teal-500/10',    icon: 'text-teal-400',    dot: 'bg-teal-400',    badge: 'bg-teal-500/15 text-teal-300 border-teal-500/30' },
  orange:  { border: 'border-orange-500/30',  bg: 'bg-orange-500/10',  icon: 'text-orange-400',  dot: 'bg-orange-400',  badge: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
  red:     { border: 'border-red-500/30',     bg: 'bg-red-500/10',     icon: 'text-red-400',     dot: 'bg-red-400',     badge: 'bg-red-500/15 text-red-300 border-red-500/30' },
  cyan:    { border: 'border-cyan-500/30',    bg: 'bg-cyan-500/10',    icon: 'text-cyan-400',    dot: 'bg-cyan-400',    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' },
  pink:    { border: 'border-pink-500/30',    bg: 'bg-pink-500/10',    icon: 'text-pink-400',    dot: 'bg-pink-400',    badge: 'bg-pink-500/15 text-pink-300 border-pink-500/30' },
};

/* ── Component ──────────────────────────────────────────────────────────── */

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-x-hidden">
      <div className="orb orb-emerald" aria-hidden="true" />
      <div className="orb orb-blue" aria-hidden="true" />
      <div className="orb orb-purple" aria-hidden="true" />

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 glass border-b border-emerald-500/20">
        <div className="flex items-center gap-3">
          <BrandLogo className="w-8 h-8" />
          <span className="font-black text-white text-lg">GHG Platform</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#how-it-works" className="hover:text-white transition">How it works</a>
          <a href="#tech" className="hover:text-white transition">Tech stack</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate-400 hover:text-white transition font-semibold">Sign In</Link>
          <Link to="/signup" className="text-sm font-bold gradient-primary text-white px-4 py-2 rounded-xl transition hover:shadow-lg hover:shadow-emerald-500/30">
            Sign Up Free
          </Link>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-40 pb-28 max-w-5xl mx-auto">
        <div className="animate-fadeInUp space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI-Powered · Random Forest · 99.74% Accuracy
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05]">
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Measure. Optimise.
            </span>
            <br />
            <span className="text-white">Reduce Emissions.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            An end-to-end carbon accounting platform for computing infrastructure.
            Predict emissions with ML, detect anomalies, simulate optimizations,
            and generate sustainability reports — all from one dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:shadow-emerald-500/40"
            >
              Launch Dashboard
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
            >
              See how it works
            </a>
          </div>

          {/* Stats row */}
          <div className="animate-fadeInUp delay-300 flex flex-wrap items-center justify-center gap-8 pt-6 border-t border-slate-800 mt-6">
            {[
              ['99.74%', 'Model accuracy'],
              ['6', 'Global regions'],
              ['~43.7 kg', 'Anomaly threshold'],
              ['10s', 'Avg prediction time'],
            ].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-emerald-300">{val}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────── */}
      <section id="features" className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-14 space-y-3 animate-fadeInUp">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Everything you need</p>
          <h2 className="text-4xl font-black text-white">Built for real carbon accountability</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From raw infrastructure specs to actionable sustainability insights — every step is covered.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const c = colorMap[f.color];
            return (
              <div
                key={f.title}
                className={`rounded-2xl border ${c.border} bg-slate-900/60 p-6 space-y-4 hover:bg-slate-900/80 transition-colors group`}
              >
                <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center ${c.icon} group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <div>
                  <p className="font-bold text-white">{f.title}</p>
                  <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <section id="how-it-works" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-14 space-y-3 animate-fadeInUp">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Simple by design</p>
          <h2 className="text-4xl font-black text-white">From input to insight in 4 steps</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            No complex setup. Just enter your specs and the platform does the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {steps.map((s) => {
            const c = colorMap[s.color];
            return (
              <div key={s.n} className={`rounded-2xl border ${c.border} bg-slate-900/60 p-6 flex gap-5`}>
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                  <span className={`font-black text-sm ${c.icon}`}>{s.n}</span>
                </div>
                <div>
                  <p className="font-bold text-white">{s.title}</p>
                  <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Tech stack ─────────────────────────────────────────────────── */}
      <section id="tech" className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-3 animate-fadeInUp">
          <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">Under the hood</p>
          <h2 className="text-4xl font-black text-white">Modern, production-grade stack</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Built with battle-tested technologies across the full stack.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((t) => {
            const c = colorMap[t.color];
            return (
              <div key={t.label} className={`flex items-center gap-2.5 rounded-2xl border ${c.border} ${c.bg} px-5 py-3`}>
                <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                <div>
                  <p className={`text-sm font-bold ${c.icon}`}>{t.label}</p>
                  <p className="text-xs text-slate-500">{t.sublabel}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-16 max-w-4xl mx-auto">
        <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-slate-900/80 to-teal-500/10 p-12 text-center space-y-6">
          <h2 className="text-4xl font-black text-white">Ready to track your footprint?</h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Sign up free, run your first prediction in under a minute, and start making data-driven sustainability decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition hover:-translate-y-0.5"
            >
              Create Free Account
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-slate-800 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BrandLogo className="w-8 h-8" />
            <div>
              <p className="font-black text-white text-sm">GHG Platform</p>
              <p className="text-slate-500 text-xs">Carbon Accounting System</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <Link to="/analytics" className="hover:text-white transition">Analytics</Link>
            <Link to="/simulator" className="hover:text-white transition">Simulator</Link>
            <Link to="/login" className="hover:text-white transition">Sign In</Link>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-xs">
            <a href="https://github.com/Niharxd" className="hover:text-emerald-400 transition font-semibold">GitHub</a>
            <span>·</span>
            <a href="https://www.linkedin.com/in/nihar-patra-2277np/" className="hover:text-emerald-400 transition font-semibold">LinkedIn</a>
            <span>·</span>
            <span>© {new Date().getFullYear()} Nihar Ranjan Patra</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
