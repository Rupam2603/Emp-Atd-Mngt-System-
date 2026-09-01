import { useEffect, useState } from 'react';
import { getAttendanceReport } from '../../api/hrApi.js';

export default function AttendanceReport() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getAttendanceReport();
      setLogs(res.data || []);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Attendance Report</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Employee</th>
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Check-In</th>
              <th className="text-left px-4 py-2">Check-Out</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l._id} className="border-t">
                <td className="px-4 py-2">{l.userId?.name || '-'}</td>
                <td className="px-4 py-2">{new Date(l.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{l.checkIn ? new Date(l.checkIn).toLocaleTimeString() : '-'}</td>
                <td className="px-4 py-2">{l.checkOut ? new Date(l.checkOut).toLocaleTimeString() : '-'}</td>
                <td className="px-4 py-2">{l.status}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-3 text-center text-gray-600">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}