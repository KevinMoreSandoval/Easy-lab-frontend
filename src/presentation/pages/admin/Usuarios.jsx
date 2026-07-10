import { useState, useEffect } from "react";
import { getUsuarios, createUsuario, toggleEstadoUsuario } from "../../../infrastructure/api/usuarioApi";
import styles from "./admin.module.css";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [form, setForm] = useState({ 
    nombre: "", 
    identificador: "", // DNI, Colegiatura o Correo
    rol: "RECEPCION", 
    password: ""
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      setError(null);
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      setError(err.error || "Error al cargar los usuarios");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const newUser = {
      nombreCompleto: form.nombre,
      identificador: form.identificador,
      rolNombre: form.rol,
      password: form.password,
      activo: true
    };
    
    try {
      await createUsuario(newUser);
      await fetchUsuarios();
      setForm({ nombre: "", identificador: "", rol: "RECEPCION", password: "" });
      setMostrarForm(false);
    } catch (err) {
      setError(err.error || "Error al crear el usuario");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleEstado = async (id, estadoActual) => {
    try {
      await toggleEstadoUsuario(id, !estadoActual);
      await fetchUsuarios();
    } catch (err) {
      setError(err.error || "Error al cambiar el estado del usuario");
    }
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

      {error && (
        <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '6px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {mostrarForm && (
        <form className={styles.card} onSubmit={handleSubmit}>
          <h2 className={styles.cardTitle}>Crear usuario</h2>
          <div className={styles.formGrid}>
            <label className={styles.field}>
              Nombre completo
              <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
            </label>
            <label className={styles.field}>
              Identificador (Correo o Colegiatura)
              <input value={form.identificador} onChange={(e) => setForm({ ...form, identificador: e.target.value })} required />
            </label>
            <label className={styles.field}>
              Rol
              <select value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })}>
                <option value="ADMIN">Administrador</option>
                <option value="MEDICO">Médico</option>
                <option value="RECEPCION">Recepción</option>
              </select>
            </label>
            <label className={styles.field}>
              Contraseña temporal
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />
            </label>
          </div>
          <div className={styles.actions}>
            <button className={styles.btnPrimary} type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar usuario'}
            </button>
            <button className={styles.btnSecondary} type="button" onClick={() => setMostrarForm(false)} disabled={isLoading}>
              Cancelar
            </button>
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
                <th>Identificador</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombreCompleto}</td>
                  <td>{usuario.identificador}</td>
                  <td>{usuario.rolNombre}</td>
                  <td>
                    <span className={styles.badge} style={{ backgroundColor: usuario.activo ? '#dcfce7' : '#fee2e2', color: usuario.activo ? '#166534' : '#991b1b' }}>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={styles.btnSecondary} 
                      onClick={() => handleToggleEstado(usuario.id, usuario.activo)}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      {usuario.activo ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#64748b' }}>No hay usuarios registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
