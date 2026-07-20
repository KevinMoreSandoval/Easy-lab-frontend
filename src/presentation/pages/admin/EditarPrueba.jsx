import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPrueba, updatePrueba } from "../../../infrastructure/api/pruebaApi";
import styles from "./pruebasLaboratorio.module.css";

const initialForm = {
  nombre: "",
  codigo: "",
  categoria: "",
  descripcion: "",
  activa: true,
  requiereAyuno: false,
  horasAyuno: "",
  ayunoAbsoluto: false,
  consumoAgua: "Permitido",
  observacionesAgua: "",
  suspenderMedicamentos: false,
  medicamentos: "",
  horasMedicamentos: "",
  restricciones: [],
  otrasRestricciones: "",
  tipoMuestra: "",
  otroTipoMuestra: "",
  requisitosMuestra: [],
  tiempoMaximoMuestra: "",
  indicacionesAdicionales: "",
  videoUrl: "",
};

const categorias = ["Bioquímica", "Hematología", "Microbiología", "Inmunología"];
const restricciones = [
  "Evitar alcohol",
  "Evitar fumar",
  "Evitar café",
  "Evitar bebidas energéticas",
  "Evitar comidas grasas",
  "Evitar suplementos",
  "Evitar actividad física intensa",
  "Evitar relaciones sexuales",
  "Otras restricciones",
];
const tiposMuestra = ["Sangre", "Orina", "Heces", "Saliva", "Esputo", "Secreción", "Otro"];
const requisitosMuestra = [
  "Primera muestra del día",
  "Recipiente estéril",
  "Muestra en ayunas",
  "Requiere refrigeración",
  "Llevar la muestra antes de un tiempo determinado",
];

