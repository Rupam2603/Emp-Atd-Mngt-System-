import { useEffect, useState } from 'react';
import { getHistory } from '../../api/attendanceApi.js';

export default function AttendanceHistory() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getHistory();
      setLogs(res.data || []);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Attendance history</h1>
      <table className="table-editorial">
        <thead>
          <tr>
            <th>Date</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
            <th>Worked</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l._id}>
              <td>{new Date(l.date).toLocaleDateString()}</td>
              <td>
                {l.checkIn
                  ? new Date(l.checkIn).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
                  : '—'}
              </td>
              <td>
                {l.checkOut
                  ? new Date(l.checkOut).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
                  : '—'}
              </td>
              <td>
                <span className={`badge badge-${l.status}`}>{l.status?.replace('_', ' ')}</span>
              </td>
              <td>
                {Math.floor((l.workedSeconds || 0) / 3600)}h {Math.floor(((l.workedSeconds || 0) % 3600) / 60)}m
              </td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-[var(--muted)] py-10">
                No records yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
