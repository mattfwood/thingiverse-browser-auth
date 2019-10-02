import React from 'react'
import Link from 'next/link'
import { Box, Image, Link as StyledLink } from '@chakra-ui/core';

function ThingCard({ thing }) {
  console.log({ thing })
  return (
    <Box borderWidth="1px" maxW="300px" rounded="lg" marginBottom="8px">
      <Image src={thing.thumbnail.replace('_thumb_medium', '_preview_card')}  alt={thing.name} />

      <Box p="3">
        {/* <Box d="flex" alignItems="baseline">
          <Badge rounded="full" px="2" variantColor="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            2 beds &bull; 3 baths
          </Box>
        </Box> */}

        <Box
          mt="1"
          fontWeight="semibold"
          lineHeight="tight"
          isTruncated
        >
          <Link href={`/thing/${thing.id}`}>
            <StyledLink as="h4">
              {thing.name}
            </StyledLink>
          </Link>

        </Box>

        {/* <Box>
          3
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box> */}

        {/* <Box d="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            2 reviews
          </Box>
        </Box> */}
      </Box>
    </Box>
  )
}

export default ThingCard;