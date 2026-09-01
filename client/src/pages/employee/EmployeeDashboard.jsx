import { useState, useEffect } from 'react';
import { checkIn, checkOut, getToday } from '../../api/attendanceApi.js';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function EmployeeDashboard() {
  const [today, setToday] = useState(null);
  const [msg, setMsg] = useState('');
  const now = useClock();

  async function loadToday() {
    try {
      const res = await getToday();
      setToday(res.data);
    } catch {
      setToday(null);
    }
  }

  useEffect(() => {
    loadToday();
  }, []);

  async function handleCheckIn() {
    try {
      await checkIn();
      setMsg('Checked in');
      loadToday();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Check-in failed');
    }
  }

  async function handleCheckOut() {
    try {
      await checkOut();
      setMsg('Checked out');
      loadToday();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Check-out failed');
    }
  }

  const workedH = Math.floor((today?.workedSeconds || 0) / 3600);
  const workedM = Math.floor(((today?.workedSeconds || 0) % 3600) / 60);
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div>
      <div className="mb-10 reveal">
        <p className="font-display italic text-[var(--muted)] mb-1">
          {now.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h1 className="font-display text-4xl">{greeting}.</h1>
      </div>

      <div className="relative overflow-hidden rounded-sm mb-10">
        <div
          className="orb orb-drift"
          style={{ width: 300, height: 300, background: '#8B93F0', top: -120, right: -80 }}
        />
        <div
          className="orb orb-drift"
          style={{ width: 220, height: 220, background: '#B8933E', bottom: -100, left: -60, animationDelay: '5s' }}
        />
        <div className="glass relative z-10 px-8 py-10 md:px-12 md:py-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-xs text-[var(--muted)] mb-2">Current time</p>
              <p className="font-display text-6xl tabular-nums">
                {now.toLocaleTimeString(undefined, { hour12: false })}
              </p>
            </div>
            <div className="text-sm space-y-1">
              <p>
                Checked in{' '}
                <span className="font-medium">
                  {today?.checkIn
                    ? new Date(today.checkIn).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
                    : '— not yet —'}
                </span>
              </p>
              {today?.checkOut && (
                <p>
                  Checked out{' '}
                  <span className="font-medium">
                    {new Date(today.checkOut).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </p>
              )}
              <p className="text-[var(--muted)]">
                Worked so far: {workedH}h {workedM}m
              </p>
            </div>
            <div>
              {!today?.checkIn ? (
                <button onClick={handleCheckIn} className="btn-primary">
                  Check in
                </button>
              ) : !today?.checkOut ? (
                <button onClick={handleCheckOut} className="btn-ghost">
                  Check out
                </button>
              ) : (
                <span className="badge badge-present">Day complete</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {msg && <p className="text-sm text-[var(--emerald)] mb-6">{msg}</p>}

      <div className="hairline" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
        <div>
          <p className="text-xs text-[var(--muted)] mb-1">Status</p>
          <p className="font-display text-2xl capitalize">{today?.status?.replace('_', ' ') || '—'}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)] mb-1">Worked today</p>
          <p className="font-display text-2xl">
            {workedH}h {workedM}m
          </p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)] mb-1">Late by</p>
          <p className="font-display text-2xl">{Math.floor((today?.lateSeconds || 0) / 60)}m</p>
        </div>
        <div>
          <p className="text-xs text-[var(--muted)] mb-1">Left early by</p>
          <p className="font-display text-2xl">{Math.floor((today?.earlyLeaveSeconds || 0) / 60)}m</p>
        </div>
      </div>
    </div>
  );
}
