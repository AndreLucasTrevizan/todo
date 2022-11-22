import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export function handleRegister({ name, email, password }) {
  return api.post('/auth/users', { name, email, password });
}

export function handleLogin({ email, password }) {
  return api.post('/auth/login', { email, password });
}

