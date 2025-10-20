import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Menu, X, Home, UserPlus, LogIn, Shield, ChevronDown } from 'lucide-react';
import logo from '../../assets/image/logo002.png'; // ✅ Logo

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPricesDropdown, setShowPricesDropdown] = useState(false); // ✅ Estado del dropdown

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* ✅ Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </Link>
          </div>

          {/* ✅ Navegación de escritorio */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="mr-1" size={18} />
              Inicio
            </Link>

            <Link
              to="/nosotros"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/nosotros') ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Nosotros
            </Link>

            <Link
              to="/servicios"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/servicios') ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Servicios
            </Link>

            {/* ✅ Dropdown de Precios corregido y estable */}
            <div
              className="relative"
              onMouseEnter={() => setShowPricesDropdown(true)}
              onMouseLeave={() => setShowPricesDropdown(false)}
            >
              <button
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/precios') ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Precios
                <ChevronDown size={16} className="ml-1" />
              </button>

              {/* ✅ El menú se mantiene visible mientras el puntero esté dentro del contenedor */}
              <div
                className={`absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-200 ease-in-out ${
                  showPricesDropdown
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <Link
                  to="/precios/fierro"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors"
                >
                  Fierro
                </Link>
                <Link
                  to="/precios/caucho"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors"
                >
                  Caucho
                </Link>
                <Link
                  to="/precios/metal"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors"
                >
                  Metal
                </Link>
                <Link
                  to="/precios/papel"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors"
                >
                  Papel
                </Link>
                <Link
                  to="/precios/botella"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700 transition-colors"
                >
                  Botella
                </Link>
              </div>
            </div>

            {/* ✅ Sección autenticación */}
            {isAuthenticated() && (
              <>
                {isAdmin() ? (
                  <Link
                    to="/admin"
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/admin')
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Shield className="mr-1" size={18} />
                    Panel Admin
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                      isActive('/dashboard')
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="mr-1" size={18} />
                    Dashboard
                  </Link>
                )}

                <div className="flex items-center text-gray-700 bg-gray-100 px-3 py-2 rounded-md">
                  <User className="mr-2" size={18} />
                  <span className="text-sm font-medium">{user?.nombreCompleto}</span>
                  <span
                    className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                      user?.rol === 'ADMIN'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {user?.rol}
                  </span>
                </div>

                <button onClick={logout} className="btn-secondary flex items-center text-sm">
                  <LogOut className="mr-2" size={18} />
                  Salir
                </button>
              </>
            )}

            {!isAuthenticated() && (
              <>
                <Link to="/login" className="btn-secondary flex items-center text-sm">
                  <LogIn className="mr-2" size={18} />
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn-primary flex items-center text-sm">
                  <UserPlus className="mr-2" size={18} />
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* ✅ Botón menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Navegación móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                isActive('/')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700'
              }`}
            >
              <Home className="mr-2" size={20} />
              Inicio
            </Link>

            <Link
              to="/nosotros"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Nosotros
            </Link>

            <Link
              to="/servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              Servicios
            </Link>

            {/* ✅ Dropdown móvil de Precios */}
            <div>
              <button
                onClick={() => setShowPricesDropdown(!showPricesDropdown)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <span>Precios</span>
                <ChevronDown
                  size={18}
                  className={`${showPricesDropdown ? 'rotate-180' : ''} transition-transform`}
                />
              </button>
              {showPricesDropdown && (
                <div className="ml-4 space-y-1">
                  <Link
                    to="/precios/fierro"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700"
                  >
                    Fierro
                  </Link>
                  <Link
                    to="/precios/caucho"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700"
                  >
                    Caucho
                  </Link>
                  <Link
                    to="/precios/metal"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700"
                  >
                    Metal
                  </Link>
                  <Link
                    to="/precios/papel"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700"
                  >
                    Papel
                  </Link>
                  <Link
                    to="/precios/botella"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-700"
                  >
                    Botella
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
