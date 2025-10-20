// src/components/admin/GestionContenido.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Image as ImageIcon,
  Upload,
  Save,
  RefreshCw,
  Eye,
  Edit3,
  Trash2
} from 'lucide-react';

const GestionContenido = () => {
  const [seccionActiva, setSeccionActiva] = useState('hero');
  const [loading, setLoading] = useState(false);

  // Estado para las secciones del Home
  const [contenido, setContenido] = useState({
    hero: {
      titulo: 'Bienvenido a Chatarra La Cachina',
      subtitulo: 'Compra y venta de chatarra al mejor precio',
      imagenFondo: '/assets/hero-bg.jpg',
      botonTexto: 'Empezar Ahora'
    },
    caracteristicas: [
      {
        id: 1,
        titulo: 'Mejores Precios',
        descripcion: 'Ofrecemos los mejores precios del mercado',
        icono: '💰'
      },
      {
        id: 2,
        titulo: 'Servicio Rápido',
        descripcion: 'Recogemos tu chatarra en menos de 24 horas',
        icono: '⚡'
      },
      {
        id: 3,
        titulo: 'Confiable',
        descripcion: 'Más de 10 años en el mercado',
        icono: '✅'
      }
    ],
    contacto: {
      telefono: '+51 999 999 999',
      email: 'contacto@cachina.com',
      direccion: 'Av. Principal 123, Lima, Perú',
      horario: 'Lunes a Sábado: 8:00 AM - 6:00 PM'
    }
  });

  const secciones = [
    { id: 'hero', nombre: 'Banner Principal (Hero)', icono: ImageIcon },
    { id: 'caracteristicas', nombre: 'Características', icono: Edit3 },
    { id: 'contacto', nombre: 'Información de Contacto', icono: Edit3 },
  ];

  const handleGuardar = async () => {
    setLoading(true);
    try {
      // Aquí implementarías la llamada al backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulación
      toast.success('Contenido guardado exitosamente');
    } catch (error) {
      toast.error('Error al guardar contenido');
    } finally {
      setLoading(false);
    }
  };

  const handleSubirImagen = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Aquí implementarías la subida de imagen
      toast.info('Función de subida de imágenes en desarrollo');
    }
  };

  return (
    <div>
      {/* Selector de Sección */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Selecciona la sección a editar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {secciones.map((seccion) => {
            const Icono = seccion.icono;
            const activa = seccionActiva === seccion.id;
            return (
              <button
                key={seccion.id}
                onClick={() => setSeccionActiva(seccion.id)}
                className={`flex items-center justify-center px-6 py-4 rounded-lg border-2 transition ${
                  activa
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-blue-300'
                }`}
              >
                <Icono className="mr-3" size={24} />
                <span className="font-medium">{seccion.nombre}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor de Contenido */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        
        {/* Sección Hero */}
        {seccionActiva === 'hero' && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Editar Banner Principal
            </h3>
            
            <div className="space-y-6">
              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título Principal
                </label>
                <input
                  type="text"
                  value={contenido.hero.titulo}
                  onChange={(e) => setContenido({
                    ...contenido,
                    hero: { ...contenido.hero, titulo: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subtítulo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtítulo
                </label>
                <textarea
                  value={contenido.hero.subtitulo}
                  onChange={(e) => setContenido({
                    ...contenido,
                    hero: { ...contenido.hero, subtitulo: e.target.value }
                  })}
                  rows="2"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Texto del Botón */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texto del Botón
                </label>
                <input
                  type="text"
                  value={contenido.hero.botonTexto}
                  onChange={(e) => setContenido({
                    ...contenido,
                    hero: { ...contenido.hero, botonTexto: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Imagen de Fondo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagen de Fondo
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={contenido.hero.imagenFondo}
                      onChange={(e) => setContenido({
                        ...contenido,
                        hero: { ...contenido.hero, imagenFondo: e.target.value }
                      })}
                      placeholder="URL de la imagen o ruta local"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <label className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition flex items-center">
                    <Upload className="mr-2" size={20} />
                    Subir
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSubirImagen}
                      className="hidden"
                    />
                  </label>
                </div>
                {contenido.hero.imagenFondo && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                    <img
                      src={contenido.hero.imagenFondo}
                      alt="Preview"
                      className="h-48 w-full object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sección Características */}
        {seccionActiva === 'caracteristicas' && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Editar Características
            </h3>
            <div className="space-y-4">
              {contenido.caracteristicas.map((carac, index) => (
                <div key={carac.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icono
                      </label>
                      <input
                        type="text"
                        value={carac.icono}
                        onChange={(e) => {
                          const nuevas = [...contenido.caracteristicas];
                          nuevas[index].icono = e.target.value;
                          setContenido({ ...contenido, caracteristicas: nuevas });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título
                      </label>
                      <input
                        type="text"
                        value={carac.titulo}
                        onChange={(e) => {
                          const nuevas = [...contenido.caracteristicas];
                          nuevas[index].titulo = e.target.value;
                          setContenido({ ...contenido, caracteristicas: nuevas });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción
                      </label>
                      <input
                        type="text"
                        value={carac.descripcion}
                        onChange={(e) => {
                          const nuevas = [...contenido.caracteristicas];
                          nuevas[index].descripcion = e.target.value;
                          setContenido({ ...contenido, caracteristicas: nuevas });
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sección Contacto */}
        {seccionActiva === 'contacto' && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Editar Información de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="text"
                  value={contenido.contacto.telefono}
                  onChange={(e) => setContenido({
                    ...contenido,
                    contacto: { ...contenido.contacto, telefono: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={contenido.contacto.email}
                  onChange={(e) => setContenido({
                    ...contenido,
                    contacto: { ...contenido.contacto, email: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  value={contenido.contacto.direccion}
                  onChange={(e) => setContenido({
                    ...contenido,
                    contacto: { ...contenido.contacto, direccion: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horario de Atención
                </label>
                <input
                  type="text"
                  value={contenido.contacto.horario}
                  onChange={(e) => setContenido({
                    ...contenido,
                    contacto: { ...contenido.contacto, horario: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botones de Acción */}
      <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          <RefreshCw className="mr-2" size={20} />
          Descartar Cambios
        </button>
        
        <div className="flex gap-3">
          <button
            onClick={() => window.open('/', '_blank')}
            className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            <Eye className="mr-2" size={20} />
            Vista Previa
          </button>
          <button
            onClick={handleGuardar}
            disabled={loading}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin mr-2" size={20} />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2" size={20} />
                Guardar Cambios
              </>
            )}
          </button>
        </div>
      </div>

      {/* Nota informativa */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> Los cambios se guardarán en la base de datos y se reflejarán inmediatamente en el sitio público.
          Esta funcionalidad está en desarrollo y próximamente incluirá subida de imágenes al servidor.
        </p>
      </div>
    </div>
  );
};

export default GestionContenido;