import apiClient from './apiClient.js';

export async function applyLeave(payload) {
  const res = await apiClient.post('/leave/apply', payload);
  return res.data;
}

export async function getMyRequests() {
  const res = await apiClient.get('/leave/my-requests');
  return res.data;
}

export async function getBalance() {
  const res = await apiClient.get('/leave/balance');
  return res.data;
}

export async function getAllRequests(status) {
  const params = {};
  if (status) params.status = status;
  const res = await apiClient.get('/leave/requests', { params });
  return res.data;
}

export async function approveRequest(id, hrRemarks) {
  const res = await apiClient.patch(`/leave/${id}/approve`, { hrRemarks });
  return res.data;
}

export async function rejectRequest(id, hrRemarks) {
  const res = await apiClient.patch(`/leave/${id}/reject`, { hrRemarks });
  return res.data;
}