import React from 'react';
import nextCookie from 'next-cookies';
import { Box } from '@chakra-ui/core';
import Nav from '../components/nav';
import instance from '../lib/instance';
import ThingsList from '../components/ThingsList';

const AccountPage = ({ likes }) => {
  return (
    <div>
      <Nav />
      <Box />
      <Box>
        <ThingsList results={likes} />
      </Box>
    </div>
  );
};

AccountPage.getInitialProps = async ctx => {
  const { thingiverse_access_token } = nextCookie(ctx);

  try {
    const res = await instance.get(`api/me`, {
      headers: {
        authorization: `Bearer ${thingiverse_access_token}`,
      },
    });

    return {
      user: res.data.user,
      likes: res.data.likes,
    };
  } catch (error) {
    console.log('CLIENT ERROR');
    console.error(error.message);
    throw new Error(error.message);
  }
};

export default AccountPage;
