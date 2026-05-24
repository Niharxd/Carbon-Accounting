import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsernameFromToken, logout } from '../services/auth';

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setUsername(getUsernameFromToken());

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUsername(null);
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 flex items-center px-4 gap-4 ${isScrolled ? 'glass shadow-2xl shadow-emerald-500/10 border-b border-emerald-500/30' : 'border-b border-emerald-500/20'}`}>
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/20 transition-all hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Link to="/" className="flex items-center gap-2.5 mr-auto group">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/40">
          🌿
        </div>
        <span className="font-black text-white text-lg hidden sm:block bg-gradient-to-r from-emerald-400 via-green-300 to-teal-300 bg-clip-text text-transparent hover:from-emerald-300 hover:to-teal-200 transition-all">
          GHG Platform
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <span className="flex w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs text-emerald-300 font-semibold">ML Model Active</span>
        </div>
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
              onClick={handleLogout}
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
