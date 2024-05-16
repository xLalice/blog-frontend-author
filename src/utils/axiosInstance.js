import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://blog-backend-api-production-2c23.up.railway.app', 
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
