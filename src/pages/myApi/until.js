// api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // 设置API的基础URL
  timeout: 5000, // 设置请求超时时间
});

// 可以在这里设置请求拦截器、响应拦截器等其他Axios配置

export default api;
