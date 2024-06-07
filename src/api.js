import axios from "axios";


const BASE_URL = 'http://localhost:8080'; 

export default{
    saveQuestionnaire(questionnaire) {
        return axios.post(`${BASE_URL}/questionnaires`, questionnaire);
    },
    getAllQuestionnaires() {
        return axios.get(`${BASE_URL}/questionnaires`);
    },
    getQuestionnaires(params) {
        return axios.get(`${BASE_URL}/questionnaires`, { params: params });
    },
    deleteQuestionnaire(id) {
        return axios.delete(`${BASE_URL}/questionnaires/${id}`);
    }
}