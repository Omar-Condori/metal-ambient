// src/services/adminService.js
import api from './api';

const adminService = {
  // ==================== GESTIÓN DE USUARIOS ====================
  
  /**
   * Obtener todos los usuarios
   */
  obtenerTodosLosUsuarios: async () => {
    try {
      const response = await api.get('/admin/usuarios');
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al obtener usuarios' };
    }
  },

  /**
   * Cambiar rol de un usuario
   */
  cambiarRolUsuario: async (userId, nuevoRol) => {
    try {
      const response = await api.put(`/admin/usuarios/${userId}/rol`, {
        newRole: nuevoRol
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al cambiar rol' };
    }
  },

  /**
   * Activar/Desactivar usuario
   */
  toggleEstadoUsuario: async (userId, activo) => {
    try {
      const response = await api.put(`/admin/usuarios/${userId}/estado`, {
        activo: activo
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al cambiar estado' };
    }
  },

  // ==================== GESTIÓN DE OFERTAS ====================
  
  /**
   * Obtener todas las ofertas
   */
  obtenerTodasLasOfertas: async () => {
    try {
      const response = await api.get('/admin/ofertas');
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al obtener ofertas' };
    }
  },

  /**
   * Cambiar estado de oferta
   */
  cambiarEstadoOferta: async (ofertaId, nuevoEstado) => {
    try {
      const response = await api.put(`/admin/ofertas/${ofertaId}`, {
        estado: nuevoEstado
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al cambiar estado de oferta' };
    }
  },
};

export default adminService;