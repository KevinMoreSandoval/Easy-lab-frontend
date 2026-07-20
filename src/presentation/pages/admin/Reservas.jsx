import { useMemo, useState } from "react";
import styles from "./pruebasLaboratorio.module.css";

const initialReservations = [
  { id: 1, paciente: "Juan Garcia", prueba: "Hemograma completo", fecha: "2026-07-03", hora: "09:00", estado: "Confirmada" },
  { id: 2, paciente: "Maria Rodriguez", prueba: "Perfil lipídico", fecha: "2026-07-15", hora: "10:30", estado: "Programada" },
  { id: 3, paciente: "Pedro Martinez", prueba: "Glucosa basal", fecha: "2026-08-02", hora: "08:30", estado: "Programada" },
  { id: 4, paciente: "Ana Soto", prueba: "Prueba de embarazo", fecha: "2026-07-20", hora: "11:00", estado: "Completada" },
  { id: 5, paciente: "Luis Gomez", prueba: "Cultivo de orina", fecha: "2026-07-28", hora: "07:30", estado: "Cancelada" },
];

export default function Reservas() {
  const [reservas] = useState(initialReservations);
  
  // Por defecto, mostrar el mes actual
  const [filtro, setFiltro] = useState({ 
    fechaInicio: "2026-07-01", 
    fechaFin: "2026-07-31" 
  });

  const reservasFiltradas = useMemo(() => {
    return reservas.filter((reserva) => {
      const cumpleInicio = filtro.fechaInicio ? reserva.fecha >= filtro.fechaInicio : true;
      const cumpleFin = filtro.fechaFin ? reserva.fecha <= filtro.fechaFin : true;
      return cumpleInicio && cumpleFin;
    });
  }, [reservas, filtro]);

  return (
    <section className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Control de Reservas</h1>
          <p className={styles.subtitle}>Supervisa y controla las reservas programadas filtrando por rango de fechas.</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.filterBar}>
          <h2 className={styles.cardTitle} style={{ margin: 0 }}>Historial y Próximas Reservas</h2>
          <div className={styles.filters} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <label className={styles.field} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <span>Desde:</span>
              <input 
                type="date" 
                value={filtro.fechaInicio} 
                onChange={(e) => setFiltro({ ...filtro, fechaInicio: e.target.value })} 
                style={{ width: 'auto', minWidth: '140px' }}
              />
            </label>
            <label className={styles.field} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <span>Hasta:</span>
              <input 
                type="date" 
                value={filtro.fechaFin} 
                onChange={(e) => setFiltro({ ...filtro, fechaFin: e.target.value })} 
                style={{ width: 'auto', minWidth: '140px' }}
              />
            </label>
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Prueba</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservasFiltradas.length > 0 ? (
                reservasFiltradas.map((reserva) => (
                  <tr key={reserva.id}>
                    <td>{reserva.paciente}</td>
                    <td>{reserva.prueba}</td>
                    <td>{reserva.fecha}</td>
                    <td>{reserva.hora}</td>
                    <td>
                      <span className={styles.badge} style={{
                        background: reserva.estado === 'Cancelada' ? 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)' :
                                    reserva.estado === 'Programada' ? 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)' :
                                    reserva.estado === 'Confirmada' ? 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)' :
                                    'linear-gradient(135deg, #ccfbf1 0%, #a7f3d0 100%)',
                        color: reserva.estado === 'Cancelada' ? '#e11d48' :
                               reserva.estado === 'Programada' ? '#0284c7' :
                               reserva.estado === 'Confirmada' ? '#ca8a04' :
                               '#047857'
                      }}>
                        {reserva.estado}
                      </span>
                    </td>
                    <td>
                      <button className={styles.btnSecondary} style={{ padding: '6px 12px', fontSize: '12px', minHeight: '32px' }}>
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                    No se encontraron reservas en el rango de fechas seleccionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
