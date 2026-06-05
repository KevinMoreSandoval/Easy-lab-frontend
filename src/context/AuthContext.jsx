import { createContext, useContext, useState, useEffect, useCallback } from "react";

/**
 * Contexto de autenticación.
 *
 * Provee a toda la aplicación:
 *  - user:       Datos del usuario autenticado (rol, nombre) o null.
 *  - token:      JWT almacenado en localStorage.
 *  - isLoading:  True mientras se verifica la sesión persistida.
 *  - login():    Guarda la sesión tras un login exitoso.
 *  - logout():   Limpia la sesión y redirige al login.
 */

const STORAGE_KEYS = {
  TOKEN: "easylab_token",
  USER: "easylab_user",
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Al montar, intenta restaurar la sesión desde localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        // Si el JSON está corrupto, limpiamos
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }

    setIsLoading(false);
  }, []);

  /**
   * Guarda la sesión tras un login exitoso.
   * @param {string} newToken       - JWT del backend
   * @param {Object} userData       - { rol, nombreCompleto }
   */
  const login = useCallback((newToken, userData) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  }, []);

  /**
   * Limpia la sesión completamente.
   */
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook para acceder al contexto de autenticación.
 * @returns {{ user, token, isLoading, isAuthenticated, login, logout }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }

  return context;
};
