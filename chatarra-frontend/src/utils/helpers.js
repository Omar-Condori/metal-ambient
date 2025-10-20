/**
 * Utilidades y funciones helper para la aplicación
 */

/**
 * Formatea una fecha al formato español
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha) => {
  if (!fecha) return '';
  
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formatea una fecha con hora
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} Fecha y hora formateada
 */
export const formatearFechaHora = (fecha) => {
  if (!fecha) return '';
  
  const date = new Date(fecha);
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Valida si un email tiene formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida si una contraseña cumple los requisitos mínimos
 * @param {string} password - Contraseña a validar
 * @returns {object} { valido: boolean, mensaje: string }
 */
export const validarPassword = (password) => {
  if (!password) {
    return { valido: false, mensaje: 'La contraseña es obligatoria' };
  }
  
  if (password.length < 6) {
    return { valido: false, mensaje: 'La contraseña debe tener al menos 6 caracteres' };
  }
  
  return { valido: true, mensaje: '' };
};

/**
 * Capitaliza la primera letra de un string
 * @param {string} str - String a capitalizar
 * @returns {string}
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Trunca un texto a una longitud específica
 * @param {string} text - Texto a truncar
 * @param {number} length - Longitud máxima
 * @returns {string}
 */
export const truncateText = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Formatea un número a formato de moneda (soles peruanos)
 * @param {number} amount - Monto a formatear
 * @returns {string}
 */
export const formatearMoneda = (amount) => {
  if (amount === null || amount === undefined) return 'S/ 0.00';
  
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN'
  }).format(amount);
};

/**
 * Genera un color aleatorio en formato hexadecimal
 * @returns {string}
 */
export const generarColorAleatorio = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

/**
 * Verifica si un objeto está vacío
 * @param {object} obj - Objeto a verificar
 * @returns {boolean}
 */
export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Debounce para funciones (útil para búsquedas)
 * @param {function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {function}
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Genera iniciales de un nombre
 * @param {string} name - Nombre completo
 * @returns {string} Iniciales (máximo 2 letras)
 */
export const getInitials = (name) => {
  if (!name) return '';
  
  const names = name.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

/**
 * Calcula el tiempo transcurrido desde una fecha
 * @param {Date|string} date - Fecha
 * @returns {string} Tiempo transcurrido
 */
export const tiempoTranscurrido = (date) => {
  if (!date) return '';
  
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffSeconds < 60) {
    return 'Hace un momento';
  } else if (diffMinutes < 60) {
    return `Hace ${diffMinutes} minuto${diffMinutes !== 1 ? 's' : ''}`;
  } else if (diffHours < 24) {
    return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
  } else if (diffDays < 30) {
    return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
  } else {
    return formatearFecha(date);
  }
};

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>}
 */
export const copiarAlPortapapeles = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Error al copiar al portapapeles:', err);
    return false;
  }
};

/**
 * Genera un slug a partir de un string
 * @param {string} text - Texto a convertir
 * @returns {string} Slug generado
 */
export const generateSlug = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[áàäâ]/g, 'a')
    .replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i')
    .replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * Valida si un archivo tiene una extensión permitida
 * @param {File} file - Archivo a validar
 * @param {Array<string>} allowedExtensions - Extensiones permitidas (ej: ['jpg', 'png'])
 * @returns {boolean}
 */
export const validarExtensionArchivo = (file, allowedExtensions = []) => {
  if (!file || !file.name) return false;
  
  const extension = file.name.split('.').pop().toLowerCase();
  return allowedExtensions.includes(extension);
};

/**
 * Convierte bytes a formato legible
 * @param {number} bytes - Tamaño en bytes
 * @param {number} decimals - Número de decimales
 * @returns {string}
 */
export const formatearTamanoArchivo = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Genera un ID único
 * @returns {string}
 */
export const generarIdUnico = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Ordena un array de objetos por una propiedad
 * @param {Array} array - Array a ordenar
 * @param {string} key - Propiedad por la cual ordenar
 * @param {string} order - 'asc' o 'desc'
 * @returns {Array}
 */
export const ordenarPorPropiedad = (array, key, order = 'asc') => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Agrupa un array de objetos por una propiedad
 * @param {Array} array - Array a agrupar
 * @param {string} key - Propiedad por la cual agrupar
 * @returns {Object}
 */
