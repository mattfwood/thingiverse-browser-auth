import React from 'react';
import Head from 'next/head';
import { Button, Input, Flex } from '@chakra-ui/core';
import instance from '../lib/instance';
import Nav from '../components/nav';
import ThingCard from './ThingCard';

const ThingsList = ({ results }) => {
  return (
    <Flex flexWrap="wrap" justifyContent="space-around" paddingTop="10px">
      {results.map(result => (
        <ThingCard key={result.id} thing={result} />
      ))}
    </Flex>
  )
}

export default ThingsList