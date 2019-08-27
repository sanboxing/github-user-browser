import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.post.Accept = 'application/json';
axios.defaults.timeout = 35000;

export default axios;
