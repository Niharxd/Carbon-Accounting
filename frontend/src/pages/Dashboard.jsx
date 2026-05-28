import { Link } from 'react-router-dom';
import PredictionForm from '../components/PredictionForm';
import { GithubIcon, LinkedinIcon, MailIcon, LeetCodeIcon } from '../components/BrandIcons';

export default function Dashboard() {
  return (
    <div className="space-y-16">
      <section className="animate-fadeInUp space-y-6">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-12 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/50"></div>
            <div>
              <span className="text-sm font-bold text-emerald-400 tracking-widest uppercase">Welcome Back</span>
              <p className="text-slate-400 text-sm mt-1">AI-Powered Carbon Emission Tracking</p>
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent leading-tight">
            Track Your<br />Carbon Footprint
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mt-6 leading-relaxed">
            Advanced AI-powered predictions for computing infrastructure emissions. Analyze, optimize, and reduce your environmental impact with precision.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a href="#predictions" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5">
              Run a Prediction
            </a>
            <Link to="/analytics" className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300">
              Open Analytics Page
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
          <div className="bg-slate-900/90 border border-emerald-500/20 rounded-xl p-4 text-center shadow-lg shadow-emerald-500/15">
            <p className="text-slate-400 text-xs font-semibold uppercase">Status</p>
            <p className="text-emerald-400 text-lg font-bold mt-2">Active</p>
          </div>
          <div className="bg-slate-900/90 border border-blue-500/20 rounded-xl p-4 text-center shadow-lg shadow-blue-500/15">
            <p className="text-slate-400 text-xs font-semibold uppercase">Model</p>
            <p className="text-blue-400 text-lg font-bold mt-2">✓ Ready</p>
          </div>
          <div className="bg-slate-900/90 border border-purple-500/20 rounded-xl p-4 text-center shadow-lg shadow-purple-500/15">
            <p className="text-slate-400 text-xs font-semibold uppercase">Version</p>
            <p className="text-purple-400 text-lg font-bold mt-2">v2.0</p>
          </div>
        </div>
      </section>

      <section className="animate-fadeInUp" id="predictions">
        <PredictionForm />
      </section>

      <section className="animate-fadeInUp">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Analytics summary</p>
              <h2 className="text-3xl font-black text-white">View full analytics separately</h2>
              <p className="max-w-2xl text-slate-400">
                Keep this page focused on prediction input, then use the dedicated analytics page for charts, model health, and history.
              </p>
            </div>
            <Link
              to="/analytics"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
            >
              Open Analytics Page
            </Link>
          </div>
        </div>
      </section>

      <section className="animate-fadeInUp">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Built by</p>
              <h2 className="mt-3 text-3xl font-black text-white">Nihar Ranjan Patra</h2>
              <p className="mt-3 text-slate-400 max-w-2xl leading-relaxed">
                Building clean, data-driven carbon accounting tools with AI analytics and thoughtful design. Connect for collaboration, consulting, or open-source work.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <a
                href="https://github.com/Niharxd"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/90 text-slate-100 transition hover:border-blue-400 hover:text-blue-300"
                aria-label="GitHub"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/nihar-patra-2277np/"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/90 text-slate-100 transition hover:border-cyan-400 hover:text-cyan-300"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-6 h-6" />
              </a>
              <a
                href="mailto:niharpatra2277@gmail.com"
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/90 text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
                aria-label="Email"
              >
                <MailIcon className="w-6 h-6" />
              </a>
              <a
                href="https://leetcode.com/u/Nihar_Patra/"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/90 text-slate-100 transition hover:border-violet-400 hover:text-violet-300"
                aria-label="LeetCode"
              >
                <LeetCodeIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
