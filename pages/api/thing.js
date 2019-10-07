import api from '../../lib/api.js';

export default async (req, res) => {
  // console.log(req.params);
  console.log(req.query);
  const { id } = req.query;

  if (!id) {
    return res.status(500).json({ success: false });
  }

  const data = await api.get(id);

  return res.json(data);
};
