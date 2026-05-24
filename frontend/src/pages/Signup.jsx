import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../services/auth';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await signupUser(form);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass border border-emerald-500/20 rounded-[2rem] p-10 max-w-3xl mx-auto shadow-2xl shadow-emerald-500/20 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl -ml-20 -mt-20"></div>
      <div className="relative z-10 space-y-6">
        <div className="space-y-3">
          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">Create your account</p>
          <h1 className="text-4xl font-black">Start tracking carbon emissions</h1>
          <p className="text-slate-400">Sign up to save predictions, view analytics, and access your personal dashboard.</p>
        </div>

        {error && (
          <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-200">
            Account created successfully. Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <label className="block">
              <span className="text-slate-300 text-sm">Username</span>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-900/80 px-5 py-4 text-white placeholder-slate-500 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-400/20 outline-none"
              />
            </label>
            <label className="block">
              <span className="text-slate-300 text-sm">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-900/80 px-5 py-4 text-white placeholder-slate-500 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-400/20 outline-none"
              />
            </label>
            <label className="block">
              <span className="text-slate-300 text-sm">Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-900/80 px-5 py-4 text-white placeholder-slate-500 focus:border-emerald-500/70 focus:ring-2 focus:ring-emerald-400/20 outline-none"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gradient-primary text-white font-bold rounded-3xl px-6 py-4 text-sm uppercase tracking-[0.2em] transition hover:shadow-2xl hover:shadow-emerald-500/30 disabled:opacity-50"
          >
            {loading ? <LoadingSpinner size="sm" /> : 'Create Account'}
          </button>
        </form>

        <p className="text-slate-400 text-sm">
          Already registered?{' '}
          <Link to="/login" className="text-emerald-300 hover:text-emerald-100 font-semibold">
            Sign in now
          </Link>
        </p>
      </div>
    </div>
  );
}
