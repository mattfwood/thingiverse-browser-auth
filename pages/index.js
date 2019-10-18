import React from 'react';
import Head from 'next/head';
import instance from '../lib/instance';
import Nav from '../components/nav';
import SearchView from '../components/SearchView';

const Home = ({ results, query }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />

      <SearchView initialResults={results} query={query} />

      {/* <ThingsList results={results} /> */}
    </div>
  );
};

Home.getInitialProps = async ({ query }) => {
  const res = await instance.get(`api/search?q=${query.q}`);

  return {
    results: res.data,
    query: query.q,
  };
};

export default Home;