export const agruparPorPropiedad = (array, key) => {
  return array.reduce((result, item) => {
    (result[item[key]] = result[item[key]] || []).push(item);
    return result;
  }, {});
};

/**
 * Elimina elementos duplicados de un array
 * @param {Array} array - Array con posibles duplicados
 * @returns {Array}
 */
export const eliminarDuplicados = (array) => {
  return [...new Set(array)];
};

/**
 * Mezcla aleatoriamente los elementos de un array
 * @param {Array} array - Array a mezclar
 * @returns {Array}
 */
export const mezclarArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Obtiene un valor de un objeto usando una ruta de string
 * @param {Object} obj - Objeto
 * @param {string} path - Ruta (ej: 'user.address.city')
 * @param {*} defaultValue - Valor por defecto si no se encuentra
 * @returns {*}
 */
export const obtenerValorAnidado = (obj, path, defaultValue = undefined) => {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

/**
 * Valida si una URL es válida
 * @param {string} url - URL a validar
 * @returns {boolean}
 */
export const validarURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Genera un rango de números
 * @param {number} start - Número inicial
 * @param {number} end - Número final
 * @param {number} step - Incremento
 * @returns {Array<number>}
 */
export const generarRango = (start, end, step = 1) => {
  const result = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
};

/**
 * Calcula el porcentaje
 * @param {number} valor - Valor actual
 * @param {number} total - Valor total
 * @returns {number}
 */
export const calcularPorcentaje = (valor, total) => {
  if (total === 0) return 0;
  return Math.round((valor / total) * 100);
};

/**
 * Formatea un número de teléfono
 * @param {string} phone - Número de teléfono
 * @returns {string}
 */
export const formatearTelefono = (phone) => {
  if (!phone) return '';
  
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
  
  if (match) {
    return match[1] + ' ' + match[2] + ' ' + match[3];
  }
  
  return phone;
};

/**
 * Obtiene parámetros de la URL
 * @param {string} param - Nombre del parámetro
 * @returns {string|null}
 */
export const obtenerParametroURL = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

/**
 * Convierte un objeto a query string
 * @param {Object} obj - Objeto a convertir
 * @returns {string}
 */
export const objetoAQueryString = (obj) => {
  return Object.keys(obj)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&');
};

/**
 * Valida si el navegador soporta localStorage
 * @returns {boolean}
 */
export const soportaLocalStorage = () => {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Guarda datos en localStorage de forma segura
 * @param {string} key - Clave
 * @param {*} value - Valor a guardar
 * @returns {boolean}
 */
export const guardarEnLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error('Error al guardar en localStorage:', err);
    return false;
  }
};

/**
 * Obtiene datos de localStorage de forma segura
 * @param {string} key - Clave
 * @param {*} defaultValue - Valor por defecto
 * @returns {*}
 */
export const obtenerDeLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.error('Error al obtener de localStorage:', err);
    return defaultValue;
  }
};

/**
 * Detecta el dispositivo (mobile, tablet, desktop)
 * @returns {string}
 */
export const detectarDispositivo = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
};

/**
 * Espera un tiempo específico (Promise)
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise}
 */
export const esperar = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Genera un color basado en un string (siempre el mismo color para el mismo string)
 * @param {string} str - String
 * @returns {string} Color en formato hexadecimal
 */
export const stringAColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

export default {
  formatearFecha,
  formatearFechaHora,
  validarEmail,
  validarPassword,
  capitalize,
  truncateText,
  formatearMoneda,
  generarColorAleatorio,
  isObjectEmpty,
  debounce,
  getInitials,
  tiempoTranscurrido,
  copiarAlPortapapeles,
  generateSlug,
  validarExtensionArchivo,
  formatearTamanoArchivo,
  generarIdUnico,
  ordenarPorPropiedad,
  agruparPorPropiedad,
  eliminarDuplicados,
  mezclarArray,
  obtenerValorAnidado,
  validarURL,
  generarRango,
  calcularPorcentaje,
  formatearTelefono,
  obtenerParametroURL,
  objetoAQueryString,
  soportaLocalStorage,
  guardarEnLocalStorage,
  obtenerDeLocalStorage,
  detectarDispositivo,
  esperar,
  stringAColor
};