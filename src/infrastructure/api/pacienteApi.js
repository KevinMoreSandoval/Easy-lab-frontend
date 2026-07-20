import { apiRequest } from "./authApi";

// ── Pacientes ──────────────────────────────────────────────
export const getPacienteByDni = async (dni) => {
  return await apiRequest(`/pacientes/dni/${dni}`);
};

export const createPaciente = async (data) => {
  return await apiRequest("/pacientes", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getAllPacientes = async () => {
  return await apiRequest("/pacientes");
};

// ── Órdenes ────────────────────────────────────────────────
export const getOrdenes = async () => {
  return await apiRequest("/ordenes");
};

export const createOrden = async (data) => {
  return await apiRequest("/ordenes", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
