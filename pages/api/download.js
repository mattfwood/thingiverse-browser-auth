import serverInstance from '../../lib/serverInstance.js';

export default async (req, res) => {
  // console.log(req.params);
  console.log('Starting Download');
  const { id } = req.query;

  if (!id) {
    return res
      .status(500)
      .json({ success: false, message: 'Thing ID Required' });
  }

  const response = await serverInstance.get(`things/${id}/package-url`);

  return res.json({ data: response.data });
};
