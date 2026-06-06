import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './registroPacientes.module.css';

export default function RegistroPacientes() {
  const [mostrarForm, setMostrarForm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.headerTop}>
        <div className={styles.header}>
          <h1 className={styles.title}>Registro de Pacientes</h1>
          <p className={styles.subtitle}>Gestión de pacientes del laboratorio</p>
        </div>
      </div>

      <div className={styles.card}>
        {!mostrarForm ? (
          <button 
            onClick={() => setMostrarForm(true)}
            className={styles.btnPrimary}
          >
            + Nuevo Paciente
          </button>
        ) : (
          <form>
            <h3 className={styles.formTitle}>Datos del Nuevo Paciente</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>DNI *</label>
                <input type="text" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nombres *</label>
                <input type="text" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Apellidos *</label>
                <input type="text" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Correo Electrónico *</label>
                <input type="email" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Teléfono</label>
                <input type="text" className={styles.input} />
              </div>
            </div>
            
            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.btnPrimary}>
                Guardar y Generar Credenciales
              </button>
              <button type="button" onClick={() => setMostrarForm(false)} className={styles.btnSecondary}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}