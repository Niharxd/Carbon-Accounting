import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PredictionForm from '../components/PredictionForm';
import PredictionResults from '../components/PredictionResults';
import MetricCard from '../components/MetricCard';
import { ScoreIcon, TotalIcon, AverageIcon, PeakIcon } from '../components/BrandIcons';

export default function Dashboard() {
  const [kpi, setKpi] = useState(() => {
    try {
      const stored = localStorage.getItem('ghg_kpi');
      return stored ? JSON.parse(stored) : {
        sustainabilityScore: null,
        totalPredictions: 0,
        avgEmissions: null,
        reductionPotential: null,
      };
    } catch {
      return { sustainabilityScore: null, totalPredictions: 0, avgEmissions: null, reductionPotential: null };
    }
  });

  useEffect(() => {
    function handle(e) {
      const { result, simulation } = e?.detail || {};
      if (!result) return;
      setKpi((prev) => {
        const newTotal = prev.totalPredictions + 1;
        const prevAvg = prev.avgEmissions ?? 0;
        const newAvg = (prevAvg * (newTotal - 1) + result.predicted_emissions) / newTotal;
        const next = {
          sustainabilityScore: result.sustainability_score,
          totalPredictions: newTotal,
          avgEmissions: parseFloat(newAvg.toFixed(2)),
          reductionPotential: simulation ? simulation.reduction_pct : prev.reductionPotential,
        };
        try { localStorage.setItem('ghg_kpi', JSON.stringify(next)); } catch {}
        return next;
      });
    }
    window.addEventListener('predictionMade', handle);
    return () => window.removeEventListener('predictionMade', handle);
  }, []);

  return (
    <div className="space-y-12">
      <section className="animate-fadeInUp space-y-4">
        <div className="stagger">
          <div className="flex items-center gap-4 mb-6 animate-fadeInUp">
            <div className="w-2 h-12 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full shadow-lg shadow-emerald-500/50" />
            <div>
              <span className="text-sm font-bold text-emerald-400 tracking-widest uppercase">Welcome Back</span>
              <p className="text-slate-400 text-sm mt-1">AI-Powered Carbon Emission Tracking</p>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent leading-tight animate-fadeInUp">
            Track Your Carbon Footprint
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mt-6 leading-relaxed animate-fadeInUp">
            Advanced AI-powered predictions for computing infrastructure emissions. Analyze, optimize, and reduce your environmental impact with precision.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fadeInUp">
            <a
              href="#predictions"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
            >
              Run a Prediction
            </a>
            <Link
              to="/analytics"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/90 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-emerald-400 hover:text-emerald-300"
            >
              Open Analytics
            </Link>
          </div>
        </div>

        {/* KPI Row — live after first prediction */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 stagger">
          <MetricCard
            title="Sustainability Score"
            value={kpi.sustainabilityScore !== null ? kpi.sustainabilityScore : '—'}
            unit={kpi.sustainabilityScore !== null ? '/ 100' : null}
            icon={<ScoreIcon />}
            color="green"
            description="AI-driven sustainability rating"
          />
          <MetricCard
            title="Total Predictions"
            value={kpi.totalPredictions || '—'}
            icon={<TotalIcon />}
            color="blue"
            description="Predictions this session"
          />
          <MetricCard
            title="Avg Emissions"
            value={kpi.avgEmissions !== null ? kpi.avgEmissions : '—'}
            unit={kpi.avgEmissions !== null ? 'kg CO₂' : null}
            icon={<AverageIcon />}
            color="purple"
            description="Average per prediction"
          />
          <MetricCard
            title="Reduction Potential"
            value={kpi.reductionPotential !== null ? `${kpi.reductionPotential}%` : '—'}
            icon={<PeakIcon />}
            color="orange"
            description="Estimated savings vs optimized"
          />
        </div>
      </section>

      <section className="animate-fadeInUp delay-300" id="predictions">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-6">
          <PredictionForm />
          <PredictionResults />
        </div>
      </section>

      <footer className="animate-fadeInUp delay-400 border-t border-slate-800 pt-6 flex items-center justify-between text-sm text-slate-500">
        <p>
          Built by{' '}
          <a href="https://github.com/Niharxd" className="text-emerald-400 hover:text-emerald-300 transition">
            Nihar Ranjan Patra
          </a>{' '}
          ·{' '}
          <a href="https://www.linkedin.com/in/nihar-patra-2277np/" className="text-emerald-400 hover:text-emerald-300 transition">
            LinkedIn
          </a>
        </p>
        <p>© {new Date().getFullYear()} GHG Platform</p>
      </footer>
    </div>
  );
}
