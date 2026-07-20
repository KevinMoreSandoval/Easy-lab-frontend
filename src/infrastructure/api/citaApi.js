import { apiRequest } from "./authApi";

export const getCitas = async () => {
  return await apiRequest("/citas");
};

export const getCitasPendientesMedico = async () => {
  return await apiRequest("/citas/medico/pendientes");
};

export const createCita = async (data) => {
  return await apiRequest("/citas", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const cambiarEstadoCita = async (id, estado) => {
  return await apiRequest(`/citas/${id}/estado`, {
    method: "PATCH",
    body: JSON.stringify({ estado }),
  });
};
