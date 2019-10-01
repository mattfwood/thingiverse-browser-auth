import React from 'react';
import Head from 'next/head';
import { Button, Input } from '@chakra-ui/core';
import instance from '../lib/instance';
import Nav from '../components/nav';

const Home = ({ results }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />

      {/* <div className='hero'>
        <Input placeholder="Basic usage" />
        <Button variantColor="green">Button</Button>
      </div> */}
    </div>
  )
}

Home.getInitialProps = async ({ query, ...props }) => {
  const res = await instance.get(`api/search?q=${query.q}`);

  return {
    results: res.data,
  }
}

export default Home
