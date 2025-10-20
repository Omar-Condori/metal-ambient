// src/services/api.js
import axios from 'axios';

// Crear instancia de Axios con configuración base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para agregar el token JWT a cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 [api] Token agregado al header');
    } else {
      console.warn('⚠️ [api] No hay token en localStorage');
    }
    
    console.log('📤 [api] Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ [api] Error en request interceptor:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    console.log('📥 [api] Response OK:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ [api] Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data
    });

    if (error.response?.status === 401) {
      console.warn('🚨 [api] Token expirado o inválido - Redirigiendo a login');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      console.error('🚫 [api] Acceso denegado - Permisos insuficientes');
    }

    return Promise.reject(error);
  }
);

export default api;