import { useState, useEffect } from 'react';
import { applyLeave, getMyRequests, getBalance } from '../../api/leaveApi.js';

export default function LeaveManagement() {
  const [form, setForm] = useState({ type: 'casual', startDate: '', endDate: '', reason: '' });
  const [requests, setRequests] = useState([]);
  const [balance, setBalance] = useState([]);
  const [msg, setMsg] = useState('');

  async function load() {
    const [reqRes, balRes] = await Promise.all([getMyRequests(), getBalance()]);
    setRequests(reqRes.data || []);
    setBalance(balRes.data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    try {
      await applyLeave(form);
      setMsg('Request submitted');
      setForm({ type: 'casual', startDate: '', endDate: '', reason: '' });
      load();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Failed to apply');
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Leave</h1>
      <div className="grid md:grid-cols-5 gap-12">
        <form onSubmit={handleSubmit} className="md:col-span-2">
          <p className="text-xs text-[var(--muted)] mb-6">New request</p>
          {msg && <p className="text-sm text-[var(--emerald)] mb-4">{msg}</p>}

          <label className="block text-xs text-[var(--muted)] mb-1">Type</label>
          <select
            className="input-field mb-5"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="casual">Casual</option>
            <option value="sick">Sick</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="block text-xs text-[var(--muted)] mb-1">From</label>
              <input
                type="date"
                className="input-field"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[var(--muted)] mb-1">To</label>
              <input
                type="date"
                className="input-field"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                required
              />
            </div>
          </div>

          <label className="block text-xs text-[var(--muted)] mb-1">Reason</label>
          <textarea
            className="input-field mb-8"
            rows={3}
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            required
          />

          <button className="btn-primary">Submit request</button>
        </form>

        <div className="md:col-span-3">
          <p className="text-xs text-[var(--muted)] mb-6">Balance</p>
          <div className="grid grid-cols-3 gap-6 pb-8 mb-8 hairline">
            {balance.map((b) => (
              <div key={b.type}>
                <p className="text-xs text-[var(--muted)] capitalize mb-1">{b.type}</p>
                <p className="font-display text-2xl">
                  {b.remaining}
                  <span className="text-sm text-[var(--muted)]">/{b.allocated}</span>
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-[var(--muted)] mb-4">Your requests</p>
          <table className="table-editorial">
            <thead>
              <tr>
                <th>Type</th>
                <th>Dates</th>
                <th>Days</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id}>
                  <td className="capitalize">{r.type}</td>
                  <td>
                    {new Date(r.startDate).toLocaleDateString()} – {new Date(r.endDate).toLocaleDateString()}
                  </td>
                  <td>{r.totalDays}</td>
                  <td>
                    <span
                      className={`badge badge-${
                        r.status === 'approved' ? 'present' : r.status === 'rejected' ? 'absent' : 'late'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-[var(--muted)] py-8">
                    No requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
