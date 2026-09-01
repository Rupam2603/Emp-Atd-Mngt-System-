import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const data = await login(email, password);
      if (data.user?.role === 'hr') {
        navigate('/hr/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-porcelain">
      <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-ink text-porcelain px-12 py-12">
        <div
          className="orb orb-drift"
          style={{ width: 380, height: 380, background: '#8B93F0', top: -100, left: -80 }}
        />
        <div
          className="orb orb-drift"
          style={{ width: 260, height: 260, background: '#B8933E', bottom: -60, right: -60, animationDelay: '4s' }}
        />
        <div className="relative z-10 font-display text-xl">Meridian</div>
        <div className="relative z-10 reveal">
          <p className="font-display italic text-3xl leading-snug max-w-sm">
            A quiet record of every morning you showed up.
          </p>
          <p className="mt-6 text-sm text-porcelain/60 max-w-xs">
            Attendance and leave, kept with the same care as the work itself.
          </p>
        </div>
        <div className="relative z-10 text-xs text-porcelain/40">Inner Eye &middot; Workforce</div>
      </div>

      <div className="flex items-center justify-center px-6 py-16">
        <form onSubmit={handleSubmit} className="w-full max-w-sm reveal">
          <h1 className="font-display text-3xl mb-1">Welcome back</h1>
          <p className="text-sm text-[var(--muted)] mb-8">Sign in to continue to your dashboard.</p>

          {error && <p className="text-[var(--rose)] text-sm mb-4">{error}</p>}

          <label className="block text-xs text-[var(--muted)] mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input-field mb-5"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-xs text-[var(--muted)] mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="input-field mb-8"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary w-full">
            Sign in
          </button>

          <p className="text-sm text-[var(--muted)] mt-6">
            No account yet?{' '}
            <Link to="/register" className="text-[var(--text-ink)] border-b border-current">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
