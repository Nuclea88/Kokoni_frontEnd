import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('kokoni_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
    }, (error) => {
    return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response, 
    (error) => {
        const isLoginRequest = error.config.url.includes('/login');
        if (error.response && (error.response.status === 401 || error.response.status === 403) && !isLoginRequest) {
            localStorage.clear();
            alert("Tu sesión ha expirado. Por favor, vuelve a entrar.");
            window.location.href = "/login";
        }
  
  return Promise.reject(error);
});
export default api;