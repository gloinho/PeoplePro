import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
});

export const get = async (url, params = {}) => {
    const response = await instance.get(url, { params });
    return response.data;
};

export const post = async (url, data = {}) => {
    const response = await instance.post(url, data);
    return response.data;
};
