import axios from "axios";

const url = {
    baseUrl: 'https://localhost:5001',
    contents: '/api/quan-ly-tool'
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
    get: instance.get,
    post: instance.post,
    put: instance.put,
    delete: instance.delete,
};

export default api;
