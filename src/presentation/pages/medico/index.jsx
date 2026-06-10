import styles from "./medicoDashboard.module.css";

export default function MedicoDashboard() {
  return (
    <>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div>
            <div className={styles.statTitle}>Órdenes generadas hoy</div>
            <div className={styles.statValue}>12</div>
          </div>
          <div className={`${styles.statIcon} ${styles.iconBlue}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '24px', height: '24px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div>
            <div className={styles.statTitle}>Órdenes Pendientes</div>
            <div className={styles.statValue}>5</div>
          </div>
          <div className={`${styles.statIcon} ${styles.iconOrange}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '24px', height: '24px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className={styles.statCard}>
          <div>
            <div className={styles.statTitle}>Órdenes Atendidas</div>
            <div className={styles.statValue}>24</div>
          </div>
          <div className={`${styles.statIcon} ${styles.iconPurple}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '24px', height: '24px'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <h3 className={styles.tableTitle}>Órdenes Médicas Recientes</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Pruebas Solicitadas</th>
              <th>Fecha Autorizada</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Juan Carlos García López</td>
              <td>Hemograma Completo, Glucosa</td>
              <td>2026-06-11</td>
              <td><span className={`${styles.badge} ${styles.badgePendiente}`}>Pendiente</span></td>
            </tr>
            <tr>
              <td>María Elena Rodríguez Díaz</td>
              <td>Perfil Lipídico, Triglicéridos</td>
              <td>2026-06-10</td>
              <td><span className={`${styles.badge} ${styles.badgeVigente}`}>Vigente</span></td>
            </tr>
            <tr>
              <td>Pedro José Martínez Sánchez</td>
              <td>Examen General de Orina</td>
              <td>2026-06-08</td>
              <td><span className={`${styles.badge} ${styles.badgeAtendida}`}>Atendida</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}