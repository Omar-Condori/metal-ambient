import React from 'react';
// Importamos los iconos necesarios de lucide-react basados en tu imagen
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Linkedin, 
  BookOpen,      // Para el Libro de Reclamaciones
  ShieldCheck,   // Para la Certificación ISO
  QrCode,        // Para el QR
  MessageCircle  // Para el botón flotante de WhatsApp
} from 'lucide-react';

const Footer = () => {
  return (
    // Usamos la etiqueta <footer> ya que este es el pie de página
    // 'relative' es para que el botón de WhatsApp (que es 'fixed') se posicione correctamente
    <footer className="relative">

      {/* --- SECCIÓN PRINCIPAL DEL FOOTER (BASADA EN TU IMAGEN) --- */}
      <section className="bg-gray-100 text-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">

            {/* Columna Izquierda: Formulario (Fondo Verde) */}
            <div className="lg:col-span-5 bg-green-600 rounded-2xl p-8 md:p-10 text-white shadow-xl">
              <h2 className="text-4xl font-bold mb-4">Contacto</h2>
              <p className="text-green-100 mb-8">Trabajemos juntos por un mañana mejor.</p>
              
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="footer-nombre-completo" className="sr-only">Nombre Completo</label>
                  <input
                    type="text"
                    name="footer-nombre-completo"
                    id="footer-nombre-completo"
                    required
                    className="w-full p-3 rounded-md bg-white/10 border border-transparent placeholder-green-100 text-white focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Nombre Completo*"
                  />
                </div>
                <div>
                  <label htmlFor="footer-celular" className="sr-only">Celular/WhatsApp</label>
                  <input
                    type="tel"
                    name="footer-celular"
                    id="footer-celular"
                    required
                    className="w-full p-3 rounded-md bg-white/10 border border-transparent placeholder-green-100 text-white focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Celular/WhatsApp*"
                  />
                </div>
                <div>
                  <label htmlFor="footer-mensaje" className="sr-only">Mensaje</label>
                  <textarea
                    name="footer-mensaje"
                    id="footer-mensaje"
                    rows="5"
                    className="w-full p-3 rounded-md bg-white/10 border border-transparent placeholder-green-100 text-white focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Mensaje"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-white text-green-700 font-bold py-3 px-6 rounded-full transition duration-300 hover:bg-gray-100 transform hover:scale-105"
                  >
                    ENVIAR
                  </button>
                </div>
              </form>
            </div>

            {/* Columna Derecha: Información y Mapa (Fondo Gris) */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                
                {/* Información de Contacto */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center">
                      <MapPin size={16} className="mr-2 text-green-600" />
                      Dirección
                    </h3>
                    <p className="text-gray-700 mt-1">Antigua Panamericana Sur KM 17.5 URB Pre Urbana Tipo Huerta, Mz. D Lote 9 - Atrequipa</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center">
                      <Phone size={16} className="mr-2 text-green-600" />
                      Teléfono
                    </h3>
                    <p className="text-gray-700 mt-1 hover:text-green-600">
                      <a href="tel:+51905455718">+51 960 899 657</a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase flex items-center">
                      <Mail size={16} className="mr-2 text-green-600" />
                      Correo Electrónico
                    </h3>
                    <p className="text-gray-700 mt-1 hover:text-green-600">
                      <a href="mailto:contacto@jodami.pe">omarcondor200@gmail.com</a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Nuestra Comunidad</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-gray-500 hover:text-green-600" aria-label="Facebook">
                        <Facebook size={24} />
                      </a>
                      <a href="#" className="text-gray-500 hover:text-green-600" aria-label="LinkedIn">
                        <Linkedin size={24} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Mapa (Placeholder) - Deberás pegar tu código de Google Maps aquí */}
                <div className="w-full h-64 md:h-full rounded-lg overflow-hidden shadow-lg bg-gray-300 flex items-center justify-center">
                  {/* Pega tu <iframe> de Google Maps aquí. Uso un placeholder: */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.641620822363!2d-76.97228968518578!3d-12.20697899136117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b9f7188b0099%3A0x69f9e2b9c7b80b72!2sCA%20JODAMI!5e0!3m2!1ses-419!2spe!4v1678886400000!5m2!1ses-419!2spe"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de CA JODAMI"
                  ></iframe>
                </div>
              </div>
              
              {/* Información Adicional (Libro, ISO, QR) */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <BookOpen size={40} className="mb-2 text-gray-700" />
                  <h4 className="font-semibold text-gray-700">Libro de Reclamaciones</h4>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  {/* Aquí puedes poner el <img> de tu logo ISO, usé un icono como placeholder */}
                  <ShieldCheck size={40} className="mb-2 text-gray-700" />
                  <h4 className="font-semibold text-gray-700">Certificación ISO 9001</h4>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  {/* Aquí puedes poner el <img> de tu QR, usé un icono como placeholder */}
                  <QrCode size={40} className="mb-2 text-gray-700" />
                  <h4 className="font-semibold text-gray-700">Verifícalo Aquí</h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BARRA DE COPYRIGHT (BASADA EN TU IMAGEN) --- */}
      <div className="bg-gray-100 text-gray-500 text-center text-sm pb-8 px-4">
        © 2025 Negocios y Representaciones Metal - Ambient E.I.R.L. | RUC: 20545933331. Sitio por Omar condori P
      </div>

      {/* --- BOTÓN FLOTANTE DE WHATSAPP (BASADO EN TU IMAGEN) --- */}
      <a 
        href="https://wa.me/51960899657" // Número de la imagen
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 z-50"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </footer>
  );
};

export default Footer;