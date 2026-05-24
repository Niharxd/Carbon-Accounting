import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', to: '/', icon: '📊', color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-500/20' },
  { name: 'Analytics', to: '/analytics', icon: '📈', color: 'from-purple-400 to-purple-600', bgColor: 'bg-purple-500/20' },
  { name: 'Login', to: '/login', icon: '🔐', color: 'from-emerald-400 to-emerald-600', bgColor: 'bg-emerald-500/20' },
  { name: 'Signup', to: '/signup', icon: '✨', color: 'from-pink-400 to-pink-600', bgColor: 'bg-pink-500/20' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 glass border-r border-emerald-500/30 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 bg-gradient-to-b from-slate-900/80 via-slate-800/60 to-slate-900/80`}>
        <div className="px-6 py-6 border-b border-emerald-500/20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold">
              🌱
            </div>
            <div>
              <p className="text-white font-bold text-sm">Quick Nav</p>
              <p className="text-slate-500 text-xs">Navigate your data</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item, idx) => (
            <Link
              key={item.name}
              to={item.to}
              onClick={onClose}
              className="group relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-300 hover:text-white transition-all duration-200 overflow-hidden"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-15 transition-opacity duration-300 rounded-xl`} />
              <div className="absolute inset-0 border border-transparent group-hover:border-emerald-500/40 rounded-xl transition-colors duration-300" />
              <div className={`relative flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-lg ${item.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>
              <span className="relative text-sm font-semibold group-hover:translate-x-1 transition-transform duration-200">
                {item.name}
              </span>
              <div className={`absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.color} scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top`} />
            </Link>
          ))}
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
