import axios from 'axios';
import { BASE_API_URL } from '../constants';

const tokenFromBrowser = localStorage.getItem('cake-user-token');

const token = tokenFromBrowser ? tokenFromBrowser : '';

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    Authorization: token
  }
});

export default api;
