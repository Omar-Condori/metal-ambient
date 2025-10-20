// src/components/dashboard/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ofertaService from '../../services/ofertaService';
import {
  Home,
  Package,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Loader2,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [ofertas, setOfertas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('TODOS');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if (!isAdmin()) {
      toast.error('No tienes permisos para acceder a esta página');
      navigate('/dashboard');
      return;
    }
    cargarOfertas();
  }, []);

  const cargarOfertas = async () => {
    setLoading(true);
    try {
      const data = await ofertaService.obtenerTodasLasOfertas();
      setOfertas(data);
    } catch (error) {
      toast.error('Error al cargar ofertas');
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    const mensajes = {
      'APROBADA': '¿Aprobar esta oferta?',
      'RECHAZADA': '¿Rechazar esta oferta?'
    };

    if (window.confirm(mensajes[nuevoEstado])) {
      try {
        await ofertaService.cambiarEstadoOfertaAdmin(id, nuevoEstado);
        toast.success(`Oferta ${nuevoEstado.toLowerCase()} exitosamente`);
        cargarOfertas();
      } catch (error) {
        toast.error(error.mensaje || 'Error al cambiar estado');
      }
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getEstadoBadgeColor = (estado) => {
    const colores = {
      'PENDIENTE': 'bg-yellow-100 text-yellow-800',
      'APROBADA': 'bg-green-100 text-green-800',
      'RECHAZADA': 'bg-red-100 text-red-800',
      'VENDIDA': 'bg-blue-100 text-blue-800'
    };
    return colores[estado] || 'bg-gray-100 text-gray-800';
  };

  // Filtrar ofertas
  const ofertasFiltradas = ofertas.filter(oferta => {
    const cumpleFiltroEstado = filtroEstado === 'TODOS' || oferta.estado === filtroEstado;
    const cumpleBusqueda = 
      oferta.tipoMaterial.toLowerCase().includes(busqueda.toLowerCase()) ||
      oferta.vendedor?.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
      oferta.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleFiltroEstado && cumpleBusqueda;
  });

  // Calcular estadísticas
  const stats = {
    total: ofertas.length,
    pendientes: ofertas.filter(o => o.estado === 'PENDIENTE').length,
    aprobadas: ofertas.filter(o => o.estado === 'APROBADA').length,
    rechazadas: ofertas.filter(o => o.estado === 'RECHAZADA').length,
    vendidas: ofertas.filter(o => o.estado === 'VENDIDA').length,
    totalVendido: ofertas
      .filter(o => o.estado === 'VENDIDA')
      .reduce((sum, o) => sum + (o.precioTotal || 0), 0)
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Panel de Administración
                </h1>
                <p className="mt-2 text-gray-600">
                  Gestiona todas las ofertas y usuarios del sistema
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={cargarOfertas}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <RefreshCw className="mr-2" size={20} />
                  Actualizar
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <Home className="mr-2" size={20} />
                  Inicio
                </button>
              </div>
            </div>
          </div>

          {/* Estadísticas Generales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Package className="text-gray-400" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pendientes}</p>
                </div>
                <Clock className="text-yellow-400" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Aprobadas</p>
                  <p className="text-2xl font-bold text-green-600">{stats.aprobadas}</p>
                </div>
                <CheckCircle className="text-green-400" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Rechazadas</p>
                  <p className="text-2xl font-bold text-red-600">{stats.rechazadas}</p>
                </div>
                <XCircle className="text-red-400" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vendidas</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.vendidas}</p>
                </div>
                <TrendingUp className="text-blue-400" size={32} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Vendido</p>
                  <p className="text-xl font-bold text-purple-600">
                    {formatCurrency(stats.totalVendido)}
                  </p>
                </div>
                <TrendingUp className="text-purple-400" size={32} />
              </div>
            </div>
          </div>

          {/* Filtros y Búsqueda */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Filtro por Estado */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="inline mr-2" size={18} />
                  Filtrar por Estado
                </label>
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="TODOS">Todos los estados</option>
                  <option value="PENDIENTE">Pendientes</option>
                  <option value="APROBADA">Aprobadas</option>
                  <option value="RECHAZADA">Rechazadas</option>
                  <option value="VENDIDA">Vendidas</option>
                </select>
              </div>

              {/* Búsqueda */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="inline mr-2" size={18} />
                  Buscar
                </label>
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Material, vendedor o ubicación..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Mostrando <span className="font-semibold">{ofertasFiltradas.length}</span> de{' '}
              <span className="font-semibold">{ofertas.length}</span> ofertas
            </div>
          </div>

          {/* Tabla de Ofertas */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Gestión de Ofertas
              </h2>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto" />
                <p className="mt-4 text-gray-600">Cargando ofertas...</p>
              </div>
            ) : ofertasFiltradas.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No se encontraron ofertas
                </h3>
                <p className="text-gray-500">
                  {busqueda || filtroEstado !== 'TODOS'
                    ? 'Intenta ajustar los filtros de búsqueda'
                    : 'Aún no hay ofertas en el sistema'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Vendedor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Cantidad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Precio Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ofertasFiltradas.map((oferta) => (
                      <tr key={oferta.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {oferta.tipoMaterial}
                          </div>
                          <div className="text-sm text-gray-500">
                            {oferta.ubicacion}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {oferta.vendedor?.nombreCompleto}
                          </div>
                          <div className="text-sm text-gray-500">
                            {oferta.vendedor?.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {oferta.cantidad} kg
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatCurrency(oferta.precioTotal)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatCurrency(oferta.precioUnitario)}/kg
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(oferta.fechaCreacion)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadgeColor(oferta.estado)}`}>
                            {oferta.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/oferta/${oferta.id}`)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Ver detalle"
                            >
                              <Eye size={18} />
                            </button>
                            
                            {oferta.estado === 'PENDIENTE' && (
                              <>
                                <button
                                  onClick={() => handleCambiarEstado(oferta.id, 'APROBADA')}
                                  className="text-green-600 hover:text-green-900"
                                  title="Aprobar"
                                >
                                  <CheckCircle size={18} />
                                </button>
                                <button
                                  onClick={() => handleCambiarEstado(oferta.id, 'RECHAZADA')}
                                  className="text-red-600 hover:text-red-900"
                                  title="Rechazar"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;