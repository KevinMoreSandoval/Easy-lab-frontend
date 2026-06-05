import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./recepcionDashboard.module.css";

/**
 * Dashboard de recepción.
 * Página principal tras el login exitoso como recepcionista.
 */
const RecepcionDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Panel de Recepción</h1>
        <div className={styles.userInfo}>
          <span className={styles.userName}>🏥 {user?.nombreCompleto}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.card}>
          <h2>👥 Registro de Pacientes</h2>
          <p>Registra nuevos pacientes en el sistema.</p>
        </div>
        <div className={styles.card}>
          <h2>📅 Gestión de Citas</h2>
          <p>Programa y administra las citas del laboratorio.</p>
        </div>
        <div className={styles.card}>
          <h2>📄 Recepción de Muestras</h2>
          <p>Registra la recepción de muestras de laboratorio.</p>
        </div>
      </main>
    </div>
  );
};

export default RecepcionDashboard;
