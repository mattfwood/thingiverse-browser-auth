import React from 'react';
import Head from 'next/head';
import {
  Heading,
  Flex,
  Image,
  Box,
  Stat,
  StatLabel,
  Button,
  StatNumber,
  StatGroup,
  StatHelpText,
} from '@chakra-ui/core';
import Slider from 'react-slick';
import { FiHeart } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

import Nav from '../../components/nav';
import instance from '../../lib/instance';

function SliderArrow({ className, style, onClick }) {
  return (
    <button
      type="button"
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'black',
        opacity: 0.75,
        height: '100%',
      }}
      onClick={onClick}
    />
  );
}

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  nextArrow: <SliderArrow />,
  prevArrow: <SliderArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ThingPage = ({ thing }) => {
  console.log({ thing });
  const displayImages = thing.images.reduce((images, image) => {
    const largeDisplayImage = image.sizes.find(
      size => size.size === 'large' && size.type === 'display'
    );

    if (largeDisplayImage) {
      images.push(largeDisplayImage);
    }
    return images;
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />
      <Box margin="0 20px 20px 20px">
        <Slider {...sliderSettings}>
          {displayImages.map(image => (
            <Image id={image.url} src={image.url} />
          ))}
        </Slider>
      </Box>
      <Flex padding={3} flexDirection="column">
        <Flex justifyContent="flex-end">
          <Button rightIcon={FiHeart}>{thing.like_count} Likes</Button>
        </Flex>
        <Heading marginTop={2}>{thing.name}</Heading>
        <Box paddingY={3}>
          <StatGroup>
            <Stat>
              <StatLabel>Views</StatLabel>
              <StatNumber>{thing.view_count}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Downloads</StatLabel>
              <StatNumber>{thing.download_count}</StatNumber>
            </Stat>
          </StatGroup>
        </Box>
        <Box paddingY={3} className="thing-text-content">
          {thing.details_parts.map(section => {
            if (!section.data) {
              return null;
            }

            return (
              <>
                <Heading size="lg" mb={2}>
                  {section.name}
                </Heading>
                {section.type === 'settings' ? (
                  <>
                    {Object.entries(section.data[0]).map(([key, value]) => (
                      <Stat>
                        <StatLabel textTransform="capitalize">
                          {key.replace('_', ' ')}:
                        </StatLabel>
                        <StatHelpText>{value}</StatHelpText>
                      </Stat>
                    ))}
                  </>
                ) : (
                  <ReactMarkdown source={section.data[0].content} />
                )}
              </>
            );
          })}
        </Box>
      </Flex>
    </div>
  );
};

ThingPage.getInitialProps = async ({ query }) => {
  const res = await instance.get(`api/thing?id=${query.id}`);

  return {
    thing: res.data,
  };
};

export default ThingPage;
