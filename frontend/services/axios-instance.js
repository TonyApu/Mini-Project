import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.0.2.2:8080/api/v1',
});

export default instance;
