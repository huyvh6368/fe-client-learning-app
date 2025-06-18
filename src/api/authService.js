import axiosClient from './axiosClient'
const authService = {
  // getAll: () => axiosClient.get("/auth"),
  // getById: (id) => axiosClient.get(`/auth/${id}`),
  register: (data) => axiosClient.post("/auth/register", data),
  // update: (id, data) => axiosClient.put(`/auth/${id}`, data),
  // delete: (id) => axiosClient.delete(`/auth/${id}`),
  login: (data) => axiosClient.post("/auth/login", data),
  change: (data) => axiosClient.post("/auth/change-password", data)
};
export default authService;