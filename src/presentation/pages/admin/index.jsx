import { useState, useEffect } from "react";
import { getDashboardStats } from "../../../infrastructure/api/dashboardApi";
import styles from "./admin.module.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    usuariosActivos: 0,
    pruebasDisponibles: 0,
    reservasDelMes: 0,
    proximasReservas: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setError(null);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err.error || "Error al cargar las estadísticas");
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Panel de Administracion</h1>
          <p className={styles.subtitle}>Gestion general de usuarios, pruebas y reservas.</p>
        </div>
      </div>

      {error && (
        <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '6px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <div className={styles.statsGrid}>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Usuarios activos</span>
          <strong className={styles.statValue}>
            {isLoading ? "..." : stats.usuariosActivos}
          </strong>
        </article>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Pruebas disponibles</span>
          <strong className={styles.statValue}>
            {isLoading ? "..." : stats.pruebasDisponibles}
          </strong>
        </article>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Reservas del mes</span>
          <strong className={styles.statValue}>
            {isLoading ? "..." : stats.reservasDelMes}
          </strong>
        </article>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Proximas reservas</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Prueba</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>Cargando...</td>
              </tr>
            ) : stats.proximasReservas && stats.proximasReservas.length > 0 ? (
              stats.proximasReservas.map((reserva, index) => (
                <tr key={index}>
                  <td>{reserva.paciente}</td>
                  <td>{reserva.prueba}</td>
                  <td>{reserva.fecha}</td>
                  <td><span className={styles.badge}>{reserva.estado}</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '1rem', color: '#64748b' }}>
                  No hay reservas próximas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
