import api from '../../lib/api.js';

export default async (req, res) => {
  try {
    const data = await api.search(req.query.q);

    return res.json(data);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};