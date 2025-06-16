import axiosClient from './axiosClient'
const learnerService = {
    // getAll: () => axiosClient.get("/learner"),
    findByIdAccount: (id) => axiosClient.get(`/learner/findByAccount/${id}`),
    // register: (data) => axiosClient.post("/learner/register", data),
    // update: (id, data) => axiosClient.put(`/learner/${id}`, data),
    // delete: (id) => axiosClient.delete(`/learner/${id}`),
    // login: (data) => axiosClient.post("/learner/login", data)
};
export default learnerService;