import apiClient from './apiClient.js';

export async function checkIn(location) {
  const res = await apiClient.post('/attendance/check-in', { location });
  return res.data;
}

export async function checkOut() {
  const res = await apiClient.post('/attendance/check-out');
  return res.data;
}

export async function getToday() {
  const res = await apiClient.get('/attendance/today');
  return res.data;
}

export async function getHistory(from, to) {
  const params = {};
  if (from) params.from = from;
  if (to) params.to = to;
  const res = await apiClient.get('/attendance/history', { params });
  return res.data;
}