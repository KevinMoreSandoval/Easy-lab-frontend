import styles from "./admin.module.css";

export default function AdminDashboard() {
  const proximasReservas = [
    { paciente: "Juan Garcia", prueba: "Hemograma completo", fecha: "2026-07-03", estado: "Confirmada" },
    { paciente: "Maria Rodriguez", prueba: "Perfil lipidico", fecha: "2026-07-04", estado: "Programada" },
    { paciente: "Pedro Martinez", prueba: "Glucosa basal", fecha: "2026-07-04", estado: "Confirmada" },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Panel de Administracion</h1>
          <p className={styles.subtitle}>Gestion general de usuarios, pruebas y reservas.</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Usuarios activos</span>
          <strong className={styles.statValue}>24</strong>
        </article>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Pruebas disponibles</span>
          <strong className={styles.statValue}>18</strong>
        </article>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Reservas del mes</span>
          <strong className={styles.statValue}>126</strong>
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
            {proximasReservas.map((reserva) => (
              <tr key={`${reserva.paciente}-${reserva.fecha}`}>
                <td>{reserva.paciente}</td>
                <td>{reserva.prueba}</td>
                <td>{reserva.fecha}</td>
                <td><span className={styles.badge}>{reserva.estado}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
