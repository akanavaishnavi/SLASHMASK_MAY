// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

export const fetchMenu = async () => {
    const response = await axios.get(`${API_URL}/menu`);
    return response.data;
};

export const placeOrder = async (order) => {
    const response = await axios.post(`${API_URL}/order`, order);
    return response.data;
};
