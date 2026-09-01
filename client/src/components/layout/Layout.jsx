import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

const EMPLOYEE_LINKS = [
  { to: '/employee/dashboard', label: 'Dashboard' },
  { to: '/employee/attendance', label: 'History' },
  { to: '/employee/leave', label: 'Leave' },
];

const HR_LINKS = [
  { to: '/hr/dashboard', label: 'Overview' },
  { to: '/hr/employees', label: 'Employees' },
  { to: '/hr/attendance', label: 'Attendance' },
  { to: '/hr/leaves', label: 'Leave requests' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const links = user?.role === 'hr' ? HR_LINKS : EMPLOYEE_LINKS;

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-porcelain text-[var(--text-ink)]">
      <header className="border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <div className="font-display text-xl tracking-tight">Meridian</div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {links.map((l) => {
              const active = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`pb-1 border-b transition-colors ${
                    active
                      ? 'border-current text-[var(--text-ink)]'
                      : 'border-transparent text-[var(--muted)] hover:text-[var(--text-ink)]'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 text-sm">
            <span className="text-[var(--muted)] hidden sm:inline">{user?.name}</span>
            <button onClick={handleLogout} className="text-[var(--muted)] hover:text-[var(--text-ink)]">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <Outlet />
      </main>
    </div>
  );
}
