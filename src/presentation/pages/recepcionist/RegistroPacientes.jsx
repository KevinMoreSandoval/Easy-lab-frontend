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
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const nuevoP = {
              dni: formData.get('dni'),
              nombre: formData.get('nombres') + ' ' + formData.get('apellidos'),
              correo: formData.get('correo'),
              telefono: formData.get('telefono')
            };
            const stored = JSON.parse(localStorage.getItem('easylab_pacientes') || '[]');
            stored.push(nuevoP);
            localStorage.setItem('easylab_pacientes', JSON.stringify(stored));
            alert('Paciente guardado exitosamente.');
            setMostrarForm(false);
          }}>
            <h3 className={styles.formTitle}>Datos del Nuevo Paciente</h3>
            <div className={styles.grid}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>DNI *</label>
                <input name="dni" type="text" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nombres *</label>
                <input name="nombres" type="text" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Apellidos *</label>
                <input name="apellidos" type="text" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Correo Electrónico *</label>
                <input name="correo" type="email" className={styles.input} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Teléfono</label>
                <input name="telefono" type="text" className={styles.input} />
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