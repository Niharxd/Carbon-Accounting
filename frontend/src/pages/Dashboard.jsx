import PredictionForm from '../components/PredictionForm';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

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

      <section className="animate-fadeInUp" id="analytics">
        <AnalyticsDashboard />
      </section>
    </div>
  );
}
