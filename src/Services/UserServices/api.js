import axios from "axios";

const url = {
    baseUrl: 'https://localhost:5001',
    contents: '/api/quan-ly-user'
};

const instance = axios.create({
    baseURL: url.baseUrl,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
    },
});

const api = {
    url,
    instance,
    post: instance.post,
};

export default api;
