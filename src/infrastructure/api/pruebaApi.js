import { apiRequest } from "./authApi";

export const getPruebas = async () => {
  return await apiRequest("/admin/pruebas");
};

export const getPrueba = async (id) => {
  return await apiRequest(`/admin/pruebas/${id}`);
};

export const createPrueba = async (data) => {
  return await apiRequest("/admin/pruebas", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updatePrueba = async (id, data) => {
  return await apiRequest(`/admin/pruebas/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
