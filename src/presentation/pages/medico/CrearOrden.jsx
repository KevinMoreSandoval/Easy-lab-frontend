// src/presentation/pages/medico/CrearOrden.jsx
import styles from './crearOrden.module.css';

export default function CrearOrden() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear Orden Médica</h2>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>Paciente</label>
          <input type="text" placeholder="Buscar paciente por DNI o Nombre" className={styles.input} />
        </div>
        
        <div className={styles.formGroup}>
          <label>Pruebas a realizar</label>
          <div className={styles.checkboxGroup}>
            <label><input type="checkbox" /> Hemograma Completo</label>
            <label><input type="checkbox" /> Perfil Lipídico</label>
            <label><input type="checkbox" /> Glucosa</label>
            <label><input type="checkbox" /> Examen General de Orina</label>
            <label><input type="checkbox" /> Triglicéridos</label>
            <label><input type="checkbox" /> Colesterol Total</label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Fecha autorizada (Desde)</label>
          <input type="date" className={styles.input} />
        </div>

        <button type="button" className={styles.btnSubmit}>Generar Orden</button>
      </form>
    </div>
  );
}