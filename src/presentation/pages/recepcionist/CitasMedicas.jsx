// CitasMedicas.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './citasMedicas.module.css';

export default function CitasMedicas() {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const [citas, setCitas] = useState([
    { id: 1, paciente: "Juan Carlos García López", medico: "Dr. Roberto Sánchez", fecha: "2026-06-05", hora: "09:00", estado: "Programada" },
    { id: 2, paciente: "María Elena Rodríguez Díaz", medico: "Dra. Ana López", fecha: "2026-06-05", hora: "10:30", estado: "Confirmada" },
    { id: 3, paciente: "Pedro José Martínez Sánchez", medico: "Dr. Carlos Ruiz", fecha: "2026-06-05", hora: "11:00", estado: "Programada" }
  ]);

  const [nuevoPaciente, setNuevoPaciente] = useState('');
  const [nuevoMedico, setNuevoMedico] = useState('Dr. Roberto Sánchez');
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHora, setNuevaHora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const nuevaCita = {
      id: citas.length + 1,
      paciente: nuevoPaciente,
      medico: nuevoMedico,
      fecha: nuevaFecha,
      hora: nuevaHora,
      estado: "Programada"
    };

    setCitas([...citas, nuevaCita]);
    setMostrarFormulario(false);

    setNuevoPaciente('');
    setNuevaFecha('');
    setNuevaHora('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.headerContent}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>Citas Médicas</h1>
            <p className={styles.subtitle}>Gestión de citas y consultas médicas</p>
          </div>
          {!mostrarFormulario && (
            <button 
              className={styles.btnNew} 
              onClick={() => setMostrarFormulario(true)}
            >
              + Nueva Cita
            </button>
          )}
        </div>
      </div>

      <div className={styles.card}>
        {mostrarFormulario ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h3 className={styles.tableTitle}>Agendar Nueva Cita Médica</h3>
            
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nombre del Paciente *</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  value={nuevoPaciente} 
                  onChange={(e) => setNuevoPaciente(e.target.value)} 
                  required 
                  placeholder="Ej. Carlos Mendoza"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Médico Asignado *</label>
                <select 
                  className={styles.select} 
                  value={nuevoMedico} 
                  onChange={(e) => setNuevoMedico(e.target.value)}
                >
                  <option value="Dr. Roberto Sánchez">Dr. Roberto Sánchez</option>
                  <option value="Dra. Ana López">Dra. Ana López</option>
                  <option value="Dr. Carlos Ruiz">Dr. Carlos Ruiz</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Fecha *</label>
                <input 
                  type="date" 
                  className={styles.input} 
                  value={nuevaFecha} 
                  onChange={(e) => setNuevaFecha(e.target.value)} 
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Hora *</label>
                <input 
                  type="time" 
                  className={styles.input} 
                  value={nuevaHora} 
                  onChange={(e) => setNuevaHora(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.btnNew}>
                Guardar Cita
              </button>
              <button 
                type="button" 
                className={styles.btnSecondary} 
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3 className={styles.tableTitle}>Lista de Citas</h3>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Médico</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita) => (
                    <tr key={cita.id}>
                      <td>{cita.paciente}</td>
                      <td>{cita.medico}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
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
          </>
        )}
      </div>
    </div>
  );
}