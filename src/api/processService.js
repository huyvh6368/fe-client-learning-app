import axiosClient from './axiosClient';

const processService = {
    check: (learner, question) => {
        const params = {
            learnerId: learner,
            questionId: question
        }
        return axiosClient.get("/process/check", { params });
    },
    findScore: (learner, question) => {
        const params = {
            learnerId: learner,
            questionId: question
        }
        return axiosClient.get("/process/findScore", { params });
    },
    add: (data) => axiosClient.post("/process/add", data),
};
export default processService;