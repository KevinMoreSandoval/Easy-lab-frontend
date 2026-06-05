import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./presentation/pages/auth";
import ProtectedRoute from "./presentation/guards/ProtectedRoute";
import PacienteDashboard from "./presentation/pages/pacient";
import MedicoDashboard from "./presentation/pages/medico";
import RecepcionDashboard from "./presentation/pages/recepcionist";

/**
 * Configuración principal de rutas de la aplicación.
 *
 * Estructura:
 *  /login                    → Página de login (pública)
 *  /paciente/dashboard       → Dashboard Paciente (protegida, rol PACIENTE)
 *  /medico/dashboard         → Dashboard Médico (protegida, rol MEDICO)
 *  /recepcion/dashboard      → Dashboard Recepción (protegida, rol RECEPCION)
 *  /                         → Redirige a /login
 *  *                         → Redirige a /login (ruta no encontrada)
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas: Paciente */}
        <Route element={<ProtectedRoute allowedRoles={["PACIENTE"]} />}>
          <Route path="/paciente/dashboard" element={<PacienteDashboard />} />
        </Route>

        {/* Rutas protegidas: Médico */}
        <Route element={<ProtectedRoute allowedRoles={["MEDICO"]} />}>
          <Route path="/medico/dashboard" element={<MedicoDashboard />} />
        </Route>

        {/* Rutas protegidas: Recepción */}
        <Route element={<ProtectedRoute allowedRoles={["RECEPCION"]} />}>
          <Route path="/recepcion/dashboard" element={<RecepcionDashboard />} />
        </Route>

        {/* Redirecciones */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
