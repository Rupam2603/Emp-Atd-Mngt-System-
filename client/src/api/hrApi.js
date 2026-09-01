import apiClient from './apiClient.js';

export async function getDashboard() {
  const res = await apiClient.get('/hr/dashboard');
  return res.data;
}

export async function getEmployees() {
  const res = await apiClient.get('/hr/employees');
  return res.data;
}

export async function getAttendanceReport(filters) {
  const res = await apiClient.get('/hr/attendance-report', { params: filters });
  return res.data;
}