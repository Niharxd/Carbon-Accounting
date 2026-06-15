import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsernameFromToken, logout } from '../services/auth';
import { fetchModelMetrics } from '../services/api';
import { BrandLogo } from './BrandIcons';

export default function Navbar({ onMenuClick, isMenuOpen = false }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [modelName, setModelName] = useState(null);

  useEffect(() => {
    setUsername(getUsernameFromToken());
    fetchModelMetrics()
      .then((m) => setModelName(m?.model_name || null))
      .catch(() => {});

    // update username when authentication changes (login/logout)
    const onAuthChanged = () => setUsername(getUsernameFromToken());
    window.addEventListener('authChanged', onAuthChanged);

    // also listen to storage events (other tabs)
    const onStorage = (e) => {
      if (e.key === 'token') {
        setUsername(getUsernameFromToken());
      }
    };
    window.addEventListener('storage', onStorage);

    let frame = null;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 10);
        frame = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('authChanged', onAuthChanged);
      window.removeEventListener('storage', onStorage);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUsername(null);
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 flex items-center px-4 gap-4 ${isScrolled ? 'glass shadow-2xl shadow-emerald-500/10 border-b border-emerald-500/30' : 'border-b border-emerald-500/20'}`}>
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
        aria-expanded={isMenuOpen}
        className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/20 transition-all hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Link to="/dashboard" className="flex items-center gap-3 mr-auto group">
        <div className="flex items-center justify-center rounded-2xl bg-slate-900/70 p-2 shadow-lg shadow-emerald-500/20 transition-transform group-hover:-translate-y-0.5">
          <BrandLogo className="w-11 h-11" />
        </div>
        <div>
          <p className="font-black text-white text-lg leading-tight">GHG Platform</p>
          <p className="text-slate-400 text-xs">Carbon analytics dashboard</p>
        </div>
      </Link>

      <div className="hidden md:flex items-center gap-4">
        {modelName && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="flex w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-300 font-semibold">{modelName} Active</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {username ? (
          <>
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg glass border border-slate-700/50">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-emerald-500/40">
                {username.charAt(0).toUpperCase()}
              </div>
              <span className="text-slate-300 text-xs hidden sm:block font-semibold">{username}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out of your account"
              className="px-3 py-1.5 text-xs text-slate-300 hover:text-emerald-300 border border-slate-700/50 hover:border-emerald-500/50 hover:bg-emerald-500/10 rounded-lg transition-all font-semibold"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1.5 text-xs text-slate-300 hover:text-emerald-300 transition-colors font-semibold">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-1.5 text-xs gradient-primary hover:shadow-lg hover:shadow-emerald-500/50 text-white rounded-lg transition-all font-bold">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

