import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Componente guard que protege rutas según el rol del usuario.
 *
 * Uso:
 *   <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
 *     <Route path="dashboard" element={<AdminDashboard />} />
 *   </Route>
 *
 * Comportamiento:
 *  - Si el usuario no está autenticado → redirige a /login.
 *  - Si el usuario no tiene el rol requerido → redirige a /login.
 *  - Si todo está bien → renderiza los hijos (Outlet).
 */

import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Mientras se verifica la sesión, no renderizar nada
  if (isLoading) {
    return null;
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay roles permitidos y el usuario no tiene el rol correcto
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/login" replace />;
  }

  // El usuario está autenticado y tiene el rol correcto
  return <Outlet />;
};

export default ProtectedRoute;
