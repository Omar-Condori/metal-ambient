// src/components/ofertas/CrearOferta.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import {
  Package,
  DollarSign,
  MapPin,
  FileText,
  Image,
  ArrowLeft,
  Loader2,
  AlertCircle
} from 'lucide-react';

const CrearOferta = () => {
  const navigate = useNavigate();
  const { crearOferta } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    tipoMaterial: '',
    cantidad: '',
    precioUnitario: '',
    descripcion: '',
    ubicacion: '',
    imagenUrl: ''
  });

  const tiposMaterial = [
    'HIERRO',
    'ACERO',
    'COBRE',
    'ALUMINIO',
    'BRONCE',
    'PLOMO',
    'ZINC',
    'LATON',
    'INOXIDABLE',
    'OTRO'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularPrecioTotal = () => {
    const cantidad = parseFloat(formData.cantidad) || 0;
    const precioUnitario = parseFloat(formData.precioUnitario) || 0;
    return (cantidad * precioUnitario).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones
    if (!formData.tipoMaterial) {
      toast.error('Selecciona un tipo de material');
      setLoading(false);
      return;
    }

    if (!formData.cantidad || parseFloat(formData.cantidad) <= 0) {
      toast.error('Ingresa una cantidad válida');
      setLoading(false);
      return;
    }

    if (!formData.precioUnitario || parseFloat(formData.precioUnitario) <= 0) {
      toast.error('Ingresa un precio unitario válido');
      setLoading(false);
      return;
    }

    if (!formData.ubicacion) {
      toast.error('Ingresa la ubicación del material');
      setLoading(false);
      return;
    }

    try {
      const ofertaData = {
        tipoMaterial: formData.tipoMaterial,
        cantidad: parseFloat(formData.cantidad),
        precioUnitario: parseFloat(formData.precioUnitario),
        descripcion: formData.descripcion || null,
        ubicacion: formData.ubicacion,
        imagenUrl: formData.imagenUrl || null
      };

      await crearOferta(ofertaData);
      toast.success('¡Oferta creada exitosamente!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al crear oferta:', error);
      toast.error(error.mensaje || 'Error al crear la oferta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="mr-2" size={20} />
              Volver al Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              Crear Nueva Oferta
            </h1>
            <p className="mt-2 text-gray-600">
              Completa los datos de tu oferta de chatarra
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
            
            {/* Tipo de Material */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="inline mr-2" size={18} />
                Tipo de Material *
              </label>
              <select
                name="tipoMaterial"
                value={formData.tipoMaterial}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Selecciona un material</option>
                {tiposMaterial.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            {/* Cantidad y Precio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad (kg) *
                </label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  placeholder="Ej: 150.50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="inline mr-2" size={18} />
                  Precio Unitario (S/. por kg) *
                </label>
                <input
                  type="number"
                  name="precioUnitario"
                  value={formData.precioUnitario}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  placeholder="Ej: 8.50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Precio Total (calculado) */}
            {formData.cantidad && formData.precioUnitario && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Precio Total:
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    S/. {calcularPrecioTotal()}
                  </span>
                </div>
              </div>
            )}

            {/* Ubicación */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline mr-2" size={18} />
                Ubicación *
              </label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                required
                placeholder="Ej: Lima, Perú"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline mr-2" size={18} />
                Descripción (opcional)
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                placeholder="Describe el estado del material, origen, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            {/* URL de Imagen */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Image className="inline mr-2" size={18} />
                URL de Imagen (opcional)
              </label>
              <input
                type="url"
                name="imagenUrl"
                value={formData.imagenUrl}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {formData.imagenUrl && (
                <div className="mt-3">
                  <img
                    src={formData.imagenUrl}
                    alt="Preview"
                    className="h-40 w-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      toast.error('URL de imagen inválida');
                    }}
                  />
                </div>
              )}
            </div>

            {/* Nota informativa */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start">
              <AlertCircle className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="text-sm text-blue-800">
                  <strong>Importante:</strong> Tu oferta será revisada por un administrador antes de ser publicada.
                  Recibirás una notificación cuando sea aprobada.
                </p>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Creando...
                  </>
                ) : (
                  <>
                    <Package className="mr-2" size={20} />
                    Crear Oferta
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default CrearOferta;