import { apiRequest } from "./authApi";

export const getUsuarios = async () => {
  return await apiRequest("/admin/usuarios");
};

export const createUsuario = async (data) => {
  return await apiRequest("/admin/usuarios", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateUsuario = async (id, data) => {
  return await apiRequest(`/admin/usuarios/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const toggleEstadoUsuario = async (id, activo) => {
  return await apiRequest(`/admin/usuarios/${id}/estado`, {
    method: "PATCH",
    body: JSON.stringify({ activo }),
  });
};
