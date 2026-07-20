// ConfirmacionLlegada.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './confirmacionLlegada.module.css';
import { getOrdenesByPacienteDni, cambiarEstadoOrden } from '../../../infrastructure/api/pacienteApi';

export default function ConfirmacionLlegada() {
  const [dni, setDni] = useState('');
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const buscarPaciente = async () => {
    if (!dni.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const ordenes = await getOrdenesByPacienteDni(dni.trim());
      const ordenPendiente = ordenes.find(o => o.estado === 'PENDIENTE');
      
      if (ordenPendiente) {
        setOrden(ordenPendiente);
      } else {
        setError("El paciente no tiene órdenes médicas pendientes.");
        setOrden(null);
      }
    } catch (err) {
      setError("Error al buscar las órdenes del paciente.");
      setOrden(null);
    } finally {
      setLoading(false);
    }
  };

  const imprimirOrden = (pacienteData) => {
    const ventanaImpresion = window.open('', '', 'width=800,height=600');
    ventanaImpresion.document.write(`
      <html>
        <head>
          <title>Orden de Laboratorio - ${pacienteData.nombre}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            .header { text-align: center; border-bottom: 2px solid #e11d48; padding-bottom: 10px; margin-bottom: 20px; }
            .header h2 { margin: 0; color: #e11d48; }
            .header h3 { margin: 5px 0 0 0; color: #555; }
            .content { margin-bottom: 30px; font-size: 16px; line-height: 1.6; }
            .footer { text-align: center; font-size: 12px; color: #666; margin-top: 50px; border-top: 1px solid #ccc; padding-top: 10px; }
            .info-row { margin: 10px 0; }
            .label { font-weight: bold; display: inline-block; width: 180px; color: #444; }
            .qr-code { text-align: center; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Easy Laboratorio</h2>
            <h3>Orden de Exámenes</h3>
          </div>
          <div class="content">
            <div class="info-row"><span class="label">Paciente:</span> ${pacienteData.paciente}</div>
            <div class="info-row"><span class="label">DNI:</span> ${pacienteData.pacienteDni}</div>
            <div class="info-row"><span class="label">Médico solicitante:</span> ${pacienteData.medico}</div>
            <div class="info-row"><span class="label">Fecha emisión:</span> ${pacienteData.fechaEmision}</div>
            <div class="info-row"><span class="label">Pruebas solicitadas:</span> ${pacienteData.pruebas.join(', ')}</div>
            <div class="info-row"><span class="label">Estado:</span> Confirmado</div>
          </div>
          <div class="qr-code">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pacienteData.numeroOrden}" alt="Código QR" />
            <p style="font-size: 14px; color: #555;">Código de seguimiento</p>
          </div>
          <div class="footer">
            Generado automáticamente el ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}
          </div>
        </body>
      </html>
    `);
    ventanaImpresion.document.close();
    ventanaImpresion.focus();
    setTimeout(() => {
      ventanaImpresion.print();
      ventanaImpresion.close();
    }, 500);
  };

  const confirmarLlegada = async () => {
    try {
      await cambiarEstadoOrden(orden.id, 'VIGENTE');
      imprimirOrden(orden);
      setOrden(null);
      setDni('');
      alert("Llegada confirmada y orden impresa correctamente.");
    } catch (err) {
      alert("Error al confirmar la llegada: " + err.message);
    }
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
          <button onClick={buscarPaciente} disabled={loading} className={styles.btnSearch}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.searchIcon} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {error && (
          <p style={{ color: '#dc2626', marginTop: '8px', fontSize: '0.9rem' }}>{error}</p>
        )}

        {orden && (
          <div className={styles.resultWrapper}>
            <div className={styles.resultCard}>
              <div className={styles.resultHeader}>
                <div>
                  <h3 className={styles.patientName}>{orden.paciente}</h3>
                  <p className={styles.patientDni}>DNI: {orden.pacienteDni}</p>
                </div>
                <span className={styles.badge}>Orden Pendiente</span>
              </div>
              
              <div className={styles.infoGrid}>
                <div>
                  <span className={styles.infoLabel}>Médico solicitante</span>
                  <span className={styles.infoValue}>{orden.medico}</span>
                </div>
                <div>
                  <span className={styles.infoLabel}>Fecha Emisión</span>
                  <span className={styles.infoValue}>{orden.fechaEmision}</span>
                </div>
                <div className={styles.infoGridFull}>
                  <span className={styles.infoLabel}>Pruebas solicitadas</span>
                  <span className={styles.infoValue}>{orden.pruebas.join(', ')}</span>
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