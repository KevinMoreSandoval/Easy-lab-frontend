import { useState, useEffect } from 'react';
import styles from './historialOrdenes.module.css';
import { getOrdenes } from '../../../infrastructure/api/pacienteApi';

export default function HistorialOrdenes() {
  const [ordenDetalle, setOrdenDetalle] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    getOrdenes()
      .then(data => setOrdenes(data))
      .catch(err => {
        console.error("Error al cargar el historial de órdenes:", err);
      });
  }, []);

  const verDetalle = (orden) => {
    setOrdenDetalle(orden);
  };

  const cerrarModal = () => {
    setOrdenDetalle(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Historial de Órdenes</h2>
        <input type="text" placeholder="Buscar por paciente o fecha..." className={styles.searchInput} />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>N° Orden</th>
            <th>Paciente</th>
            <th>Pruebas</th>
            <th>Fecha Emisión</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map(orden => {
            const pruebasStr = Array.isArray(orden.pruebas) ? orden.pruebas.join(', ') : orden.pruebas;
            const estadoNorm = (orden.estado || '').toUpperCase();
            return (
              <tr key={orden.id || orden.numeroOrden}>
                <td className={styles.id}>{orden.numeroOrden || orden.id}</td>
                <td>{orden.paciente}</td>
                <td>{pruebasStr}</td>
                <td>{orden.fechaEmision || orden.fecha}</td>
                <td>
                  <span className={`${styles.badge} ${estadoNorm === 'PENDIENTE' ? styles.badgePendiente : estadoNorm === 'VIGENTE' ? styles.badgeVigente : styles.badgeAtendida}`}>
                    {orden.estado}
                  </span>
                </td>
                <td>
                  <button 
                    className={styles.btnAction} 
                    onClick={() => verDetalle({...orden, pruebas: pruebasStr, fecha: orden.fechaEmision || orden.fecha})}
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {ordenDetalle && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Detalle de Orden: {ordenDetalle.id}</h3>
            <div className={styles.modalContent}>
              <p><strong>Paciente:</strong> {ordenDetalle.paciente}</p>
              <p><strong>Pruebas:</strong> {ordenDetalle.pruebas}</p>
              <p><strong>Fecha Emisión:</strong> {ordenDetalle.fecha}</p>
              <p><strong>Estado:</strong> {ordenDetalle.estado}</p>
            </div>
            <button className={styles.btnClose} onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}