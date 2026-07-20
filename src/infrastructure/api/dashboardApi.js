import { apiRequest } from "./authApi";

export const getDashboardStats = async () => {
  return await apiRequest("/admin/dashboard");
};
