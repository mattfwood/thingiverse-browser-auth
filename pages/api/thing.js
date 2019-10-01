import api from '../../lib/api.js';

export default async (req, res) => {
  const data = await api.get(req.params.id);

  return res.json(data);
};