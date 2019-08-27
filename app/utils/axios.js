import axios from 'axios';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.post.Accept = 'application/json';

export default axios;
