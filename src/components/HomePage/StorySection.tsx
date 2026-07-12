import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import NextImage from 'next/image'

const StorySection = () => {
  return (
    <Box
      id="story"
      bg="brand.light"
      w="full"
      py={{ base: 14, md: 20 }}
      px={{ base: 4, md: 8 }}
    >
      <Box maxW="1280px" mx="auto">
        {/* Eyebrow */}
        <Flex align="center" gap={4} mb={4}>
          <Box w={8} h="2px" bg="brand.highlight" flexShrink={0} />
          <Text
            fontFamily="display"
            fontWeight="bold"
            fontSize="sm"
            letterSpacing="widest"
            color="brand.dark"
            textTransform="uppercase"
          >
            The Club
          </Text>
        </Flex>

        <Grid
          templateColumns={{ base: '1fr', md: '1.2fr 1fr' }}
          gap={{ base: 10, md: 14 }}
          alignItems="center"
        >
          {/* Text column */}
          <Box>
            <Heading
              fontFamily="display"
              fontWeight="extrabold"
              fontSize={{ base: '4xl', md: '5xl', lg: '7xl' }}
              letterSpacing="tight"
              color="brand.dark"
              textTransform="uppercase"
              lineHeight="none"
              mb={6}
            >
              Sixty-four years.
              <br />
              <Text as="span" color="brand.highlight">
                One city.
              </Text>
              <br />
              One crest.
            </Heading>
            <Text
              fontFamily="body"
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.700"
              lineHeight="tall"
              mt={6}
              mb={4}
              maxW="540px"
            >
              Founded in 1962 and forged from a proud St. Louis rugby tradition,
              the Bombers have been a cornerstone of the game in the Gateway
              City for over six decades. From early Missouri Rugby Union
              Championships to the national stage, we&rsquo;ve always played
              with grit, brotherhood, and a relentless drive to win —
              culminating in our 2024 USA Club Rugby D1 National Championship.
            </Text>
            <Text
              fontFamily="body"
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.700"
              lineHeight="tall"
              maxW="540px"
            >
              <strong>Come play. Come support. Paint it black.</strong>
            </Text>
          </Box>

          {/* Photo column */}
          <Box
            position="relative"
            h={{ base: 0, md: 'auto' }}
            pb={{ base: '75%', md: 0 }}
            minH={{ base: 0, md: '500px' }}
            borderRadius="sm"
            border="1px solid black"
            overflow="hidden"
          >
            <NextImage
              src="/static/DSC_0795.JPG"
              alt="Action shot from match day in Dallas"
              fill
              sizes="(max-width: 48em) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default StorySection
