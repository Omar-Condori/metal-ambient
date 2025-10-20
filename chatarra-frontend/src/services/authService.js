import api from './api';

const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          nombreCompleto: response.data.nombreCompleto,
          email: response.data.email,
          rol: response.data.rol  // ← GUARDAR ROL
        }));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al registrar usuario' };
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.id,
          nombreCompleto: response.data.nombreCompleto,
          email: response.data.email,
          rol: response.data.rol  // ← GUARDAR ROL
        }));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al iniciar sesión' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;