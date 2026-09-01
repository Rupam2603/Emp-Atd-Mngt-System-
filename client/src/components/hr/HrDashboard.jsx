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

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">HR Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <KpiCard label="Total Employees" value={stats.totalEmployees} />
        <KpiCard label="Present Today" value={stats.presentToday} />
        <KpiCard label="Absent Today" value={stats.absentToday} />
        <KpiCard label="Late Today" value={stats.lateToday} />
        <KpiCard label="On Leave Today" value={stats.onLeaveToday} />
      </div>
    </div>
  );
}

function KpiCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}