// src/services/adminService.js
import api from './api';

const adminService = {
  // ==================== GESTIÓN DE OFERTAS ====================
  
  obtenerTodasLasOfertas: async () => {
    try {
      console.log('🔍 [adminService] Obteniendo todas las ofertas...');
      console.log('📍 [adminService] URL completa:', `${import.meta.env.VITE_API_URL}/admin/ofertas`);
      console.log('🔑 [adminService] Token existe:', !!localStorage.getItem('token'));
      console.log('👤 [adminService] Usuario:', JSON.parse(localStorage.getItem('user') || '{}'));
      
      const response = await api.get('/admin/ofertas');
      
      console.log('✅ [adminService] Ofertas obtenidas exitosamente:', response.data.length, 'ofertas');
      console.log('📊 [adminService] Primera oferta:', response.data[0]);
      
      return response.data;
    } catch (error) {
      console.error('❌ [adminService] ERROR COMPLETO:', error);
      console.error('📄 [adminService] Response:', error.response);
      console.error('📊 [adminService] Status:', error.response?.status);
      console.error('💬 [adminService] Data:', error.response?.data);
      console.error('🔧 [adminService] Config:', error.config);
      
      throw error.response?.data || { mensaje: 'Error al obtener ofertas' };
    }
  },

  cambiarEstadoOferta: async (ofertaId, nuevoEstado) => {
    try {
      console.log(`🔄 [adminService] Cambiando estado de oferta ${ofertaId} a ${nuevoEstado}`);
      
      const response = await api.put(`/admin/ofertas/${ofertaId}`, {
        estado: nuevoEstado
      });
      
      console.log('✅ [adminService] Estado cambiado:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ [adminService] ERROR cambiando estado:', error);
      throw error.response?.data || { mensaje: 'Error al cambiar estado de oferta' };
    }
  },

  // ==================== GESTIÓN DE USUARIOS ====================
  
  obtenerTodosLosUsuarios: async () => {
    try {
      console.log('🔍 [adminService] Obteniendo usuarios...');
      const response = await api.get('/admin/usuarios');
      console.log('✅ [adminService] Usuarios obtenidos:', response.data.length);
      return response.data;
    } catch (error) {
      console.error('❌ [adminService] ERROR obteniendo usuarios:', error);
      throw error.response?.data || { mensaje: 'Error al obtener usuarios' };
    }
  },

  cambiarRolUsuario: async (userId, nuevoRol) => {
    try {
      console.log(`👤 [adminService] Cambiando rol del usuario ${userId} a ${nuevoRol}`);
      const response = await api.put(`/admin/usuarios/${userId}/rol`, {
        newRole: nuevoRol
      });
      console.log('✅ [adminService] Rol cambiado:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ [adminService] ERROR cambiando rol:', error);
      throw error.response?.data || { mensaje: 'Error al cambiar rol' };
    }
  },

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
};

export default adminService;