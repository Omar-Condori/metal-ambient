// src/components/dashboard/AdminPanel.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import GestionOfertas from '../admin/GestionOfertas';
import GestionUsuarios from '../admin/GestionUsuarios';
import GestionContenido from '../admin/GestionContenido'; // ✅ Agregado

import {
  Home,
  Package,
  Users,
  Settings,
  Image as ImageIcon
} from 'lucide-react';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState('ofertas');

  // Verificar permisos
  React.useEffect(() => {
    if (!isAdmin()) {
      toast.error('No tienes permisos para acceder a esta página');
      navigate('/dashboard');
    }
  }, [isAdmin, navigate]);

  const tabs = [
    { id: 'ofertas', nombre: 'Gestión de Ofertas', icono: Package },
    { id: 'usuarios', nombre: 'Gestión de Usuarios', icono: Users },
    { id: 'contenido', nombre: 'Contenido del Sitio', icono: ImageIcon },
    { id: 'configuracion', nombre: 'Configuración', icono: Settings },
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
                  Panel de Administración
                </h1>
                <p className="mt-2 text-gray-600">
                  Bienvenido, {user?.nombreCompleto}
                </p>
              </div>
              <button
                onClick={() => navigate('/')}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <Home className="mr-2" size={20} />
                Ir al Inicio
              </button>
            </div>
          </div>

          {/* Tabs de Navegación */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {tabs.map((tab) => {
                  const Icono = tab.icono;
                  const activa = tabActiva === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setTabActiva(tab.id)}
                      className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 transition ${
                        activa
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      <Icono className="mr-2" size={20} />
                      {tab.nombre}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Contenido de las Tabs */}
            <div className="p-6">
              {tabActiva === 'ofertas' && <GestionOfertas />}
              {tabActiva === 'usuarios' && <GestionUsuarios />}
              {tabActiva === 'contenido' && <GestionContenido />} {/* ✅ Reemplazado */}
              {tabActiva === 'configuracion' && (
                <div className="text-center py-12">
                  <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Configuración del Sistema
                  </h3>
                  <p className="text-gray-500">
                    Próximamente: Ajustes generales del sistema
                  </p>
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

export default AdminPanel;
