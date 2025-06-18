import axiosClient from './axiosClient'
const mailService = {

    forgot: (data) => axiosClient.post("/email/forgot", data),

};
export default mailService;