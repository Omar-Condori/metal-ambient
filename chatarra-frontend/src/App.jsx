// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Componentes de Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Componentes de Páginas
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Dashboard
import Dashboard from './components/dashboard/Dashboard';
import AdminPanel from './components/dashboard/AdminPanel';

// Ofertas (NUEVOS)
import CrearOferta from './components/ofertas/CrearOferta';
import DetalleOferta from './components/ofertas/DetalleOferta';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App flex flex-col min-h-screen">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />

          <Routes>
            {/* ==================== RUTAS PÚBLICAS ==================== */}
            
            {/* Home */}
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Home />
                  </main>
                  <Footer />
                </>
              }
            />

            {/* Autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ==================== RUTAS PROTEGIDAS - VENDEDOR ==================== */}
            
            {/* Dashboard del Vendedor */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Crear Nueva Oferta */}
            <Route
              path="/crear-oferta"
              element={
                <ProtectedRoute>
                  <CrearOferta />
                </ProtectedRoute>
              }
            />

            {/* Ver Detalle de Oferta */}
            <Route
              path="/oferta/:id"
              element={
                <ProtectedRoute>
                  <DetalleOferta />
                </ProtectedRoute>
              }
            />

            {/* ==================== RUTAS PROTEGIDAS - ADMIN ==================== */}
            
            {/* Panel de Administración */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            {/* ==================== RUTA 404 ==================== */}
            
            {/* Redireccionar rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;