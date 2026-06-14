import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken } from '../services/auth';
import {
  BrandLogo,
  DashboardIcon,
  AnalyticsIcon,
  SimulatorIcon,
  HistoryIcon,
  ReportsIcon,
  SettingsIcon,
  LoginIcon,
} from './BrandIcons';

const navItems = [
  { name: 'Dashboard', to: '/',          icon: <DashboardIcon className="w-4 h-4" />,  color: 'from-emerald-400 to-teal-600',  bgColor: 'bg-emerald-500/20' },
  { name: 'Analytics', to: '/analytics', icon: <AnalyticsIcon className="w-4 h-4" />,  color: 'from-blue-400 to-blue-600',     bgColor: 'bg-blue-500/20' },
  { name: 'Simulator', to: '/simulator', icon: <SimulatorIcon className="w-4 h-4" />,  color: 'from-teal-400 to-cyan-600',     bgColor: 'bg-teal-500/20' },
  { name: 'History',   to: '/history',   icon: <HistoryIcon   className="w-4 h-4" />,  color: 'from-slate-400 to-slate-600',   bgColor: 'bg-slate-700/30' },
  { name: 'Reports',   to: '/reports',   icon: <ReportsIcon   className="w-4 h-4" />,  color: 'from-blue-500 to-cyan-600',     bgColor: 'bg-blue-500/15' },
  { name: 'Settings',  to: '/settings',  icon: <SettingsIcon  className="w-4 h-4" />,  color: 'from-teal-400 to-emerald-600',  bgColor: 'bg-teal-500/20' },
  { name: 'Login',     to: '/login',     icon: <LoginIcon     className="w-4 h-4" />,  color: 'from-emerald-400 to-emerald-600', bgColor: 'bg-emerald-500/20' },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  const visibleNavItems = navItems.filter((item) => {
    if (isAuthenticated) {
      return item.name !== 'Login' && item.name !== 'Signup';
    }
    return true;
  });

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 glass border-r border-emerald-500/30 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-gradient-to-b from-slate-900/80 via-slate-800/60 to-slate-900/80`}
        role="navigation"
        aria-label="Primary site navigation"
        aria-hidden={false}
      >
        <div className="px-6 py-5 flex items-center justify-between border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900/80 shadow-lg shadow-emerald-500/15">
              <BrandLogo className="w-9 h-9" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Quick Nav</p>
              <p className="text-slate-500 text-xs">Navigate the app quickly</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation panel"
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/70 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {visibleNavItems.map((item, idx) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={onClose}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 overflow-hidden ${
                  isActive
                    ? 'text-white bg-slate-800/70 border border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'text-slate-300 hover:text-white'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${item.color} ${isActive ? 'opacity-15' : 'opacity-0 group-hover:opacity-15'} transition-opacity duration-300 rounded-xl`} />
                <div className="absolute inset-0 border border-transparent rounded-xl transition-colors duration-300" />
                <div className={`relative flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${item.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                  {item.icon}
                </div>
                <span className="relative text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">
                  {item.name}
                </span>
                <div className={`absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color} ${isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'} transition-transform duration-300 origin-top`} />
              </NavLink>
            );
          })}
        </nav>

        <div className="px-3 py-4 space-y-3 border-t border-emerald-500/20">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/10 rounded-lg p-3 border border-emerald-500/30 hover:border-emerald-400/50 transition-colors">
              <p className="text-emerald-400 text-xs font-bold">ACTIVE</p>
              <p className="text-white text-sm font-bold mt-1">ML Model</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/10 rounded-lg p-3 border border-blue-500/30 hover:border-blue-400/50 transition-colors">
              <p className="text-blue-400 text-xs font-bold">READY</p>
              <p className="text-white text-sm font-bold mt-1">API</p>
            </div>
          </div>
        </div>

        <div className="px-3 py-4 border-t border-emerald-500/20">
          <div className="bg-gradient-to-r from-emerald-600/40 to-teal-600/30 rounded-xl p-4 border border-emerald-500/40 space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-emerald-300 text-xs font-bold tracking-wider">SYSTEM STATUS</p>
            </div>
            <p className="text-slate-200 text-xs leading-relaxed">All systems operational. Your data is safe and encrypted.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
