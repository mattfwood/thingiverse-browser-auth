import React from 'react';
import Link from 'next/link';
import { Box, Image, Link as StyledLink } from '@chakra-ui/core';

function ThingCard({ thing }) {
  console.log({ thing });
  return (
    <Link href={`/thing/${thing.id}`}>
      <StyledLink
        position="relative"
        transition="180ms all ease"
        _hover={{
          // boxShadow: '1px 4px 4px rgba(0, 0, 0, 0.9)',
          transform: 'translateY(-2px)',
        }}
      >
        <Box
          borderWidth="1px"
          height="200px"
          rounded="lg"
          background={`linear-gradient(180deg, transparent 29.72%, rgba(0,0,0,0.9) 100%),url(${thing.thumbnail.replace(
            '_thumb_medium',
            '_preview_card'
          )})`}
        >
          {/* <Image
            src={thing.thumbnail.replace('_thumb_medium', '_preview_card')}
            alt={thing.name}
          /> */}
          <Box
            mt="1"
            fontWeight="semibold"
            position="absolute"
            bottom={1}
            lineHeight="tight"
            padding={2}
            color="#fff"
            _hover={{
              textDecoration: 'underline',
            }}
          >
            {thing.name}
          </Box>
        </Box>
      </StyledLink>
    </Link>
  );
}

export default ThingCard;
