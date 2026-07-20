// src/presentation/pages/medico/CrearOrden.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './crearOrden.module.css';
import { createOrden } from '../../../infrastructure/api/pacienteApi';
import { apiRequest } from '../../../infrastructure/api/authApi';
import { cambiarEstadoCita } from '../../../infrastructure/api/citaApi';

export default function CrearOrden() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pacienteDni, citaId } = location.state || {};

  const [pruebas, setPruebas] = useState([]);
  const [selectedPruebas, setSelectedPruebas] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Cargar pruebas disponibles desde el backend
    apiRequest('/pruebas')
      .then(data => setPruebas(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error("Error al cargar las pruebas médicas:", err);
      });
  }, []);

  const togglePrueba = (id) => {
    setSelectedPruebas(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear Orden Médica</h2>
      <form className={styles.form} onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const req = {
          pacienteDni: formData.get('paciente').trim(),
          pruebaIds: selectedPruebas,
          fechaEmision: formData.get('fecha'),
        };

        setSaving(true);
        try {
          await createOrden(req);
          if (citaId) {
            await cambiarEstadoCita(citaId, 'ATENDIDA');
          }
          alert('Orden generada exitosamente');
          navigate('/medico/historial');
        } catch (err) {
          alert('Error al generar la orden: ' + (err.error || 'Error desconocido'));
        } finally {
          setSaving(false);
        }
      }}>
        <div className={styles.formGroup}>
          <label>DNI del Paciente</label>
          <input 
            name="paciente" 
            type="text" 
            defaultValue={pacienteDni || ''} 
            placeholder="Ingrese el DNI del paciente" 
            className={styles.input} 
            required 
          />
        </div>
        
        <div className={styles.formGroup}>
          <label>Pruebas a realizar</label>
          <div className={styles.checkboxGroup}>
            {pruebas.map(p => (
              <label key={p.id}>
                <input
                  type="checkbox"
                  checked={selectedPruebas.includes(p.id)}
                  onChange={() => togglePrueba(p.id)}
                />
                {' '}{p.nombre}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Fecha autorizada (Desde)</label>
          <input name="fecha" type="date" className={styles.input} required />
        </div>

        <button type="submit" disabled={saving} className={styles.btnSubmit}>
          {saving ? 'Generando...' : 'Generar Orden'}
        </button>
      </form>
    </div>
  );
}