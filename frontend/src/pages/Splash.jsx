import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '../components/BrandIcons';

export default function Splash() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show button after tagline animation completes (~3s)
    const buttonTimer = setTimeout(() => setShowButton(true), 3000);

    // Auto-redirect after 4s
    const redirectTimer = setTimeout(() => {
      navigate('/landing');
    }, 4000);

    return () => {
      clearTimeout(buttonTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 z-0">
        <div className="orb orb-emerald" aria-hidden="true" />
        <div className="orb orb-blue" aria-hidden="true" />
        <div className="orb orb-purple" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-6">
        {/* Animated logo */}
        <div className="animate-logoScale">
          <BrandLogo className="w-24 h-24" />
        </div>

        {/* Typewriter tagline */}
        <div className="space-y-3 text-center">
          <h1 className="text-3xl sm:text-4xl font-black">
            <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              GHG Platform
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 h-8 overflow-hidden">
            <span className="inline-block animate-typewriter">
              Measure. Optimise. Reduce.
            </span>
          </p>
        </div>

        {/* Fade-in button */}
        {showButton && (
          <button
            onClick={() => navigate('/landing')}
            className="animate-fadeIn inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 px-8 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:shadow-emerald-500/40"
          >
            Enter Platform
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        )}

        {/* Subtle loading indicator */}
        <div className="mt-8 text-slate-600 text-xs">
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}
