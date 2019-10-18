import React, { useState, useEffect } from 'react';
import { Input, Flex, IconButton } from '@chakra-ui/core';
import { FiSearch } from 'react-icons/fi';
import instance from '../lib/instance';
import ThingsList from './ThingsList';

const useSyncQuery = (key, value) => {
  useEffect(() => {
    if (value && value !== '') {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set(key, value);
      const newPath = `${window.location.pathname}?${searchParams.toString()}`;
      history.pushState(null, '', newPath);
    } else {
      history.pushState(null, '', window.location.pathname);
    }
  }, [key, value]);
};

const SearchView = ({ initialResults = [], query = '' }) => {
  const [value, setValue] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(initialResults);

  useSyncQuery('q', value);

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
