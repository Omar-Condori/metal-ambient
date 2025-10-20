// src/components/admin/GestionUsuarios.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import adminService from '../../services/adminService';
import {
  Users,
  Shield,
  UserCog,
  Check,
  X,
  Loader2,
  RefreshCw,
  Search,
  Calendar
} from 'lucide-react';

const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [modalRol, setModalRol] = useState({ open: false, usuario: null });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await adminService.obtenerTodosLosUsuarios();
      setUsuarios(data);
    } catch (error) {
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarRol = async (userId, nuevoRol) => {
    try {
      await adminService.cambiarRolUsuario(userId, nuevoRol);
      toast.success(`Rol actualizado a ${nuevoRol} exitosamente`);
      setModalRol({ open: false, usuario: null });
      cargarUsuarios();
    } catch (error) {
      toast.error(error.mensaje || 'Error al cambiar rol');
    }
  };

  const handleToggleEstado = async (userId, estadoActual) => {
    const nuevoEstado = !estadoActual;
    const mensaje = nuevoEstado ? 'activar' : 'desactivar';
    
    if (window.confirm(`¿Estás seguro de ${mensaje} este usuario?`)) {
      try {
        await adminService.toggleEstadoUsuario(userId, nuevoEstado);
        toast.success(`Usuario ${mensaje}do correctamente`);
        cargarUsuarios();
      } catch (error) {
        toast.error(error.mensaje || 'Error al cambiar estado');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRolBadgeColor = (rol) => {
    return rol === 'ADMIN' 
      ? 'bg-purple-100 text-purple-800 border-purple-200'
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Estadísticas
  const stats = {
    total: usuarios.length,
    admins: usuarios.filter(u => u.rol === 'ADMIN').length,
    vendedores: usuarios.filter(u => u.rol === 'VENDEDOR').length,
    activos: usuarios.filter(u => u.activo).length,
    inactivos: usuarios.filter(u => !u.activo).length
  };

  return (
    <div>
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="text-gray-400" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Admins</p>
              <p className="text-2xl font-bold text-purple-600">{stats.admins}</p>
            </div>
            <Shield className="text-purple-400" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Vendedores</p>
              <p className="text-2xl font-bold text-blue-600">{stats.vendedores}</p>
            </div>
            <UserCog className="text-blue-400" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Activos</p>
              <p className="text-2xl font-bold text-green-600">{stats.activos}</p>
            </div>
            <Check className="text-green-400" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactivos</p>
              <p className="text-2xl font-bold text-red-600">{stats.inactivos}</p>
            </div>
            <X className="text-red-400" size={32} />
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y acciones */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre o email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={cargarUsuarios}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw className="mr-2" size={20} />
            Actualizar
          </button>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          Mostrando <span className="font-semibold">{usuariosFiltrados.length}</span> de{' '}
          <span className="font-semibold">{usuarios.length}</span> usuarios
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Cargando usuarios...</p>
          </div>
        ) : usuariosFiltrados.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron usuarios
            </h3>
            <p className="text-gray-500">
              {busqueda ? 'Intenta ajustar tu búsqueda' : 'Aún no hay usuarios registrados'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Registro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        #{usuario.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {usuario.nombreCompleto.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {usuario.nombreCompleto}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{usuario.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getRolBadgeColor(usuario.rol)}`}>
                        {usuario.rol === 'ADMIN' ? (
                          <>
                            <Shield className="mr-1" size={14} />
                            Admin
                          </>
                        ) : (
                          <>
                            <UserCog className="mr-1" size={14} />
                            Vendedor
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        usuario.activo 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {usuario.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="mr-1" size={14} />
                        {formatDate(usuario.fechaRegistro)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        {/* Cambiar Rol */}
                        <button
                          onClick={() => setModalRol({ open: true, usuario })}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                          title="Cambiar rol"
                        >
                          Cambiar Rol
                        </button>
                        
                        {/* Activar/Desactivar */}
                        <button
                          onClick={() => handleToggleEstado(usuario.id, usuario.activo)}
                          className={`font-medium ${
                            usuario.activo 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {usuario.activo ? 'Desactivar' : 'Activar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Cambiar Rol */}
      {modalRol.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Cambiar Rol de Usuario
            </h3>
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Usuario:</p>
              <p className="text-lg font-semibold text-gray-900">
                {modalRol.usuario?.nombreCompleto}
              </p>
              <p className="text-sm text-gray-500">{modalRol.usuario?.email}</p>
              <p className="mt-3 text-gray-600">Rol actual:</p>
              <span className={`inline-block mt-1 px-3 py-1 text-sm font-semibold rounded-full border ${getRolBadgeColor(modalRol.usuario?.rol)}`}>
                {modalRol.usuario?.rol}
              </span>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 font-medium mb-3">Selecciona el nuevo rol:</p>
              <div className="space-y-3">
                <button
                  onClick={() => handleCambiarRol(modalRol.usuario?.id, 'VENDEDOR')}
                  disabled={modalRol.usuario?.rol === 'VENDEDOR'}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition ${
                    modalRol.usuario?.rol === 'VENDEDOR'
                      ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
                      : 'bg-blue-50 border-blue-300 hover:bg-blue-100'
                  }`}
                >
                  <div className="flex items-center">
                    <UserCog className="text-blue-600 mr-3" size={24} />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Vendedor</p>
                      <p className="text-sm text-gray-600">Puede crear y gestionar sus ofertas</p>
                    </div>
                  </div>
                  {modalRol.usuario?.rol === 'VENDEDOR' && (
                    <Check className="text-blue-600" size={24} />
                  )}
                </button>

                <button
                  onClick={() => handleCambiarRol(modalRol.usuario?.id, 'ADMIN')}
                  disabled={modalRol.usuario?.rol === 'ADMIN'}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition ${
                    modalRol.usuario?.rol === 'ADMIN'
                      ? 'bg-gray-100 border-gray-300 cursor-not-allowed'
                      : 'bg-purple-50 border-purple-300 hover:bg-purple-100'
                  }`}
                >
                  <div className="flex items-center">
                    <Shield className="text-purple-600 mr-3" size={24} />
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Administrador</p>
                      <p className="text-sm text-gray-600">Acceso completo al sistema</p>
                    </div>
                  </div>
                  {modalRol.usuario?.rol === 'ADMIN' && (
                    <Check className="text-purple-600" size={24} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setModalRol({ open: false, usuario: null })}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuarios;