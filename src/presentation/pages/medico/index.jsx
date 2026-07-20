import { useState, useEffect } from 'react';
import styles from "./medicoDashboard.module.css";
import { getOrdenes } from '../../../infrastructure/api/pacienteApi';

export default function MedicoDashboard() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    getOrdenes()
      .then(data => setOrdenes(data))
      .catch(() => {
        setOrdenes([
          { id: 'ORD-001', paciente: 'Juan Carlos García López', pruebas: ['Hemograma Completo', 'Glucosa'], fechaEmision: '2026-06-11', estado: 'PENDIENTE' },
          { id: 'ORD-002', paciente: 'María Elena Rodríguez Díaz', pruebas: ['Perfil Lipídico'], fechaEmision: '2026-06-10', estado: 'VIGENTE' },
          { id: 'ORD-003', paciente: 'Pedro José Martínez Sánchez', pruebas: ['Examen General de Orina'], fechaEmision: '2026-06-08', estado: 'ATENDIDA' }
        ]);
      });
  }, []);

  const pendientes = ordenes.filter(o => (o.estado || '').toUpperCase() === 'PENDIENTE').length;
  const atendidas = ordenes.filter(o => (o.estado || '').toUpperCase() === 'ATENDIDA').length;
  const totalHoy = ordenes.length;

  return (
    <>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div>
            <div className={styles.statTitle}>Órdenes generadas hoy</div>
            <div className={styles.statValue}>{totalHoy}</div>
          </div>
          <div className={`${styles.statIcon} ${styles.iconBlue}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
        </div>

        <div className={styles.statCard}>
          <div>
            <div className={styles.statTitle}>Órdenes Pendientes</div>
            <div className={styles.statValue}>{pendientes}</div>
          </div>
          <div className={`${styles.statIcon} ${styles.iconOrange}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className={styles.statCard}>
          <div>
            <div className={styles.statTitle}>Órdenes Atendidas</div>
            <div className={styles.statValue}>{atendidas}</div>
          </div>
          <div className={`${styles.statIcon} ${styles.iconPurple}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: '24px', height: '24px' }}>
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
            {ordenes.slice(-5).reverse().map(orden => {
              const pruebasStr = Array.isArray(orden.pruebas) ? orden.pruebas.join(', ') : orden.pruebas;
              const estadoNorm = (orden.estado || '').toUpperCase();
              return (
                <tr key={orden.id || orden.numeroOrden}>
                  <td>{orden.paciente}</td>
                  <td>{pruebasStr}</td>
                  <td>{orden.fechaEmision || orden.fecha}</td>
                  <td>
                    <span className={`${styles.badge} ${estadoNorm === 'PENDIENTE' ? styles.badgePendiente : estadoNorm === 'VIGENTE' ? styles.badgeVigente : styles.badgeAtendida}`}>
                      {orden.estado}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}