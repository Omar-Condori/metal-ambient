import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- CORRECCIÓN DE RUTAS ---
// Asumiendo una estructura de proyecto estándar, esta es la ruta más probable
// desde 'src/components/' para encontrar 'context' y 'assets'
import { useAuth } from '../context/AuthContext'; 
// --- ICONOS ACTUALIZADOS ---
// Se agregaron los iconos necesarios para las nuevas secciones:
// Trash2, Wind, Building, Ship, Wrench
import { 
  ArrowRight, CheckCircle, Shield, Zap, Leaf, Truck, HardHat, 
  ChevronLeft, ChevronRight as ChevronRightIcon, 
  Trash2, Wind, Building, Ship, Wrench 
} from 'lucide-react';

import foto001 from '../assets/image/foto009.png';
import foto002 from '../assets/image/foto007.png';
import foto003 from '../assets/image/foto003.png';
import foto004 from '../assets/image/foto008.png';
import foto005 from '../assets/image/foto005.png';
import foto006 from '../assets/image/foto006.png';



const Home = () => {
  const { isAuthenticated } = useAuth();
  const carouselImages = [foto001, foto002, foto003];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Lógica para el carrusel automático (sin cambios)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000); // Cambia de imagen cada 5 segundos
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  // El resto del componente permanece visualmente y lógicamente idéntico
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* 1. Hero Section con Carrusel (Sección Original) */}
      <section className="relative h-[70vh] md:h-screen w-full overflow-hidden">
        {carouselImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Nuestras Soluciones para un Mañana Mejor
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mb-10 drop-shadow-md">
            Transformamos desafíos en oportunidades, contribuyendo a un mundo donde el reciclaje es el pilar de un futuro más prometedor.
          </p>
          
          {/* --- LA LÓGICA DE AUTENTICACIÓN ESTÁ INTACTA AQUÍ --- */}
          {!isAuthenticated ? (
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-full transition duration-300 transform hover:scale-105 flex items-center">
                Únete ahora <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/login" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full transition duration-300">
                Iniciar Sesión
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-full transition duration-300 transform hover:scale-105">
              Ir al Dashboard <ArrowRight className="ml-2" size={20} />
            </Link>
          )}
        </div>
        {/* Controles del carrusel */}
        <button onClick={prevSlide} className="absolute top-1/2 left-4 z-20 p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transform -translate-y-1/2"><ChevronLeft size={28} /></button>
        <button onClick={nextSlide} className="absolute top-1/2 right-4 z-20 p-2 bg-white/20 rounded-full text-white hover:bg-white/40 transform -translate-y-1/2"><ChevronRightIcon size={28} /></button>
      </section>

      {/* ============================================================
      INICIO DE SECCIONES AGREGADAS
      ============================================================
      */}

      {/* 2. NUEVA SECCIÓN - Propósito (Basada en Imagen 1) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          {/* Columna de Texto */}
          <div>
            <span className="text-sm bg-green-100 text-green-700 py-1 px-3 rounded-full font-semibold">NUESTRO PROPÓSITO</span>
            <h2 className="text-4xl font-extrabold text-gray-900 mt-4 mb-6">
              Expertos en la Compra y Venta de Chatarra
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Maximizamos la recuperación de recursos valiosos de chatarra, minimizando el impacto negativo para el ambiente y creando un mundo más limpio para futuras generaciones.
            </p>
            <p className="text-gray-600 mb-6">
              Nuestra misión es contribuir a la protección del ambiente mediante el transporte, la transformación y procesamiento eficiente de chatarra. Buscamos reducir la cantidad de desechos metálicos y fomentar la reutilización de materiales.
            </p>
            <p className="text-gray-600">
              Cada alianza que establecemos está impregnada de la convicción de que el progreso económico debe ir de la mano con la preservación del medio ambiente.
            </p>
          </div>
          {/* Columna de Imágenes (Adaptada de la Imagen 1) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-lg overflow-hidden shadow-lg col-span-2">
              <img src={foto004} alt="Compra de chatarra" className="w-full h-48 object-cover"/>
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-white text-lg font-bold">Compra de chatarra ferrosa y metálica</h3>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src={foto005} alt="Transporte de chatarra" className="w-full h-48 object-cover"/>
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-white text-lg font-bold">Carga y Transportes</h3>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img src={foto006} alt="Procesamiento de chatarra" className="w-full h-48 object-cover"/>
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <h3 className="text-white text-lg font-bold">Procesamiento Eficiente</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NUEVA SECCIÓN - Impacto (Basada en Imagen 2) */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
            Conoce el impacto del reciclaje de chatarra
            <br />
            en el <span className="text-green-600">ambiente</span> y la <span className="text-green-600">economía</span>.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Item 1 */}
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 bg-green-600 p-5 rounded-full text-white mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Menos Desperdicio, Más Sostenibilidad</h3>
              <p className="text-gray-600">
                Reducimos los residuos metálicos para un planeta más limpio.
              </p>
            </div>
            {/* Item 2 */}
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 bg-green-600 p-5 rounded-full text-white mb-4">
                <Wind size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aire y Agua Puros: Reciclaje que Cuida</h3>
              <p className="text-gray-600">
                Contribuimos a la reducción de la contaminación del aire y agua.
              </p>
            </div>
            {/* Item 3 */}
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 bg-green-600 p-5 rounded-full text-white mb-4">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ahorro para un futuro sostenible</h3>
              <p className="text-gray-600">
                Reciclar chatarra ahorra energía, agua y valiosas materias primas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NUEVA SECCIÓN - Economía Circular (Basada en Imagen 3) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm bg-green-100 text-green-700 py-1 px-3 rounded-full font-semibold">Nuestro granito de arena</span>
          <h2 className="text-4xl font-extrabold text-gray-900 mt-4 mb-6 max-w-4xl mx-auto">
            Convertimos cada pieza de <span className="text-green-600">chatarra</span> en un eslabón valioso de la <span className="text-green-600">economía circular</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Nuestro compromiso con el reciclaje no solo es nuestro trabajo, sino nuestra pasión por un futuro sostenible.
          </p>
          
          {/* Contenedor de iconos */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {/* Icono 1 */}
            <div className="flex flex-col items-center w-32">
              <div className="bg-green-100 text-green-700 p-5 rounded-full mb-3">
                <Trash2 size={36} />
              </div>
              <h3 className="font-bold text-gray-900">Chatarra Doméstica</h3>
            </div>
            {/* Icono 2 */}
            <div className="flex flex-col items-center w-32">
              <div className="bg-green-100 text-green-700 p-5 rounded-full mb-3">
                <Building size={36} />
              </div>
              <h3 className="font-bold text-gray-900">Chatarra Industrial</h3>
            </div>
            {/* Icono 3 */}
            <div className="flex flex-col items-center w-32">
              <div className="bg-green-100 text-green-700 p-5 rounded-full mb-3">
                <Ship size={36} />
              </div>
              <h3 className="font-bold text-gray-900">Chatarra Marítima</h3>
            </div>
            {/* Icono 4 */}
            <div className="flex flex-col items-center w-32">
              <div className="bg-green-100 text-green-700 p-5 rounded-full mb-3">
                <Truck size={36} />
              </div>
              <h3 className="font-bold text-gray-900">Chatarra Minera</h3>
            </div>
            {/* Icono 5 */}
            <div className="flex flex-col items-center w-32">
              <div className="bg-green-100 text-green-700 p-5 rounded-full mb-3">
                <Wrench size={36} />
              </div>
              <h3 className="font-bold text-gray-900">Chatarra en general</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
      FIN DE SECCIONES AGREGADAS
      ============================================================
      */}

      {/* 5. Sección "Compra de Chatarra Ferrosa" (Sección Original) */}
      <section className="py-20 bg-gray-50"> {/* Color de fondo original */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
             <img src={foto004} alt="Chatarra Ferrosa" className="rounded-full w-3/4 h-auto aspect-square object-cover shadow-lg" />
             <div className="absolute -bottom-10 -right-10 bg-white p-4 rounded-full shadow-2xl">
                <Leaf size={40} className="text-green-500" />
             </div>
          </div>
          <div className="bg-green-600 p-10 rounded-2xl text-white shadow-lg">
            <span className="text-sm bg-white/20 text-white py-1 px-3 rounded-full">Compras</span>
            <h2 className="text-4xl font-bold mt-4 mb-6">Compra de Chatarra Ferrosa</h2>
            <p className="text-green-100 mb-4">
              Comercializamos chatarra ferrosa y metales con el fin de reciclarlos. Nuestra experiencia de más de 20 años en el rubro nos respalda.
            </p>
            <p className="text-green-100">
              Nuestras relaciones se basan en la confianza, transparencia y en negociaciones ganar-ganar.
            </p>
          </div>
        </div>
      </section>
      
      {/* 6. Sección "Elige ser Proveedor" (Sección Original) */}
      <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
              <div className="bg-gray-100 p-10 rounded-2xl">
                  <span className="text-sm text-green-700 bg-green-100 py-1 px-3 rounded-full">Proveedor</span>
                  <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-6">Elige ser Proveedor <span className="text-green-600">Metal Ambient</span></h2>
                  <p className="text-gray-600">
                      Sé parte activa de nuestra visión sostenible. Buscamos proveedores que deseen contribuir al desarrollo. ¡Haz de tu chatarra un agente de cambio!
                  </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                      <div className="inline-block p-4 bg-green-100 rounded-full mb-3"><Shield size={28} className="text-green-600" /></div>
                      <h3 className="font-bold text-lg">Confianza y Transparencia</h3>
                      <p className="text-sm text-gray-600">Nuestras relaciones se basan en la confianza.</p>
                  </div>
                  <div className="text-center">
                      <div className="inline-block p-4 bg-green-100 rounded-full mb-3"><HardHat size={28} className="text-green-600" /></div>
                      <h3 className="font-bold text-lg">Te damos Soporte</h3>
                      <p className="text-sm text-gray-600">Brindamos el soporte que necesitas.</p>
                  </div>
                  <div className="text-center">
                      <div className="inline-block p-4 bg-green-100 rounded-full mb-3"><CheckCircle size={28} className="text-green-600" /></div>
                      <h3 className="font-bold text-lg">Ganamos Todos</h3>
                      <p className="text-sm text-gray-600">Generamos negociaciones ganar-ganar.</p>
                  </div>
                  <div className="text-center">
                      <div className="inline-block p-4 bg-green-100 rounded-full mb-3"><Truck size={28} className="text-green-600" /></div>
                      <h3 className="font-bold text-lg">Respaldo Logístico</h3>
                      <p className="text-sm text-gray-600">Nuestras compras están respaldadas por nuestra flota.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* 7. Sección "Únete a nuestra visión" (Sección Original) */}
      <section className="py-20 bg-gray-50"> {/* Color de fondo original */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Únete a Nuestra Visión Sostenible</h2>
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative rounded-2xl overflow-hidden text-white p-10 flex flex-col justify-end min-h-[400px] transform hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${foto005})` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="relative z-10">
                          <span className="text-sm bg-white/20 py-1 px-3 rounded-full">Centros de Acopio</span>
                          <h3 className="text-3xl font-bold mt-4 mb-2">¿Tienes un Centro de Acopio?</h3>
                          <p>Vamos a tu centro de acopio y compramos tu chatarra.</p>
                      </div>
                  </div>
                   <div className="relative rounded-2xl overflow-hidden text-white p-10 flex flex-col justify-end min-h-[400px] transform hover:scale-105 transition-transform duration-300">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${foto006})` }}></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="relative z-10">
                          <span className="text-sm bg-white/20 py-1 px-3 rounded-full">Industrias</span>
                          <h3 className="text-3xl font-bold mt-4 mb-2">¿Tu empresa genera chatarra?</h3>
                          <p>Vamos a tu empresa y compramos tus residuos metálicos.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Home;