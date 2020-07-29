import axios from 'axios';

const api = axios.create({
  baseURL: 'https://teste-quero2pay-api.herokuapp.com',
  // baseURL: 'http://localhost:3333',
});

export default api;
