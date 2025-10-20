// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import ofertaService from '../services/ofertaService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ofertas, setOfertas] = useState([]); // ← NUEVO
  const [estadisticas, setEstadisticas] = useState(null); // ← NUEVO

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Cargar ofertas y estadísticas si es vendedor
      if (currentUser.rol === 'VENDEDOR') {
        cargarDatosVendedor();
      }
    }
    setLoading(false);
  }, []);

  // ========== FUNCIONES DE AUTENTICACIÓN ==========
  
  const login = async (credentials) => {
    const data = await authService.login(credentials);
    const userData = {
      id: data.id,
      nombreCompleto: data.nombreCompleto,
      email: data.email,
      rol: data.rol
    };
    setUser(userData);
    
    // Cargar datos si es vendedor
    if (data.rol === 'VENDEDOR') {
      await cargarDatosVendedor();
    }
    
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    const user = {
      id: data.id,
      nombreCompleto: data.nombreCompleto,
      email: data.email,
      rol: data.rol
    };
    setUser(user);
    
    // Cargar datos si es vendedor
    if (data.rol === 'VENDEDOR') {
      await cargarDatosVendedor();
    }
    
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setOfertas([]);
    setEstadisticas(null);
  };

  // ========== FUNCIONES DE OFERTAS (NUEVO) ==========

  const cargarDatosVendedor = async () => {
    try {
      const [ofertasData, statsData] = await Promise.all([
        ofertaService.obtenerMisOfertas(),
        ofertaService.obtenerEstadisticas()
      ]);
      setOfertas(ofertasData);
      setEstadisticas(statsData);
    } catch (error) {
      console.error('Error al cargar datos del vendedor:', error);
    }
  };

  const crearOferta = async (ofertaData) => {
    try {
      const nuevaOferta = await ofertaService.crearOferta(ofertaData);
      setOfertas(prev => [nuevaOferta, ...prev]);
      await cargarEstadisticas(); // Actualizar stats
      return nuevaOferta;
    } catch (error) {
      throw error;
    }
  };

  const actualizarEstadoOferta = async (id, nuevoEstado) => {
    try {
      const ofertaActualizada = await ofertaService.actualizarEstadoOferta(id, nuevoEstado);
      setOfertas(prev => 
        prev.map(o => o.id === id ? ofertaActualizada : o)
      );
      await cargarEstadisticas();
      return ofertaActualizada;
    } catch (error) {
      throw error;
    }
  };

  const eliminarOferta = async (id) => {
    try {
      await ofertaService.eliminarOferta(id);
      setOfertas(prev => prev.filter(o => o.id !== id));
      await cargarEstadisticas();
    } catch (error) {
      throw error;
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const stats = await ofertaService.obtenerEstadisticas();
      setEstadisticas(stats);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const recargarOfertas = async () => {
    try {
      const ofertasData = await ofertaService.obtenerMisOfertas();
      setOfertas(ofertasData);
    } catch (error) {
      console.error('Error al recargar ofertas:', error);
    }
  };

  // ========== VERIFICACIONES DE ROL ==========

  const isAdmin = () => {
    return user?.rol === 'ADMIN';
  };

  const isVendedor = () => {
    return user?.rol === 'VENDEDOR';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const value = {
    user,
    loading,
    ofertas, // ← NUEVO
    estadisticas, // ← NUEVO
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    isVendedor,
    crearOferta, // ← NUEVO
    actualizarEstadoOferta, // ← NUEVO
    eliminarOferta, // ← NUEVO
    cargarEstadisticas, // ← NUEVO
    recargarOfertas, // ← NUEVO
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};