import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const requestUrl = config.url ?? '';
  const isPublicAuthRequest =
    requestUrl.includes('/users/login') || requestUrl.includes('/users/signup');

  if (isPublicAuthRequest) {
    if (config.headers && 'Authorization' in config.headers) {
      delete config.headers.Authorization;
    }
    return config;
  }

  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
