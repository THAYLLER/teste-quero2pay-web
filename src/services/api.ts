import axios from 'axios';

const api = axios.create({
  baseURL: 'https://teste-quero2pay-api.herokuapp.com',
});

export default api;
