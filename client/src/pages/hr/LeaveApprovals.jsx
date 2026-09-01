import { useEffect, useState } from 'react';
import { getAllRequests, approveRequest, rejectRequest } from '../../api/leaveApi.js';

export default function LeaveApprovals() {
  const [requests, setRequests] = useState([]);
  const [msg, setMsg] = useState('');

  async function load() {
    const res = await getAllRequests('pending');
    setRequests(res.data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleApprove(id) {
    try {
      await approveRequest(id, 'Approved');
      setMsg('Approved');
      load();
    } catch {
      setMsg('Failed to approve');
    }
  }

  async function handleReject(id) {
    try {
      await rejectRequest(id, 'Rejected');
      setMsg('Rejected');
      load();
    } catch {
      setMsg('Failed to reject');
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Leave requests</h1>
      {msg && <p className="text-sm text-[var(--emerald)] mb-4">{msg}</p>}
      <table className="table-editorial">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Type</th>
            <th>From</th>
            <th>To</th>
            <th>Days</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r._id}>
              <td>{r.userId?.name || '—'}</td>
              <td className="capitalize">{r.type}</td>
              <td>{new Date(r.startDate).toLocaleDateString()}</td>
              <td>{new Date(r.endDate).toLocaleDateString()}</td>
              <td>{r.totalDays}</td>
              <td className="text-right">
                <button
                  onClick={() => handleApprove(r._id)}
                  className="text-[var(--emerald)] text-xs mr-4 border-b border-current"
                >
                  Approve
                </button>
                <button onClick={() => handleReject(r._id)} className="text-[var(--rose)] text-xs border-b border-current">
                  Reject
                </button>
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-[var(--muted)] py-10">
                No pending requests.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
