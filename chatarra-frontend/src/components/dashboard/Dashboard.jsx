// src/components/dashboard/Dashboard.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { 
  Home, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle,
  Plus,
  Eye,
  Edit,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user, estadisticas, ofertas, recargarOfertas, eliminarOferta, isVendedor } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isVendedor()) {
      recargarOfertas();
    }
  }, []);

  const handleEliminarOferta = async (id, estado) => {
    if (estado !== 'PENDIENTE') {
      toast.error('Solo puedes eliminar ofertas en estado PENDIENTE');
      return;
    }

    if (window.confirm('¿Estás seguro de eliminar esta oferta?')) {
      try {
        await eliminarOferta(id);
        toast.success('Oferta eliminada correctamente');
      } catch (error) {
        toast.error(error.mensaje || 'Error al eliminar oferta');
      }
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(value || 0);
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

  // Datos para las cards de estadísticas
  const stats = [
    {
      title: 'Ofertas Activas',
      value: estadisticas?.ofertasActivas || 0,
      icon: Package,
      color: 'bg-blue-500',
      change: 'Aprobadas y publicadas'
    },
    {
      title: 'Total Vendido',
      value: formatCurrency(estadisticas?.totalVendido),
      icon: DollarSign,
      color: 'bg-green-500',
      change: `Promedio: ${formatCurrency(estadisticas?.promedioVenta)}`
    },
    {
      title: 'Pendientes',
      value: estadisticas?.ofertasPendientes || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      change: 'Esperando aprobación'
    },
    {
      title: 'Completadas',
      value: estadisticas?.ofertasVendidas || 0,
      icon: CheckCircle,
      color: 'bg-purple-500',
      change: 'Vendidas con éxito'
    }
  ];

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
                  ¡Bienvenido, {user?.nombreCompleto}!
                </h1>
                <p className="mt-2 text-gray-600">
                  Aquí puedes gestionar tus ofertas de chatarra
                </p>
              </div>
              <Link
                to="/"
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <Home className="mr-2" size={20} />
                Volver al Inicio
              </Link>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                  <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
              );
            })}
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button 
                onClick={() => navigate('/crear-oferta')}
                className="flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <Plus className="mr-2" size={20} />
                Nueva Oferta
              </button>
              <button 
                onClick={recargarOfertas}
                className="flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Package className="mr-2" size={20} />
                Recargar Ofertas
              </button>
              <button className="flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                <TrendingUp className="mr-2" size={20} />
                Ver Estadísticas
              </button>
            </div>
          </div>

          {/* Ofertas Recientes */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Mis Ofertas</h2>
            </div>
            
            {ofertas.length === 0 ? (
              <div className="p-12 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tienes ofertas aún
                </h3>
                <p className="text-gray-500 mb-6">
                  Comienza creando tu primera oferta de chatarra
                </p>
                <button 
                  onClick={() => navigate('/crear-oferta')}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Plus className="mr-2" size={20} />
                  Crear Primera Oferta
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Material
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Precio Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ofertas.map((oferta) => (
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
                          <div className="text-sm text-gray-600">
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
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadgeColor(oferta.estado)}`}>
                            {oferta.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => navigate(`/oferta/${oferta.id}`)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <Eye size={18} className="inline mr-1" />
                            Ver
                          </button>
                          {oferta.estado === 'PENDIENTE' && (
                            <button 
                              onClick={() => handleEliminarOferta(oferta.id, oferta.estado)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={18} className="inline mr-1" />
                              Eliminar
                            </button>
                          )}
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

export default Dashboard;