

import { useState, useEffect } from 'react';
import styles from "./recepcionDashboard.module.css";

export default function RecepcionDashboard() {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('easylab_citas');
    if (saved) {
      setCitas(JSON.parse(saved));
    } else {
      setCitas([
        { id: 1, paciente: "Juan Carlos García López", medico: "Dr. Roberto Sánchez", fecha: "2026-06-05", hora: "09:00", estado: "Programada" },
        { id: 2, paciente: "María Elena Rodríguez Díaz", medico: "Dra. Ana López", fecha: "2026-06-05", hora: "10:30", estado: "Confirmada" },
        { id: 3, paciente: "Pedro José Martínez Sánchez", medico: "Dr. Carlos Ruiz", fecha: "2026-06-05", hora: "11:00", estado: "Programada" }
      ]);
    }
  }, []);

  const programadasHoy = citas.filter(c => c.estado === 'Programada').length;
  const confirmadas = citas.filter(c => c.estado === 'Confirmada').length;

  return (
    <div className={styles.layout}>

      <main className={styles.mainContent}>
       
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
              <div className={styles.statValue}>{programadasHoy}</div>
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
              <div className={styles.statValue}>{confirmadas}</div>
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
              {citas.map(cita => (
                <tr key={cita.id}>
                  <td>{cita.paciente}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>{cita.medico}</td>
                  <td>
                    <span className={`${styles.badge} ${cita.estado === 'Confirmada' ? styles.badgeSuccess : styles.badgePrimary}`}>
                      {cita.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