export default function EditarPrueba() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrueba();
  }, [id]);

  const fetchPrueba = async () => {
    try {
      setIsFetching(true);
      const data = await getPrueba(id);
      
      // Asegurar que las listas no sean undefined
      if (!data.restricciones) data.restricciones = [];
      if (!data.requisitosMuestra) data.requisitosMuestra = [];
      
      setForm(data);
    } catch (err) {
      setError(err.error || "Error al cargar los datos de la prueba");
    } finally {
      setIsFetching(false);
    }
  };

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleListValue = (field, value) => {
    setForm((current) => {
      const currentList = current[field] || [];
      const exists = currentList.includes(value);
      return {
        ...current,
        [field]: exists ? currentList.filter((item) => item !== value) : [...currentList, value],
      };
    });
  };

  const previewItems = useMemo(() => {
    const items = [];

    if (form.nombre) items.push(`Prueba: ${form.nombre}`);
    if (form.categoria) items.push(`Categoría: ${form.categoria}`);
    items.push(`Estado: ${form.activa ? "Activa" : "Inactiva"}`);
    if (form.descripcion) items.push(form.descripcion);

    if (form.requiereAyuno) {
      const horas = form.horasAyuno ? `${form.horasAyuno} horas` : "horas por definir";
      items.push(`Requiere ayuno de ${horas}${form.ayunoAbsoluto ? " absoluto" : ""}.`);
    }

    if (form.consumoAgua) {
      items.push(`Consumo de agua: ${form.consumoAgua.toLowerCase()}.`);
      if (form.consumoAgua === "Permitido" && form.observacionesAgua) items.push(form.observacionesAgua);
    }

    if (form.suspenderMedicamentos) {
      const horas = form.horasMedicamentos ? `${form.horasMedicamentos} horas antes` : "con anticipación por definir";
      items.push(`Suspender medicamentos ${horas}: ${form.medicamentos || "medicamentos por especificar"}.`);
    }

    const currentRestricciones = form.restricciones || [];
    currentRestricciones.forEach((restriccion) => {
      if (restriccion !== "Otras restricciones") items.push(`${restriccion}.`);
    });
    if (currentRestricciones.includes("Otras restricciones") && form.otrasRestricciones) {
      items.push(form.otrasRestricciones);
    }

    if (form.tipoMuestra) {
      items.push(`Tipo de muestra: ${form.tipoMuestra === "Otro" ? form.otroTipoMuestra || "Otro por especificar" : form.tipoMuestra}.`);
    }

    const currentRequisitos = form.requisitosMuestra || [];
    currentRequisitos.forEach((requisito) => {
      if (requisito === "Llevar la muestra antes de un tiempo determinado") {
        items.push(`Llevar la muestra antes de ${form.tiempoMaximoMuestra || "un tiempo por definir"} horas.`);
      } else {
        items.push(`${requisito}.`);
      }
    });

    if (form.indicacionesAdicionales) items.push(form.indicacionesAdicionales);
    if (form.videoUrl) items.push(`Video informativo: ${form.videoUrl}.`);

    return items;
  }, [form]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await updatePrueba(id, form);
      navigate("/admin/pruebas");
    } catch (err) {
      setError(err.error || "Error al actualizar la prueba");
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <section className={styles.container}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando datos de la prueba...</div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Editar prueba: {form.codigo}</h1>
          <p className={styles.subtitle}>Modifica los datos del examen seleccionado.</p>
        </div>
        <button type="button" onClick={() => navigate("/admin/pruebas")} className={styles.btnSecondary}>
          Volver al catálogo
        </button>
      </div>

      <div className={styles.formPreviewLayout}>
        <form className={styles.testForm} onSubmit={handleSubmit}>
          {error && (
            <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '6px', marginBottom: '16px' }}>
              {error}
            </div>
          )}
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Información general</h2>
            <div className={styles.formGrid}>
              <label className={styles.field}>Nombre de la prueba<input value={form.nombre || ""} onChange={(e) => setField("nombre", e.target.value)} required /></label>
              <label className={styles.field}>Código interno de la prueba<input value={form.codigo || ""} readOnly style={{ backgroundColor: '#e2e8f0', cursor: 'not-allowed', color: '#64748b' }} /></label>
              <label className={styles.field}>Categoría<select value={form.categoria || ""} onChange={(e) => setField("categoria", e.target.value)} required><option value="">Seleccionar</option>{categorias.map((categoria) => <option key={categoria}>{categoria}</option>)}</select></label>
              <label className={styles.switchField}>Estado de la prueba<input type="checkbox" checked={form.activa || false} onChange={(e) => setField("activa", e.target.checked)} /><span>{form.activa ? "Activa" : "Inactiva"}</span></label>
              <label className={`${styles.field} ${styles.fullWidth}`}>Descripción de la prueba<textarea value={form.descripcion || ""} onChange={(e) => setField("descripcion", e.target.value)} rows="3" /></label>
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Indicaciones para el paciente</h2>
            <div className={styles.sectionStack}>
              <label className={styles.checkField}><input type="checkbox" checked={form.requiereAyuno || false} onChange={(e) => setField("requiereAyuno", e.target.checked)} />Requiere ayuno</label>
              {form.requiereAyuno && <div className={styles.formGrid}><label className={styles.field}>Número de horas de ayuno<input type="number" min="0" value={form.horasAyuno || ""} onChange={(e) => setField("horasAyuno", e.target.value)} /></label><label className={styles.checkField}><input type="checkbox" checked={form.ayunoAbsoluto || false} onChange={(e) => setField("ayunoAbsoluto", e.target.checked)} />Ayuno absoluto</label></div>}

              <fieldset className={styles.optionGroup}><legend>Consumo de agua</legend><label><input type="radio" name="consumoAgua" checked={form.consumoAgua === "Permitido"} onChange={() => setField("consumoAgua", "Permitido")} />Permitido</label><label><input type="radio" name="consumoAgua" checked={form.consumoAgua === "No permitido"} onChange={() => setField("consumoAgua", "No permitido")} />No permitido</label></fieldset>
              {form.consumoAgua === "Permitido" && <label className={styles.field}>Observaciones sobre consumo de agua<input value={form.observacionesAgua || ""} onChange={(e) => setField("observacionesAgua", e.target.value)} /></label>}

              <label className={styles.checkField}><input type="checkbox" checked={form.suspenderMedicamentos || false} onChange={(e) => setField("suspenderMedicamentos", e.target.checked)} />Suspender medicamentos</label>
              {form.suspenderMedicamentos && <div className={styles.formGrid}><label className={styles.field}>Medicamentos a suspender<input value={form.medicamentos || ""} onChange={(e) => setField("medicamentos", e.target.value)} /></label><label className={styles.field}>Horas antes de suspender<input type="number" min="0" value={form.horasMedicamentos || ""} onChange={(e) => setField("horasMedicamentos", e.target.value)} /></label></div>}

              <div>
                <h3 className={styles.sectionLabel}>Restricciones</h3>
                <div className={styles.checkboxGrid}>{restricciones.map((restriccion) => <label className={styles.checkField} key={restriccion}><input type="checkbox" checked={(form.restricciones || []).includes(restriccion)} onChange={() => toggleListValue("restricciones", restriccion)} />{restriccion}</label>)}</div>
              </div>
              {(form.restricciones || []).includes("Otras restricciones") && <label className={styles.field}>Otras restricciones<textarea value={form.otrasRestricciones || ""} onChange={(e) => setField("otrasRestricciones", e.target.value)} rows="3" /></label>}
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Tipo de muestra</h2>
            <div className={styles.formGrid}>
              <label className={styles.field}>Tipo de muestra<select value={form.tipoMuestra || ""} onChange={(e) => setField("tipoMuestra", e.target.value)}><option value="">Seleccionar</option>{tiposMuestra.map((tipo) => <option key={tipo}>{tipo}</option>)}</select></label>
              {form.tipoMuestra === "Otro" && <label className={styles.field}>Especificar tipo de muestra<input value={form.otroTipoMuestra || ""} onChange={(e) => setField("otroTipoMuestra", e.target.value)} /></label>}
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Requisitos de la muestra</h2>
            <div className={styles.checkboxGrid}>{requisitosMuestra.map((requisito) => <label className={styles.checkField} key={requisito}><input type="checkbox" checked={(form.requisitosMuestra || []).includes(requisito)} onChange={() => toggleListValue("requisitosMuestra", requisito)} />{requisito}</label>)}</div>
            {(form.requisitosMuestra || []).includes("Llevar la muestra antes de un tiempo determinado") && <label className={`${styles.field} ${styles.timeLimitField}`}>Tiempo máximo en horas<input type="number" min="0" value={form.tiempoMaximoMuestra || ""} onChange={(e) => setField("tiempoMaximoMuestra", e.target.value)} /></label>}
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Indicaciones adicionales</h2>
            <label className={styles.field}>Instrucciones específicas<textarea value={form.indicacionesAdicionales || ""} onChange={(e) => setField("indicacionesAdicionales", e.target.value)} rows="6" placeholder="Presentarse entre las 7:00 y 9:00 a.m.&#10;Llevar documento de identidad.&#10;No realizar ejercicio intenso el día anterior." /></label>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Material informativo</h2>
            <div className={styles.formGrid}>
              <label className={`${styles.field} ${styles.fullWidth}`}>URL de video informativo<input type="url" value={form.videoUrl || ""} onChange={(e) => setField("videoUrl", e.target.value)} placeholder="https://..." /></label>
            </div>
          </section>

          <div className={styles.actions}>
            <button className={styles.btnSecondary} type="button" onClick={() => navigate("/admin/pruebas")} disabled={isLoading}>Cancelar</button>
            <button className={styles.btnPrimary} type="submit" disabled={isLoading}>{isLoading ? "Guardando..." : "Guardar cambios"}</button>
          </div>
        </form>

        <aside className={styles.previewPanel}>
          <h2 className={styles.cardTitle}>Vista previa para el paciente</h2>
          {previewItems.length > 0 ? <ul>{previewItems.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul> : <p className={styles.emptyPreview}>Completa el formulario para ver las indicaciones.</p>}
        </aside>
      </div>
    </section>
  );
}
