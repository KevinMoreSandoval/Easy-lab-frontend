import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./medicoDashboard.module.css";
import { getOrdenes } from '../../../infrastructure/api/pacienteApi';
import { getCitasPendientesMedico } from '../../../infrastructure/api/citaApi';

export default function MedicoDashboard() {
  const [ordenes, setOrdenes] = useState([]);
  const [citasPendientes, setCitasPendientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar órdenes
    getOrdenes()
      .then(data => setOrdenes(data))
      .catch(console.error);

    // Cargar citas pendientes del médico
    getCitasPendientesMedico()
      .then(data => setCitasPendientes(data))
      .catch(console.error);
  }, []);

  const pendientes = citasPendientes.length; // Citas pendientes
  const atendidas = ordenes.length; // Órdenes generadas
  const totalHoy = ordenes.filter(o => o.fechaEmision === new Date().toISOString().split('T')[0]).length;

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
            <div className={styles.statTitle}>Citas Pendientes</div>
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

      <div className={styles.tableCard} style={{ marginBottom: '20px' }}>
        <h3 className={styles.tableTitle}>Mis Citas Pendientes</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>DNI</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {citasPendientes.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>No tienes citas pendientes.</td></tr>
            ) : (
              citasPendientes.map(cita => (
                <tr key={cita.id}>
                  <td>{cita.pacienteNombre}</td>
                  <td>{cita.pacienteDni}</td>
                  <td>{cita.fecha}</td>
                  <td>{cita.hora}</td>
                  <td>
                    <button 
                      className={styles.btnAction} 
                      onClick={() => navigate('/medico/crear-orden', { state: { pacienteDni: cita.pacienteDni, citaId: cita.id } })}
                    >
                      Atender
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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