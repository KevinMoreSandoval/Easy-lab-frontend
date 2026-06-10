import { useState } from 'react';
import styles from './historialOrdenes.module.css';

export default function HistorialOrdenes() {
  const [ordenDetalle, setOrdenDetalle] = useState(null);

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
          <tr>
            <td className={styles.id}>ORD-001</td>
            <td>Juan Carlos García López</td>
            <td>Hemograma Completo, Glucosa</td>
            <td>2026-06-11</td>
            <td><span className={`${styles.badge} ${styles.badgePendiente}`}>Pendiente</span></td>
            <td>
              <button 
                className={styles.btnAction} 
                onClick={() => verDetalle({ id: 'ORD-001', paciente: 'Juan Carlos García López', pruebas: 'Hemograma Completo, Glucosa', fecha: '2026-06-11', estado: 'Pendiente' })}
              >
                Ver detalle
              </button>
            </td>
          </tr>
          <tr>
            <td className={styles.id}>ORD-002</td>
            <td>María Elena Rodríguez Díaz</td>
            <td>Perfil Lipídico</td>
            <td>2026-06-10</td>
            <td><span className={`${styles.badge} ${styles.badgeVigente}`}>Vigente</span></td>
            <td>
              <button 
                className={styles.btnAction}
                onClick={() => verDetalle({ id: 'ORD-002', paciente: 'María Elena Rodríguez Díaz', pruebas: 'Perfil Lipídico', fecha: '2026-06-10', estado: 'Vigente' })}
              >
                Ver detalle
              </button>
            </td>
          </tr>
          <tr>
            <td className={styles.id}>ORD-003</td>
            <td>Pedro José Martínez Sánchez</td>
            <td>Examen General de Orina</td>
            <td>2026-06-08</td>
            <td><span className={`${styles.badge} ${styles.badgeAtendida}`}>Atendida</span></td>
            <td>
              <button 
                className={styles.btnAction}
                onClick={() => verDetalle({ id: 'ORD-003', paciente: 'Pedro José Martínez Sánchez', pruebas: 'Examen General de Orina', fecha: '2026-06-08', estado: 'Atendida' })}
              >
                Ver detalle
              </button>
            </td>
          </tr>
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