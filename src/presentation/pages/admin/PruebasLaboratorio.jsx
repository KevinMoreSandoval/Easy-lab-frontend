import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPruebas } from "../../../infrastructure/api/pruebaApi";
import styles from "./pruebasLaboratorio.module.css";

export default function PruebasLaboratorio() {
  const [pruebas, setPruebas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPruebas();
  }, []);

  const fetchPruebas = async () => {
    try {
      setError(null);
      const data = await getPruebas();
      setPruebas(data);
    } catch (err) {
      setError(err.error || "Error al cargar las pruebas");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Catálogo de pruebas</h1>
          <p className={styles.subtitle}>Listado de exámenes disponibles para reservas.</p>
        </div>
        <Link to="/admin/crear-prueba" className={styles.btnPrimary} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          Crear nueva prueba
        </Link>
      </div>

      {error && (
        <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '6px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.filterBar}>
            <h2 className={styles.cardTitle} style={{ margin: 0 }}>Pruebas registradas</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Prueba</th>
                <th>Código</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>Cargando...</td>
                </tr>
              ) : pruebas.length > 0 ? (
                pruebas.map((prueba) => (
                  <tr key={prueba.id}>
                    <td>{prueba.nombre}</td>
                    <td>{prueba.codigo}</td>
                    <td>{prueba.categoria}</td>
                    <td>
                      <span className={styles.badge} style={{ backgroundColor: prueba.activa ? '#ccfbf1' : '#fee2e2', color: prueba.activa ? '#0f766e' : '#991b1b' }}>
                        {prueba.activa ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td>
                      <Link 
                        to={`/admin/editar-prueba/${prueba.id}`}
                        className={styles.btnSecondary} 
                        style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-block', textDecoration: 'none' }}
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1rem', color: '#64748b' }}>No hay pruebas registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
