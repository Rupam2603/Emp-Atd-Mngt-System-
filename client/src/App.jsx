import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth.js';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import EmployeeDashboard from './pages/employee/EmployeeDashboard.jsx';
import AttendanceHistory from './pages/employee/AttendanceHistory.jsx';
import LeaveManagement from './pages/employee/LeaveManagement.jsx';
import HrDashboard from './components/hr/HrDashboard.jsx';
import Employees from './components/hr/Employees.jsx';
import AttendanceReport from './components/hr/AttendanceReport.jsx';
import LeaveApprovals from './components/hr/LeaveApprovals.jsx';
import Layout from './components/layout/Layout.jsx';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={['employee', 'hr']}>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route
          path="employee/dashboard"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="employee/attendance"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <AttendanceHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="employee/leave"
          element={
            <ProtectedRoute allowedRoles={['employee']}>
              <LeaveManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="hr/dashboard"
          element={
            <ProtectedRoute allowedRoles={['hr']}>
              <HrDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="hr/employees"
          element={
            <ProtectedRoute allowedRoles={['hr']}>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="hr/attendance"
          element={
            <ProtectedRoute allowedRoles={['hr']}>
              <AttendanceReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="hr/leaves"
          element={
            <ProtectedRoute allowedRoles={['hr']}>
              <LeaveApprovals />
            </ProtectedRoute>
          }
        />

        <Route index element={<IndexRedirect />} />
      </Route>
    </Routes>
  );
}

function IndexRedirect() {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role === 'hr') return <Navigate to="/hr/dashboard" />;
  return <Navigate to="/employee/dashboard" />;
}