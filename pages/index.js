import React from 'react';
import Head from 'next/head';
import { Box, Input } from '@chakra-ui/core';
import instance from '../lib/instance';
import Nav from '../components/nav';
import ThingsList from '../components/ThingsList';
import SearchView from '../components/SearchView';

const Home = ({ results }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />

      <SearchView initialResults={results} />

      {/* <ThingsList results={results} /> */}
    </div>
  );
};

Home.getInitialProps = async ({ query }) => {
  const res = await instance.get(`api/search?q=${query.q}`);

  return {
    results: res.data,
  };
};

export default Home;
