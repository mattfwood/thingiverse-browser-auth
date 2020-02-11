import React, { useState } from 'react';
import Head from 'next/head';
import {
  Heading,
  Flex,
  Box,
  Stat,
  StatLabel,
  Button,
  StatNumber,
  StatGroup,
  StatHelpText,
  Link,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
} from '@chakra-ui/core';
import ImageGallery from 'react-image-gallery';
import { FiDownload, FiExternalLink, FiHeart } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, Maximize } from 'react-feather';

import Nav from '../../components/nav';
import instance from '../../lib/instance';

import '../../slider.css';

const MaxContainer = styled.div`
  max-width: ${p => p.width || 1080}px;
  margin: auto;
`;

const ICON_SIZE = 18;

const GalleryButton = ({ direction, ...props }) => {
  const isLeft = direction === 'left';

  const buttonProps = {
    [direction]: 0,
    // eslint-disable-next-line
    icon: () =>
      isLeft ? (
        <ChevronLeft size={ICON_SIZE} />
      ) : (
        <ChevronRight size={ICON_SIZE} />
      ),
  };

  return (
    <IconButton
      {...buttonProps}
      mx={3}
      size="md"
      bg="#fff"
      borderRadius="100%"
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      zIndex={50}
      {...props}
    />
  );
};

const ThingPage = ({ thing }) => {
  console.log({ thing });
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const displayImages = thing.images.reduce((images, image) => {
    const largeDisplayImage = image.sizes.find(
      size => size.size === 'large' && size.type === 'display'
    );

    if (largeDisplayImage) {
      images.push(largeDisplayImage);
    }
    return images;
  }, []);

  const handleLike = async () => {
    setIsLoading(true);

    if (!isLiked) {
      const res = await instance.get(`api/like?thingId=${thing.id}`);

      if (res.data.response.ok === 'ok') {
        setIsLiked(true);
      }
    } else {
      setIsLiked(false);
    }

    setIsLoading(false);
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const res = await instance.get(`api/download?id=${thing.id}`);

      const url = res.data.data.public_url;

      window.open(url, '_blank');
    } catch (error) {
      console.error(error.message);
    }

    setIsDownloading(false);
  };

  const isLikedValue = isLiked ? 1 : 0;

  const color = isLiked ? 'red' : 'none';

  const HeartIcon = () => (
    <FiHeart fill={color} color={color} style={{ marginLeft: 8 }} />
  );

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <Nav />
      <MaxContainer width={768}>
        <Box margin="0 20px 20px 20px">
          {/* <Slider {...sliderSettings}>
            {displayImages.map(image => (
              <Image key={image.url} id={image.url} src={image.url} />
            ))}
          </Slider> */}
          <ImageGallery
            items={displayImages.map(image => ({
              original: image.url,
              thumbnail: image.url,
            }))}
            showPlayButton={false}
            renderRightNav={(onClick, disabled) => (
              <GalleryButton
                direction="right"
                onClick={onClick}
                disabled={disabled}
              />
            )}
            renderLeftNav={(onClick, disabled) => (
              <GalleryButton
                direction="left"
                onClick={onClick}
                disabled={disabled}
              />
            )}
            renderFullscreenButton={(onClick, disabled) => (
              <GalleryButton
                direction="left"
                icon={() => <Maximize />}
                position="absolute"
                right="0"
                bottom="0"
                my="15px"
                top="initial"
                left="initial"
                transform="initial"
                // padding="15px 20px"
                onClick={onClick}
                disabled={disabled}
              />
            )}
          />
        </Box>
        <Flex justifyContent="space-between" padding={3}>
          <Button
            isLoading={isDownloading}
            onClick={handleDownload}
            rightIcon={FiDownload}
          >
            Download Files
          </Button>
          <Button
            isLoading={isLoading}
            onClick={handleLike}
            rightIcon={HeartIcon}
          >
            {thing.like_count + isLikedValue} Likes
          </Button>
        </Flex>
        <Flex padding={3} flexDirection="column">
          <Tabs>
            <TabList>
              <Tab>Details</Tab>
              <Tab>Files</Tab>
              {/* <Tab>Three</Tab> */}
            </TabList>

            <TabPanels>
              <TabPanel>
                <Link isExternal href={thing.public_url}>
                  <Heading marginTop={2}>
                    {thing.name}{' '}
                    <Icon as={FiExternalLink} size="22px" mb="4px" />
                  </Heading>
                </Link>
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
                            {Object.entries(section.data[0]).map(
                              ([key, value]) => (
                                <Stat>
                                  <StatLabel textTransform="capitalize">
                                    {key.replace('_', ' ')}:
                                  </StatLabel>
                                  <StatHelpText>{value}</StatHelpText>
                                </Stat>
                              )
                            )}
                          </>
                        ) : (
                          <ReactMarkdown source={section.data[0].content} />
                        )}
                      </>
                    );
                  })}
                </Box>
              </TabPanel>
              <TabPanel>
                <i>Coming Soon</i>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </MaxContainer>
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
