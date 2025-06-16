import axiosClient from './axiosClient';

const learnerTopicService = {
    check: (learner, topic) => {
        const params = {
            learnerId: learner,
            topicId: topic
        }
        return axiosClient.get("/learner-topic/check", { params });
    },
    add: (data) => axiosClient.post("/learner-topic/add", data),
};
export default learnerTopicService;