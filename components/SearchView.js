import React, { useState } from 'react';
import {
  Box,
  Input,
  Flex,
  Button,
  InputGroup,
  InputRightAddon,
  IconButton,
} from '@chakra-ui/core';
import { FiSearch } from 'react-icons/fi';
import instance from '../lib/instance';
import ThingsList from './ThingsList';

const SearchView = ({ initialResults = [] }) => {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(initialResults);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const res = await instance.get(`api/search?q=${value}`);
    setResults(res.data);
    setIsLoading(false);
  };

  return (
    <div>
      <Flex
        as="form"
        onSubmit={handleSubmit}
        justifyContent="center"
        padding={8}
      >
        <Input
          value={value}
          onChange={handleChange}
          maxWidth="400px"
          width="100%"
          isDisabled={isLoading}
          placeholder="Search"
          roundedRight="0"
        />
        <IconButton
          isLoading={isLoading}
          icon={FiSearch}
          type="submit"
          roundedLeft="0"
        />
      </Flex>
      <ThingsList results={results} />
    </div>
  );
};

export default SearchView;
