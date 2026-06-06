import { useAuth } from "../../../context/AuthContext";
import Sidebar from "../../components/sidebar";
import { recepcionNavItems } from "./recepcionNavItems";
import styles from "./recepcionDashboard.module.css";

export default function RecepcionDashboard() {
  const { user } = useAuth();

  return (
    <div className={styles.layout}>
      <Sidebar items={recepcionNavItems} ariaLabel="Navegación de recepción" />

      <main className={styles.mainContent}>
        <div className={styles.headerTop}>
          <span style={{ marginRight: '16px', fontWeight: '500', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '20px', height: '20px', color: '#64748b' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            {user?.nombreCompleto || "Ana Torres Mendoza"}
          </span>
         
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div>
              <div className={styles.statTitle}>Pacientes registrados hoy</div>
              <div className={styles.statValue}>8</div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconBlue}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
          </div>

          <div className={styles.statCard}>
            <div>
              <div className={styles.statTitle}>Citas programadas hoy</div>
              <div className={styles.statValue}>3</div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconPurple}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
          </div>

          <div className={styles.statCard}>
            <div>
              <div className={styles.statTitle}>Pacientes pendientes de llegada</div>
              <div className={styles.statValue}>2</div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconOrange}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className={styles.statCard}>
            <div>
              <div className={styles.statTitle}>Pacientes confirmados</div>
              <div className={styles.statValue}>1</div>
            </div>
            <div className={`${styles.statIcon} ${styles.iconGreen}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.tableCard}>
          <h3 className={styles.tableTitle}>Próximas citas</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Médico</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Carlos García López</td>
                <td>2026-06-05</td>
                <td>09:00</td>
                <td>Dr. Roberto Sánchez</td>
                <td><span className={`${styles.badge} ${styles.badgePrimary}`}>Programada</span></td>
              </tr>
              <tr>
                <td>María Elena Rodríguez Díaz</td>
                <td>2026-06-05</td>
                <td>10:30</td>
                <td>Dra. Ana López</td>
                <td><span className={`${styles.badge} ${styles.badgeSuccess}`}>Confirmada</span></td>
              </tr>
              <tr>
                <td>Pedro José Martínez Sánchez</td>
                <td>2026-06-05</td>
                <td>11:00</td>
                <td>Dr. Carlos Ruiz</td>
                <td><span className={`${styles.badge} ${styles.badgePrimary}`}>Programada</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
