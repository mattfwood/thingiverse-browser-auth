import React from 'react';
import Nav from '../components/nav';
import instance from '../lib/instance';

const AccountPage = (props) => {
  console.log(props)
  return (
    <div>
      <Nav />

      Account Page
    </div>
  )
}

AccountPage.getInitialProps = async ({ query }) => {
  try {
    const res = await instance.get(`api/me`);

    return {
      user: res.data,
    }
  } catch (error) {
    console.log('CLIENT ERROR');
    console.error(error.message);
    throw new Error(error.message);
  }
}

export default AccountPage;