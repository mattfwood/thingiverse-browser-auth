import React from 'react';
import styled from 'styled-components';
import ThingCard from './ThingCard';

const Grid = styled.div`
  display: grid;
  align-items: center;
  padding: 10px;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const ThingsList = ({ results }) => {
  return (
    <Grid>
      {results.map(result => (
        <ThingCard key={result.id} thing={result} />
      ))}
    </Grid>
  );
};

export default ThingsList;
