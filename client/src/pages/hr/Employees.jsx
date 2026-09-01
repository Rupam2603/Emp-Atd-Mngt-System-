import { useEffect, useState } from 'react';
import { getEmployees } from '../../api/hrApi.js';

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getEmployees();
      setEmployees(res.data || []);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Employees</h1>
      <table className="table-editorial">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.department || '—'}</td>
              <td>{e.designation || '—'}</td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-[var(--muted)] py-10">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
