import serverInstance from './serverInstance';

const api = {
  search: async query => {
    try {
      const res = await serverInstance.get(`search/${query}?per_page=30`);

      return res.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  get: async id => {
    console.log('GETTING THING');
    if (!id) {
      console.error('No ID provided');
    }

    try {
      const [res, images] = await Promise.all([
        serverInstance.get(`things/${id}`),
        serverInstance.get(`things/${id}/images`),
      ]);

      return {
        ...res.data,
        images: images.data,
      };
    } catch (error) {
      // console.error(error);
      throw new Error(error);
    }
  },
};

// api.search('pandemic')

// module.exports = api;
export default api;
