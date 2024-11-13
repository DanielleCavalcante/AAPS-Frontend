import axios from "axios";

const api = axios.create({
    baseURL:'https://localhost:44335'
});

export default api;