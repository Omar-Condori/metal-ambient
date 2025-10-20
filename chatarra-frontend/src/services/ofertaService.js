// src/services/ofertaService.js
import api from './api';

const ofertaService = {
  // ==================== VENDEDOR ====================
  
  /**
   * Crear nueva oferta
   */
  crearOferta: async (ofertaData) => {
    try {
      const response = await api.post('/vendedor/ofertas', ofertaData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al crear oferta' };
    }
  },

  /**
   * Obtener todas mis ofertas
   */
  obtenerMisOfertas: async () => {
    try {
      const response = await api.get('/vendedor/ofertas');
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al obtener ofertas' };
    }
  },

  /**
   * Obtener una oferta específica
   */
  obtenerOfertaPorId: async (id) => {
    try {
      const response = await api.get(`/vendedor/ofertas/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al obtener oferta' };
    }
  },

  /**
   * Eliminar oferta (solo si está PENDIENTE)
   */
  eliminarOferta: async (id) => {
    try {
      const response = await api.delete(`/vendedor/ofertas/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al eliminar oferta' };
    }
  },

  /**
   * Obtener estadísticas del vendedor
   */
  obtenerEstadisticas: async () => {
    try {
      const response = await api.get('/vendedor/estadisticas');
      return response.data;
    } catch (error) {
      throw error.response?.data || { mensaje: 'Error al obtener estadísticas' };
    }
  },
};

export default ofertaService;