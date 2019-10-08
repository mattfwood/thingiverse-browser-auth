import serverInstance from '../../lib/serverInstance';

export default async (req, res) => {
  try {
    const { thingId } = req.query;
    const { thingiverse_access_token } = req.cookies;

    if (!thingiverse_access_token) {
      return res.status(400).json({
        message: 'You must be signed in',
      });
    }

    const response = await serverInstance.post(`things/${thingId}/likes`, {
      headers: {
        authorization: `Bearer ${thingiverse_access_token}`,
      },
    });

    return res.json({ response: response.data });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
