import axios from 'axios';

const api = axios.create({
    baseURL: "https://email-server-edson.herokuapp.com/"
});

export default api;