// src/components/ofertas/DetalleOferta.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ofertaService from '../../services/ofertaService';
import {
  ArrowLeft,
  Package,
  DollarSign,
  MapPin,
  Calendar,
  User,
  Loader2,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Image as ImageIcon
} from 'lucide-react';

const DetalleOferta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, eliminarOferta } = useAuth();
  const [oferta, setOferta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarOferta();
  }, [id]);

  const cargarOferta = async () => {
    try {
      const data = await ofertaService.obtenerOfertaPorId(id);
      setOferta(data);
    } catch (error) {
      toast.error('Error al cargar la oferta');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    if (oferta.estado !== 'PENDIENTE') {
      toast.error('Solo puedes eliminar ofertas en estado PENDIENTE');
      return;
    }

    if (window.confirm('¿Estás seguro de eliminar esta oferta?')) {
      try {
        await eliminarOferta(id);
        toast.success('Oferta eliminada correctamente');
        navigate('/dashboard');
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstadoConfig = (estado) => {
    const configs = {
      'PENDIENTE': {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
        text: 'Pendiente de Aprobación'
      },
      'APROBADA': {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        text: 'Aprobada'
      },
      'RECHAZADA': {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: XCircle,
        text: 'Rechazada'
      },
      'VENDIDA': {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: CheckCircle,
        text: 'Vendida'
      }
    };
    return configs[estado] || configs['PENDIENTE'];
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="animate-spin h-12 w-12 text-green-600" />
        </div>
        <Footer />
      </>
    );
  }

  if (!oferta) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              Oferta no encontrada
            </h3>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const estadoConfig = getEstadoConfig(oferta.estado);
  const EstadoIcon = estadoConfig.icon;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="mr-2" size={20} />
              Volver al Dashboard
            </button>
          </div>

          {/* Card Principal */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            
            {/* Imagen */}
            {oferta.imagenUrl ? (
              <img
                src={oferta.imagenUrl}
                alt={oferta.tipoMaterial}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <ImageIcon className="text-gray-400" size={64} />
              </div>
            )}

            {/* Contenido */}
            <div className="p-8">
              
              {/* Estado */}
              <div className="mb-6">
                <span className={`inline-flex items-center px-4 py-2 rounded-full border ${estadoConfig.color} font-medium`}>
                  <EstadoIcon className="mr-2" size={18} />
                  {estadoConfig.text}
                </span>
              </div>

              {/* Título */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {oferta.tipoMaterial}
              </h1>

              {/* Grid de Información */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                
                {/* Cantidad */}
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <Package className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cantidad</p>
                    <p className="text-xl font-bold text-gray-900">
                      {oferta.cantidad} kg
                    </p>
                  </div>
                </div>

                {/* Precio Unitario */}
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <DollarSign className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Precio Unitario</p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(oferta.precioUnitario)} / kg
                    </p>
                  </div>
                </div>

                {/* Precio Total */}
                <div className="flex items-start">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <DollarSign className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Precio Total</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatCurrency(oferta.precioTotal)}
                    </p>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <MapPin className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ubicación</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {oferta.ubicacion}
                    </p>
                  </div>
                </div>

                {/* Fecha de Creación */}
                <div className="flex items-start">
                  <div className="bg-gray-100 p-3 rounded-lg mr-4">
                    <Calendar className="text-gray-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha de Publicación</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(oferta.fechaCreacion)}
                    </p>
                  </div>
                </div>

                {/* Vendedor */}
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <User className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vendedor</p>
                    <p className="text-sm font-medium text-gray-900">
                      {oferta.vendedor?.nombreCompleto || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              {oferta.descripcion && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Descripción
                  </h3>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {oferta.descripcion}
                  </p>
                </div>
              )}

              {/* Acciones */}
              {user?.id === oferta.vendedor?.id && oferta.estado === 'PENDIENTE' && (
                <div className="border-t pt-6">
                  <button
                    onClick={handleEliminar}
                    className="w-full md:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center"
                  >
                    <Trash2 className="mr-2" size={20} />
                    Eliminar Oferta
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetalleOferta;