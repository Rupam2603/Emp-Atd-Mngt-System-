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
      <h1 className="text-2xl font-semibold mb-4">Employees</h1>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Department</th>
              <th className="text-left px-4 py-2">Designation</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e._id} className="border-t">
                <td className="px-4 py-2">{e.name}</td>
                <td className="px-4 py-2">{e.email}</td>
                <td className="px-4 py-2">{e.department || '-'}</td>
                <td className="px-4 py-2">{e.designation || '-'}</td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center text-gray-600">No employees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}