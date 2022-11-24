import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://todolistprod.herokuapp.com',
});

export function handleRegister({ name, email, password }) {
  return api.post('/auth/users', { name, email, password });
}

export function handleLogin({ email, password }) {
  return api.post('/auth/login', { email, password });
}

