import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, logout, getToken, getUsernameFromToken } from '../services/auth';
import LoadingSpinner from '../components/LoadingSpinner';

function getEmailFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email || null;
  } catch {
    return null;
  }
}

export default function Settings() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const token = getToken();

  // Password change form
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState(null);
  const [pwSuccess, setPwSuccess] = useState(null);

  // Preferences
  const [prefs, setPrefs] = useState({ notifications: false, compactView: false });
  const [prefsSaved, setPrefsSaved] = useState(false);

  useEffect(() => {
    setUsername(getUsernameFromToken() || '');
    setEmail(getEmailFromToken() || '');
    try {
      const stored = localStorage.getItem('ghg_prefs');
      if (stored) setPrefs(JSON.parse(stored));
    } catch {}
  }, []);

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwForm((p) => ({ ...p, [name]: value }));
    setPwError(null);
    setPwSuccess(null);
  };

  const handlePwSubmit = async (e) => {
    e.preventDefault();
    setPwError(null);
    setPwSuccess(null);

    if (!email) { setPwError('Cannot determine account email. Please log out and back in.'); return; }
    if (pwForm.next.length < 6) { setPwError('New password must be at least 6 characters.'); return; }
    if (pwForm.next !== pwForm.confirm) { setPwError('New passwords do not match.'); return; }

    setPwLoading(true);
    try {
      // Verify current password by attempting login
      await loginUser({ email, password: pwForm.current });
      // The backend has no change-password endpoint, so we inform the user clearly
      setPwSuccess('Current password verified. To update your password, please contact the admin or re-register. (Change-password endpoint not yet implemented on the backend.)');
      setPwForm({ current: '', next: '', confirm: '' });
    } catch (err) {
      setPwError(err.message?.includes('Invalid') ? 'Current password is incorrect.' : err.message || 'Verification failed.');
    } finally {
      setPwLoading(false);
    }
  };

  const handlePrefToggle = (key) => {
    setPrefs((p) => {
      const next = { ...p, [key]: !p[key] };
      try { localStorage.setItem('ghg_prefs', JSON.stringify(next)); } catch {}
      return next;
    });
    setPrefsSaved(true);
    setTimeout(() => setPrefsSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!token) {
    return (
      <div className="animate-fadeInUp rounded-2xl border border-slate-700 bg-slate-900/80 p-10 text-center space-y-4">
        <p className="text-slate-400">Sign in to access your settings.</p>
        <Link to="/login" className="inline-block px-5 py-2 gradient-primary text-white rounded-xl text-sm font-semibold">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fadeInUp">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-12 bg-gradient-to-b from-teal-400 to-emerald-500 rounded-full shadow-lg shadow-emerald-500/30" />
          <div>
            <span className="text-xs font-bold text-teal-300 tracking-widest uppercase">Account Controls</span>
            <p className="text-slate-400 text-xs mt-1">Manage your profile and preferences</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-5xl font-black bg-gradient-to-r from-teal-300 via-emerald-300 to-green-300 bg-clip-text text-transparent">
            Settings
          </h1>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-teal-400 hover:text-teal-300"
          >
            ← Dashboard
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile card */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 space-y-5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Profile</p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-emerald-500/30">
              {username ? username.charAt(0).toUpperCase() : '?'}
            </div>
            <div>
              <p className="text-white font-bold text-lg">{username || '—'}</p>
              <p className="text-slate-400 text-sm">{email || '—'}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm border-t border-slate-800 pt-4">
            {[
              ['Username', username || '—'],
              ['Email', email || '—'],
              ['Auth', 'JWT / pbkdf2_sha256'],
              ['Token', 'Active (24 hr)'],
            ].map(([label, val]) => (
              <div key={label} className="flex justify-between">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-300 font-medium">{val}</span>
              </div>
            ))}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/20 hover:border-red-400/50 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>

        {/* Preferences */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Preferences</p>
            {prefsSaved && <span className="text-xs text-emerald-400 font-semibold">✓ Saved</span>}
          </div>

          <div className="space-y-4">
            {[
              { key: 'notifications', label: 'Anomaly Notifications', description: 'Show a banner when predictions detect emission anomalies.' },
              { key: 'compactView', label: 'Compact Dashboard', description: 'Reduce spacing and padding for a denser layout.' },
            ].map(({ key, label, description }) => (
              <div key={key} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-slate-200 text-sm font-semibold">{label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handlePrefToggle(key)}
                  className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ${prefs[key] ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  aria-pressed={prefs[key]}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${prefs[key] ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Change password */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 space-y-5 lg:col-span-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Security — Verify Password</p>

          {pwError && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">{pwError}</div>
          )}
          {pwSuccess && (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-300">{pwSuccess}</div>
          )}

          <form onSubmit={handlePwSubmit} className="grid sm:grid-cols-3 gap-4">
            {[
              { name: 'current', label: 'Current Password' },
              { name: 'next', label: 'New Password' },
              { name: 'confirm', label: 'Confirm New Password' },
            ].map((f) => (
              <div key={f.name} className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{f.label}</label>
                <input
                  type="password"
                  name={f.name}
                  value={pwForm[f.name]}
                  onChange={handlePwChange}
                  required
                  className="w-full bg-slate-800/60 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:border-teal-500/60 focus:ring-teal-400/20 transition"
                />
              </div>
            ))}
            <div className="sm:col-span-3">
              <button
                type="submit"
                disabled={pwLoading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 text-sm font-semibold hover:bg-teal-500/30 transition disabled:opacity-40"
              >
                {pwLoading ? <LoadingSpinner size="sm" /> : 'Verify & Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
