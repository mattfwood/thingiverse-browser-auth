import serverInstance from '../../lib/serverInstance';

export default async (req, res) => {
  try {
    if (!('authorization' in req.headers)) {
      return res.status(401).send('Authorization header missing');
    }

    const auth = await req.headers.authorization;

    // @TODO: Make parallel
    const response = await serverInstance.get('users/me', {
      headers: {
        authorization: auth,
      },
    });

    const response2 = await serverInstance.get('users/me/likes', {
      headers: {
        authorization: auth,
      },
    });

    // console.log(response2.data);

    return res.json({ user: response.data, likes: response2.data });
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
