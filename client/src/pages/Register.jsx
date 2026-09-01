import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', department: '', designation: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-porcelain">
      <div className="flex items-center justify-center px-6 py-16 order-2 md:order-1">
        <form onSubmit={handleSubmit} className="w-full max-w-sm reveal">
          <h1 className="font-display text-3xl mb-1">Create your profile</h1>
          <p className="text-sm text-[var(--muted)] mb-8">Set up access to check in and track leave.</p>

          {error && <p className="text-[var(--rose)] text-sm mb-4">{error}</p>}

          <label className="block text-xs text-[var(--muted)] mb-1">Full name</label>
          <input
            className="input-field mb-5"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <label className="block text-xs text-[var(--muted)] mb-1">Email</label>
          <input
            className="input-field mb-5"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <label className="block text-xs text-[var(--muted)] mb-1">Password</label>
          <input
            className="input-field mb-5"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-xs text-[var(--muted)] mb-1">Department</label>
              <input
                className="input-field"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)] mb-1">Designation</label>
              <input
                className="input-field"
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full">
            Create account
          </button>

          <p className="text-sm text-[var(--muted)] mt-6">
            Already registered?{' '}
            <Link to="/login" className="text-[var(--text-ink)] border-b border-current">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-ink text-porcelain px-12 py-12 order-1 md:order-2">
        <div
          className="orb orb-drift"
          style={{ width: 320, height: 320, background: '#1F6F5C', top: -80, right: -80 }}
        />
        <div
          className="orb orb-drift"
          style={{ width: 220, height: 220, background: '#8B93F0', bottom: -40, left: -40, animationDelay: '3s' }}
        />
        <div className="relative z-10 font-display text-xl">Meridian</div>
        <div className="relative z-10 reveal">
          <p className="font-display italic text-3xl leading-snug max-w-sm">
            Every check-in is a small promise kept.
          </p>
        </div>
        <div className="relative z-10 text-xs text-porcelain/40">Inner Eye &middot; Workforce</div>
      </div>
    </div>
  );
}
