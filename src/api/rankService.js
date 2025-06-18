import axiosClient from './axiosClient'
const rankService = {
    getAll: (pageNo, pageSize) => {
        const params = {
            page: pageNo,
            size: pageSize
        }
        return axiosClient.get("/rank/all", { params });
    },
};
export default rankService;