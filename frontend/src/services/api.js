import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('devmind_token');
  if (token && isTokenExpired(token)) {
    localStorage.removeItem('devmind_token');
    localStorage.removeItem('devmind_user');
    window.location.href = '/login';
    return Promise.reject(new Error('Token expired'));
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('devmind_token');
    localStorage.removeItem('devmind_user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;
