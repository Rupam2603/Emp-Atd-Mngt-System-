import { useEffect, useState } from 'react';
import { getDashboard } from '../../api/hrApi.js';

export default function HrDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getDashboard();
      setStats(res.data);
    }
    load();
  }, []);

  if (!stats) return <p className="text-[var(--muted)]">Loading…</p>;

  const items = [
    { label: 'Total employees', value: stats.totalEmployees },
    { label: 'Present today', value: stats.presentToday },
    { label: 'Absent today', value: stats.absentToday },
    { label: 'Late today', value: stats.lateToday },
    { label: 'On leave', value: stats.onLeaveToday },
  ];

  return (
    <div>
      <p className="font-display italic text-[var(--muted)] mb-1">
        {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
      </p>
      <h1 className="font-display text-4xl mb-10">Workforce overview</h1>

      <div className="hairline" />
      <div className="grid grid-cols-2 md:grid-cols-5">
        {items.map((it, i) => (
          <div key={it.label} className={`py-8 px-4 md:px-8 ${i > 0 ? 'md:border-l border-[var(--line)]' : ''}`}>
            <p className="text-xs text-[var(--muted)] mb-2">{it.label}</p>
            <p className="font-display text-4xl">{it.value}</p>
          </div>
        ))}
      </div>
      <div className="hairline" />
    </div>
  );
}
