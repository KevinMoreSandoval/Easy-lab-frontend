import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./presentation/pages/auth";
import ProtectedRoute from "./presentation/guards/ProtectedRoute";
import AdminDashboard from "./presentation/pages/admin";
import MedicoDashboard from "./presentation/pages/medico";
import MedicoLayout from './presentation/pages/medico/MedicoLayout';
import CrearOrden from './presentation/pages/medico/CrearOrden';
import HistorialOrdenes from './presentation/pages/medico/HistorialOrdenes';

import RecepcionDashboard from "./presentation/pages/recepcionist";

import RegistroPacientes from './presentation/pages/recepcionist/RegistroPacientes';
import ConfirmacionLlegada from './presentation/pages/recepcionist/ConfirmacionLlegada';
import CitasMedicas from './presentation/pages/recepcionist/CitasMedicas';
import RecepcionLayout from './presentation/pages/recepcionist/RecepcionLayout';

/**
 * Configuración principal de rutas de la aplicación.
 *
 * Estructura:
 *  /login                    → Página de login (pública)
 *  /admin/dashboard          → Dashboard Administración (protegida, rol ADMIN)
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

        {/* Rutas protegidas: Administración */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["MEDICO"]} />}>
          <Route element={<MedicoLayout />}>
            <Route path="/medico/dashboard" element={<MedicoDashboard />} />
            <Route path="/medico/crear-orden" element={<CrearOrden />} />
            <Route path="/medico/historial-ordenes" element={<HistorialOrdenes />} />
          </Route>
        </Route>

        {/* Rutas protegidas: Recepción */}
        <Route element={<ProtectedRoute allowedRoles={["RECEPCION"]} />}>
          <Route path="/recepcion/dashboard" element={<RecepcionDashboard />} />
        </Route>


        {/* Rutas protegidas: Recepción */}
        <Route element={<ProtectedRoute allowedRoles={["RECEPCION"]} />}>
          <Route element={<RecepcionLayout />}>
            <Route path="/recepcion/dashboard" element={<RecepcionDashboard />} />
            <Route path="/recepcion/registro-pacientes" element={<RegistroPacientes />} />
            <Route path="/recepcion/confirmacion-llegada" element={<ConfirmacionLlegada />} />
            <Route path="/recepcion/citas-medicas" element={<CitasMedicas />} />
          </Route>
        </Route>




        {/* Redirecciones */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
