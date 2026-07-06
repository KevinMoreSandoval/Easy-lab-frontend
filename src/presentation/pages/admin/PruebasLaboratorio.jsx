import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./pruebasLaboratorio.module.css";

const initialTests = [
  { id: 1, nombre: "Hemograma completo", codigo: "HEM-001", categoria: "Hematologia", estado: "Activa" },
  { id: 2, nombre: "Perfil lipidico", codigo: "BIO-004", categoria: "Bioquimica", estado: "Activa" },
];

export default function PruebasLaboratorio() {
  const [pruebas] = useState(initialTests);

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
              {pruebas.map((prueba) => (
                <tr key={prueba.id}>
                  <td>{prueba.nombre}</td>
                  <td>{prueba.codigo}</td>
                  <td>{prueba.categoria}</td>
                  <td>
                    <span className={styles.badge}>{prueba.estado}</span>
                  </td>
                  <td>
                    <button className={styles.btnSecondary} style={{ padding: '6px 12px', fontSize: '12px' }}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
