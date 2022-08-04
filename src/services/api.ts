import axios from 'axios';

const api = axios.create({
  baseURL: 'https://simple-blog-api-laravel.herokuapp.com/api',
  headers: { accept: 'application/json', 'Content-Type': 'application/json' },
});

export default api;
