import React from 'react';
import Head from 'next/head';
import Nav from '../../components/nav';
import instance from '../../lib/instance';

const ThingPage = ({ thing }) => {
  // console.log(props);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />
      <h1>{thing.name}</h1>
    </div>
  );
};

ThingPage.getInitialProps = async ({ query }) => {
  console.log('GETTING THING PAGE PROPS');
  const res = await instance.get(`api/thing?id=${query.id}`);
  console.log({ res });

  return {
    thing: res.data,
  };
};

export default ThingPage;
