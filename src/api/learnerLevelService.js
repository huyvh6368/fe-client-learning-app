import axiosClient from './axiosClient';

const learnerLevelService = {
    check: (learner, level) => {
        const params = {
            learnerId: learner,
            levelId: level
        }
        return axiosClient.get("/learner-level/check", { params });
    },
    add: (data) => axiosClient.post("/learner-level/add", data),
};
export default learnerLevelService;