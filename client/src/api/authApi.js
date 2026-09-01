import apiClient from './apiClient.js';

export async function login(email, password) {
  const res = await apiClient.post('/auth/login', { email, password });
  return res.data;
}

export async function register(payload) {
  const res = await apiClient.post('/auth/register', payload);
  return res.data;
}