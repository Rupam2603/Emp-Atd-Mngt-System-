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
      await approveRequest(id, 'Approved by HR');
      setMsg('Request approved');
      load();
    } catch {
      setMsg('Approval failed');
    }
  }

  async function handleReject(id) {
    try {
      await rejectRequest(id, 'Rejected by HR');
      setMsg('Request rejected');
      load();
    } catch {
      setMsg('Rejection failed');
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Leave Approvals</h1>
      {msg && <p className="mb-3 text-sm text-green-700">{msg}</p>}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Employee</th>
              <th className="text-left px-4 py-2">Type</th>
              <th className="text-left px-4 py-2">From</th>
              <th className="text-left px-4 py-2">To</th>
              <th className="text-left px-4 py-2">Days</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id} className="border-t">
                <td className="px-4 py-2">{r.userId?.name || '-'}</td>
                <td className="px-4 py-2">{r.type}</td>
                <td className="px-4 py-2">{new Date(r.startDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(r.endDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{r.totalDays}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleApprove(r._id)}
                    className="bg-green-600 text-white px-2 py-1 rounded text-xs mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(r._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-600">No pending requests.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
