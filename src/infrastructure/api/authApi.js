/**
 * Cliente API base para comunicarse con el backend Spring Boot.
 *
 * Centraliza la configuración de las peticiones HTTP:
 *  - Base URL del backend (a través del proxy de Vite en desarrollo).
 *  - Headers comunes (Content-Type, Authorization).
 *  - Manejo de errores estandarizado.
 */

const API_BASE_URL = "/api";

/**
 * Realiza una petición HTTP al backend.
 *
 * @param {string}  endpoint  - Ruta relativa (ej: "/auth/login")
 * @param {Object}  options   - Opciones de fetch (method, body, etc.)
 * @returns {Promise<Object>} - Respuesta parseada como JSON
 * @throws {Object}           - { status, error } si la petición falla
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem("easylab_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw { status: response.status, error: data.error || "Error del servidor." };
  }

  return data;
};
