import serverInstance from '../../lib/serverInstance';

const { parse } = require('cookie');

export default async (req, res) => {
  try {
    const { thingiverse_access_token } = req.cookies;

    if (!thingiverse_access_token) {
      return res.status(400).json({
        message: 'You must be signed in',
      });
    }

    const response = await serverInstance.get('users/me', {
      headers: {
        authorization: `Bearer ${thingiverse_access_token}`,
      },
    });

    const response2 = await serverInstance.get('users/me/likes', {
      headers: {
        authorization: `Bearer ${thingiverse_access_token}`,
      },
    });

    console.log(response2.data);

    return res.json({ user: response.data, likes: response2.data });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
