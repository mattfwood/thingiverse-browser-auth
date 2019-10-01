const axios = require('axios');

const token = 'a0661fba09b18f357571f15e27cd8283';

const serverInstance = axios.create({
  baseURL: 'https://api.thingiverse.com/',
  headers: {
    'authorization': `Bearer ${token}`
  }
});

export default serverInstance;
