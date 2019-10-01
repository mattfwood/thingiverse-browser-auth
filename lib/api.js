const axios = require('axios');

const token = 'a0661fba09b18f357571f15e27cd8283';

const serverInstance = axios.create({
  baseURL: 'https://api.thingiverse.com/',
  headers: {
    'authorization': `Bearer ${token}`
  }
});

const api = {
  search: async (query) => {
    try {
      const res = await serverInstance.get(`search/${query}?per_page=30`, {
        headers: {
          'authorization': `Bearer ${token}`
        }
      });

      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  get: async (id) => {
    if (!id) {
      console.error('No ID provided');
    }

    try {
      const [res, images] = await Promise.all([
        serverInstance.get(`things/${id}`),
        serverInstance.get(`things/${id}/images`)
      ])

      return {
        ...res.data,
        images: images.data,
      }
    } catch (error) {
      // console.error(error);
      throw new Error(error);
    }
  }
}

// api.search('pandemic')

module.exports = api;