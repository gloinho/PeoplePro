import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000,
});

export const get = async (url, params = {}) => {
    const response = await instance.get(url, { params });
    return response.data;
};

export const post = async (url, data = {}) => {
    const path = `${instance.baseURL}/${url}`;
    const response = await instance.post(path, data);
    return response.data;
};
