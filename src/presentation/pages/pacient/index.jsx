import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./pacienteDashboard.module.css";

/**
 * Dashboard del paciente.
 * Página principal tras el login exitoso como paciente.
 */
const PacienteDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Panel del Paciente</h1>
        <div className={styles.userInfo}>
          <span className={styles.userName}>👋 Hola, {user?.nombreCompleto}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.card}>
          <h2>📋 Mis Resultados</h2>
          <p>Consulta tus resultados de laboratorio aquí.</p>
        </div>
        <div className={styles.card}>
          <h2>📅 Mis Citas</h2>
          <p>Gestiona tus citas programadas.</p>
        </div>
        <div className={styles.card}>
          <h2>👤 Mi Perfil</h2>
          <p>Actualiza tu información personal.</p>
        </div>
      </main>
    </div>
  );
};

export default PacienteDashboard;
