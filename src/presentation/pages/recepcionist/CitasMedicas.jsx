import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCitas, createCita } from '../../../infrastructure/api/citaApi';
import { getMedicos } from '../../../infrastructure/api/usuarioApi';
import { getPacienteByDni, createPaciente } from '../../../infrastructure/api/pacienteApi';
import styles from './citasMedicas.module.css';

export default function CitasMedicas() {
  const navigate = useNavigate();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [citas, setCitas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  
  const [dniABuscar, setDniABuscar] = useState('');
  const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
  const [buscando, setBuscando] = useState(false);
  
  // Datos para nuevo paciente si no existe
  const [nuevoPacienteNombre, setNuevoPacienteNombre] = useState('');
  const [nuevoPacienteCorreo, setNuevoPacienteCorreo] = useState('');
  const [nuevoPacienteTelefono, setNuevoPacienteTelefono] = useState('');
  
  // Datos para la cita
  const [nuevoMedicoId, setNuevoMedicoId] = useState('');
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [nuevaHora, setNuevaHora] = useState('');

  const cargarDatos = async () => {
    try {
      const [citasRes, medicosRes] = await Promise.all([
        getCitas(),
        getMedicos()
      ]);
      setCitas(citasRes);
      setMedicos(medicosRes);
      if (medicosRes.length > 0) {
        setNuevoMedicoId(medicosRes[0].id.toString());
      }
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleBuscarDni = async (e) => {
    e.preventDefault();
    setBuscando(true);
    try {
      const pac = await getPacienteByDni(dniABuscar);
      setPacienteEncontrado(pac);
    } catch (error) {
      console.log("Paciente no encontrado, procediendo a crearlo.");
      setPacienteEncontrado(null);
    } finally {
      setBuscando(false);
    }
  };

  const handleSubmitCita = async (e) => {
    e.preventDefault();
    
    try {
      let dniPacienteCita = dniABuscar;
      
      // Si no existe, crearlo primero
      if (!pacienteEncontrado) {
        const nuevoPac = await createPaciente({
          dni: dniABuscar,
          nombreCompleto: nuevoPacienteNombre,
          correo: nuevoPacienteCorreo,
          telefono: nuevoPacienteTelefono
        });
        dniPacienteCita = nuevoPac.dni;
      }
      
      await createCita({
        pacienteDni: dniPacienteCita,
        medicoId: parseInt(nuevoMedicoId),
        fecha: nuevaFecha,
        hora: nuevaHora
      });
      
      setMostrarFormulario(false);
      setDniABuscar('');
      setPacienteEncontrado(null);
      setNuevaFecha('');
      setNuevaHora('');
      setNuevoPacienteNombre('');
      setNuevoPacienteCorreo('');
      setNuevoPacienteTelefono('');
      
      // Recargar citas
      cargarDatos();
      
    } catch (error) {
      alert("Error al guardar la cita: " + error.message);
    }
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
          <div className={styles.formContainer}>
            <h3 className={styles.tableTitle}>Agendar Nueva Cita Médica</h3>
            
            <form onSubmit={handleBuscarDni} className={styles.searchForm}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Buscar Paciente por DNI *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    className={styles.input} 
                    value={dniABuscar} 
                    onChange={(e) => setDniABuscar(e.target.value)} 
                    required 
                    placeholder="Ingrese DNI"
                  />
                  <button type="submit" className={styles.btnSecondary} disabled={buscando}>
                    {buscando ? 'Buscando...' : 'Buscar'}
                  </button>
                </div>
              </div>
            </form>

            {dniABuscar && !buscando && (
              <form onSubmit={handleSubmitCita} className={styles.form}>
                
                {pacienteEncontrado ? (
                  <div className={styles.alertSuccess}>
                    Paciente encontrado: <strong>{pacienteEncontrado.nombreCompleto}</strong>
                  </div>
                ) : (
                  <div className={styles.newPatientSection}>
                    <h4>Paciente Nuevo - Completar Datos</h4>
                    <div className={styles.grid}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Nombre Completo *</label>
                        <input type="text" className={styles.input} value={nuevoPacienteNombre} onChange={e => setNuevoPacienteNombre(e.target.value)} required />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Correo</label>
                        <input type="email" className={styles.input} value={nuevoPacienteCorreo} onChange={e => setNuevoPacienteCorreo(e.target.value)} />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Teléfono</label>
                        <input type="text" className={styles.input} value={nuevoPacienteTelefono} onChange={e => setNuevoPacienteTelefono(e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                <h4 style={{ marginTop: '20px', marginBottom: '15px' }}>Datos de la Cita</h4>
                <div className={styles.grid}>
                  <div className={styles.inputGroup}>
                    <label className={styles.label}>Médico Asignado *</label>
                    <select 
                      className={styles.select} 
                      value={nuevoMedicoId} 
                      onChange={(e) => setNuevoMedicoId(e.target.value)}
                      required
                    >
                      <option value="">Seleccione un médico</option>
                      {medicos.map(m => (
                        <option key={m.id} value={m.id}>{m.nombreCompleto}</option>
                      ))}
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
                    onClick={() => {
                      setMostrarFormulario(false);
                      setPacienteEncontrado(null);
                      setDniABuscar('');
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
            
            {(!dniABuscar || buscando) && (
              <div className={styles.buttonGroup} style={{ marginTop: '20px' }}>
                <button 
                  type="button" 
                  className={styles.btnSecondary} 
                  onClick={() => setMostrarFormulario(false)}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
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
                      <td>{cita.pacienteNombre}</td>
                      <td>{cita.medicoNombre}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
                      <td>
                        <span className={`${styles.badge} ${cita.estado === 'CONFIRMADA' || cita.estado === 'ATENDIDA' ? styles.badgeSuccess : styles.badgePrimary}`}>
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