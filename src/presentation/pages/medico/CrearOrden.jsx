// src/presentation/pages/medico/CrearOrden.jsx
import styles from './crearOrden.module.css';

export default function CrearOrden() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear Orden Médica</h2>
      <form className={styles.form} onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const pruebas = [];
        if (formData.get('hemograma')) pruebas.push('Hemograma Completo');
        if (formData.get('perfil')) pruebas.push('Perfil Lipídico');
        if (formData.get('glucosa')) pruebas.push('Glucosa');
        if (formData.get('orina')) pruebas.push('Examen General de Orina');
        if (formData.get('trigliceridos')) pruebas.push('Triglicéridos');
        if (formData.get('colesterol')) pruebas.push('Colesterol Total');

        const nuevaOrden = {
          id: 'ORD-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
          paciente: formData.get('paciente'),
          pruebas: pruebas.join(', '),
          fecha: formData.get('fecha'),
          estado: 'Pendiente'
        };

        const ordenes = JSON.parse(localStorage.getItem('easylab_ordenes') || '[]');
        ordenes.push(nuevaOrden);
        localStorage.setItem('easylab_ordenes', JSON.stringify(ordenes));
        
        alert('Orden generada exitosamente');
        e.target.reset();
      }}>
        <div className={styles.formGroup}>
          <label>Paciente</label>
          <input name="paciente" type="text" placeholder="Buscar paciente por DNI o Nombre" className={styles.input} required />
        </div>
        
        <div className={styles.formGroup}>
          <label>Pruebas a realizar</label>
          <div className={styles.checkboxGroup}>
            <label><input name="hemograma" type="checkbox" /> Hemograma Completo</label>
            <label><input name="perfil" type="checkbox" /> Perfil Lipídico</label>
            <label><input name="glucosa" type="checkbox" /> Glucosa</label>
            <label><input name="orina" type="checkbox" /> Examen General de Orina</label>
            <label><input name="trigliceridos" type="checkbox" /> Triglicéridos</label>
            <label><input name="colesterol" type="checkbox" /> Colesterol Total</label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Fecha autorizada (Desde)</label>
          <input name="fecha" type="date" className={styles.input} required />
        </div>

        <button type="submit" className={styles.btnSubmit}>Generar Orden</button>
      </form>
    </div>
  );
}