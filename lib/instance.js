import axios from 'axios';
const keys = require('../config');

const instance = axios.create({
  baseURL: keys.host,
});

export default instance;
