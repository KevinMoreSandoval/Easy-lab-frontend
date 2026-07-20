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
 * Intenta parsear el cuerpo de la respuesta como JSON de forma segura.
 * Si el cuerpo está vacío o no es JSON válido, devuelve null.
 * Evita el error "Unexpected end of JSON input" cuando el backend
 * responde con 401/403 sin body (ej: filtro de Spring Security).
 *
 * @param {Response} response
 * @returns {Promise<Object|null>}
 */
const safeJson = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;

  const text = await response.text();
  if (!text || text.trim() === "") return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

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

  const data = await safeJson(response);

  if (!response.ok) {
    // Si backend manda el mensaje en data.message o data.error, lo mostramos
    throw { 
      status: response.status, 
      error: data?.message || data?.error || `Error ${response.status} del servidor.` 
    };
  }

  return data;
};
