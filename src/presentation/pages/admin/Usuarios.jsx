import { useState } from "react";
import styles from "./admin.module.css";

const initialUsers = [
  { id: 1, nombre: "Ana Torres", email: "ana.torres@easylab.pe", rol: "RECEPCION", turno: "Mañana", estado: "Activo" },
  { id: 2, nombre: "Roberto Sanchez", email: "roberto.sanchez@easylab.pe", rol: "MEDICO", especialidad: "Cardiología", colegiatura: "CMP 12345", estado: "Activo" },
];

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(initialUsers);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({ 
    nombre: "", 
    email: "", 
    rol: "RECEPCION", 
    password: "",
    especialidad: "",
    colegiatura: "",
    turno: "Mañana"
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      id: Date.now(),
      nombre: form.nombre,
      email: form.email,
      rol: form.rol,
      estado: "Activo",
    };
    
    if (form.rol === "MEDICO") {
      newUser.especialidad = form.especialidad;
      newUser.colegiatura = form.colegiatura;
    } else if (form.rol === "RECEPCION") {
      newUser.turno = form.turno;
    }

    setUsuarios([...usuarios, newUser]);
    setForm({ nombre: "", email: "", rol: "RECEPCION", password: "", especialidad: "", colegiatura: "", turno: "Mañana" });
    setMostrarForm(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Usuarios</h1>
          <p className={styles.subtitle}>Creación y control de accesos del sistema.</p>
        </div>
        {!mostrarForm && <button className={styles.btnPrimary} onClick={() => setMostrarForm(true)}>+ Nuevo usuario</button>}
      </div>

      {mostrarForm && (
        <form className={styles.card} onSubmit={handleSubmit}>
          <h2 className={styles.cardTitle}>Crear usuario</h2>
          <div className={styles.formGrid}>
            <label className={styles.field}>Nombre completo<input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required /></label>
            <label className={styles.field}>Correo<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
            <label className={styles.field}>
              Rol
              <select value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })}>
                <option value="ADMIN">Administrador</option>
                <option value="MEDICO">Médico</option>
                <option value="RECEPCION">Recepción</option>
              </select>
            </label>
            <label className={styles.field}>Contraseña temporal<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
            
            {form.rol === "MEDICO" && (
              <>
                <label className={styles.field}>Especialidad<input value={form.especialidad} onChange={(e) => setForm({ ...form, especialidad: e.target.value })} required /></label>
                <label className={styles.field}>N° Colegiatura (CMP)<input value={form.colegiatura} onChange={(e) => setForm({ ...form, colegiatura: e.target.value })} required /></label>
              </>
            )}

            {form.rol === "RECEPCION" && (
              <label className={styles.field}>
                Turno
                <select value={form.turno} onChange={(e) => setForm({ ...form, turno: e.target.value })}>
                  <option value="Mañana">Mañana</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noche">Noche</option>
                </select>
              </label>
            )}
          </div>
          <div className={styles.actions}>
            <button className={styles.btnPrimary} type="submit">Guardar usuario</button>
            <button className={styles.btnSecondary} type="button" onClick={() => setMostrarForm(false)}>Cancelar</button>
          </div>
        </form>
      )}

      {!mostrarForm && (
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Usuarios registrados</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Detalles Adicionales</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol}</td>
                  <td>
                    {usuario.rol === "MEDICO" && <span style={{fontSize: "0.85rem", color: "#64748b"}}>{usuario.especialidad} ({usuario.colegiatura})</span>}
                    {usuario.rol === "RECEPCION" && <span style={{fontSize: "0.85rem", color: "#64748b"}}>Turno: {usuario.turno}</span>}
                    {usuario.rol === "ADMIN" && <span style={{fontSize: "0.85rem", color: "#64748b"}}>Acceso Total</span>}
                  </td>
                  <td><span className={styles.badge}>{usuario.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
