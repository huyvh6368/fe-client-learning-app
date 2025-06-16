import axiosClient from './axiosClient'
const topicService = {
    // getAll: () => axiosClient.get("/auth"),
    // getAll: (pageNo, pageSize) => {
    //     const params = {
    //         page: pageNo,
    //         size: pageSize
    //     }
    //     return axiosClient.get("/topic/all", { params });
    // },
    add: (data) => axiosClient.post("/topic/add", data),
    update: (id, data) => axiosClient.put(`/topic/edit/${id}`, data),
    findAllByLevelId: (id) => axiosClient.get(`/topic/find-all/${id}`),
    // delete: (id) => axiosClient.delete(`/auth/${id}`),
};
export default topicService;