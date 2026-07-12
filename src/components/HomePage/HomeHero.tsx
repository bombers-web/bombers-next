import { Box, Button, Grid, Heading, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { Image as ImageType } from '../../types/imageTypes'

type Props = {
  image?: ImageType
}

const HomeHero = ({ image }: Props) => {
  return (
    <Box bg="brand.black" overflow="hidden" color="white">
      <Grid templateColumns={{ base: '1fr', md: '1.1fr 1fr' }} minH="auto">
        {/* LEFT — text */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={{ base: 5, md: 18 }}
          py={{ base: 8, md: 24 }}
          order={{ base: 1, md: 0 }}
        >
          <Text
            fontFamily="display"
            fontWeight={700}
            fontSize="xl"
            letterSpacing="0.4em"
            color="brand.light"
            textTransform="uppercase"
            lineHeight={1}
            mt={5}
          >
            Home of the
          </Text>
          <Heading
            as="h1"
            fontFamily="display"
            fontWeight={700}
            fontSize="clamp(56px, 7.5vw, 112px)"
            letterSpacing="0.02em"
            textTransform="uppercase"
            lineHeight={0.9}
            color="brand.light"
            mt={1.5}
            mb={0}
          >
            St. Louis <br />
            Bombers
          </Heading>
          <Text
            fontFamily="body"
            fontWeight={600}
            fontSize="md"
            letterSpacing="0.5em"
            color="brand.highlight"
            textTransform="uppercase"
          >
            EST. 1962
          </Text>
          <Text
            fontFamily="body"
            fontSize="md"
            color="brand.muted"
            lineHeight={1.6}
            mt={4}
            maxW="460px"
          >
            Senior men&apos;s rugby in the heart of the Midwest. Three sides,
            one fleur-de-lis, sixty-four years on the pitch.
          </Text>
          <Box display="flex" gap={3} mt={8} flexWrap="wrap">
            <NextLink href="/contact" passHref legacyBehavior>
              <Button
                as="a"
                variant="solid"
                fontFamily="display"
                fontWeight={700}
                fontSize="md"
                letterSpacing="0.2em"
                px={8}
                py={3.5}
                height="auto"
                borderRadius={0}
                _hover={{
                  opacity: 0.9,
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                Join the Squad →
              </Button>
            </NextLink>
            <NextLink href="/club/history" passHref legacyBehavior>
              <Button
                as="a"
                variant="outline"
                fontFamily="display"
                fontWeight={700}
                fontSize="md"
                letterSpacing="0.2em"
                px={8}
                py={3.5}
                height="auto"
                borderRadius={0}
                color="white"
                borderColor="overlay.light"
                _hover={{
                  bg: 'brand.dark',
                  borderColor: 'white',
                  textDecoration: 'none',
                  color: 'brand.highlight',
                }}
              >
                Our Story
              </Button>
            </NextLink>
          </Box>
        </Box>

        {/* RIGHT — photo */}
        <Box
          position="relative"
          h={{ base: 0, md: 'auto' }}
          pb={{ base: '56.25%', md: 0 }}
          order={{ base: 0, md: 1 }}
          bg="brand.dark"
        >
          {image?.url && (
            <NextImage
              src="/static/larkin_scrum.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 48em) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
          )}
          <Box
            position="absolute"
            inset={0}
            background="linear-gradient(160deg, rgba(53,53,53,0.2) 0%, rgba(10,10,10,0.35) 100%)"
            zIndex={1}
          />
          {/* Established 1962 stamp
          <Box
            position="absolute"
            bottom={{ base: 3.5, md: 7 }}
            right={{ base: 3.5, md: 7 }}
            bg="brand.highlight"
            px={{ base: 3.5, md: 5 }}
            py={{ base: 2.5, md: 4 }}
            display="flex"
            alignItems="center"
            gap={3}
          >
            <img
              src="/static/logos/logo.png"
              alt=""
              style={{ height: '44px', width: '44px', objectFit: 'contain' }}
            />
            <Box>
              <Text
                fontFamily="display"
                fontWeight={600}
                fontSize="xs"
                letterSpacing="0.3em"
                color="brand.black"
                textTransform="uppercase"
                lineHeight={1}
                mb={0}
              >
                Established
              </Text>
              <Text
                fontFamily="display"
                fontWeight={700}
                fontSize="3xl"
                color="brand.black"
                lineHeight={1}
                mb={0}
              >
                1962
              </Text>
            </Box>
          </Box> */}
        </Box>
      </Grid>
    </Box>
  )
}

export default HomeHero
