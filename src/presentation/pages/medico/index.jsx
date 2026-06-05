import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./medicoDashboard.module.css";

/**
 * Dashboard del médico.
 * Página principal tras el login exitoso como médico.
 */
const MedicoDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Panel Médico</h1>
        <div className={styles.userInfo}>
          <span className={styles.userName}>🩺 {user?.nombreCompleto}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.card}>
          <h2>📋 Órdenes de Laboratorio</h2>
          <p>Gestiona las órdenes de análisis clínicos.</p>
        </div>
        <div className={styles.card}>
          <h2>📊 Resultados</h2>
          <p>Revisa los resultados de tus pacientes.</p>
        </div>
        <div className={styles.card}>
          <h2>👥 Mis Pacientes</h2>
          <p>Consulta la lista de pacientes asignados.</p>
        </div>
      </main>
    </div>
  );
};

export default MedicoDashboard;
