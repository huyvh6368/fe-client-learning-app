import axiosClient from './axiosClient'
const learnerService = {
    // getAll: () => axiosClient.get("/learner"),
    getAll: (pageNo, pageSize) => {
        const params = {
            page: pageNo,
            size: pageSize
        }
        return axiosClient.get("/learner/all", { params });
    },
    findByIdAccount: (id) => axiosClient.get(`/learner/findByAccount/${id}`),
    // register: (data) => axiosClient.post("/learner/register", data),
    update: (id, data) => axiosClient.put(`/learner/edit/${id}`, data),
    // delete: (id) => axiosClient.delete(`/learner/${id}`),
    // login: (data) => axiosClient.post("/learner/login", data)
};
export default learnerService;