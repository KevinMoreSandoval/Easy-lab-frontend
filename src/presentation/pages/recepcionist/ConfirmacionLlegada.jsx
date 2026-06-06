// ConfirmacionLlegada.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './confirmacionLlegada.module.css';

export default function ConfirmacionLlegada() {
  const [dni, setDni] = useState('');
  const [paciente, setPaciente] = useState(null);
  const navigate = useNavigate();

  const buscarPaciente = () => {
    if (dni.length > 0) {
      setPaciente({
        nombre: "Juan Carlos García López",
        dni: dni,
        horaCita: "09:00 AM",
        medico: "Dr. Roberto Sánchez",
        pruebas: ["Hemograma Completo", "Glucosa"]
      });
    }
  };

  const confirmarLlegada = () => {
    alert("Asistencia registrada. Generando Orden Impresa (PDF) con código QR...");
    setPaciente(null);
    setDni('');
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerTop}>
        <div className={styles.header}>
          <h1 className={styles.title}>Confirmación de Llegada</h1>
          <p className={styles.subtitle}>Registra la llegada de pacientes al laboratorio</p>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Buscar Paciente</h2>
        <p className={styles.cardSubtitle}>Ingresa el DNI del paciente para confirmar su llegada</p>
        
        <div className={styles.searchGroup}>
          <input 
            type="text" 
            placeholder="Buscar por DNI" 
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className={styles.input} 
          />
          <button onClick={buscarPaciente} className={styles.btnSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.searchIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            Buscar
          </button>
        </div>

        {paciente && (
          <div className={styles.resultWrapper}>
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <div>
                  <h3 className={styles.patientName}>{paciente.nombre}</h3>
                  <p className={styles.patientDni}>DNI: {paciente.dni}</p>
                </div>
                <span className={styles.badge}>Cita Pendiente</span>
              </div>
              
              <div className={styles.infoGrid}>
                <div>
                  <span className={styles.infoLabel}>Médico asignado</span>
                  <span className={styles.infoValue}>{paciente.medico}</span>
                </div>
                <div>
                  <span className={styles.infoLabel}>Hora programada</span>
                  <span className={styles.infoValue}>{paciente.horaCita}</span>
                </div>
                <div className={styles.infoGridFull}>
                  <span className={styles.infoLabel}>Pruebas solicitadas</span>
                  <span className={styles.infoValue}>{paciente.pruebas.join(', ')}</span>
                </div>
              </div>

              <button onClick={confirmarLlegada} className={styles.btnConfirm}>
                Confirmar Llegada e Imprimir Orden
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}