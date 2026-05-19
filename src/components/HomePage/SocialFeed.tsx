import { Box, Button, Flex, Grid, Heading, Link, Text } from '@chakra-ui/react'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

const INSTAGRAM_URL = 'https://www.instagram.com/stl_bombersrfc/'
const FACEBOOK_URL = 'https://www.facebook.com/stlbombersrugby'

export const SocialFeed = () => {
  return (
    <Box
      bg="brand.mediumSecondary"
      borderRadius="2xl"
      p={6}
      my={4}
      boxShadow="xl"
      w="full"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading
          size="md"
          color="brand.light"
          textTransform="uppercase"
          letterSpacing="wider"
          margin={0}
        >
          From the Sideline
        </Heading>
        <Link
          href={INSTAGRAM_URL}
          isExternal
          color="whiteAlpha.500"
          fontSize="xs"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wide"
          _hover={{ color: 'brand.highlight', textDecoration: 'none' }}
        >
          @stl_bombersrfc →
        </Link>
      </Flex>

      {/* Photo grid with overlay CTA */}
      <Box position="relative" borderRadius="xl" overflow="hidden">
        <Grid
          templateColumns={{ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' }}
          gap={1}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} h={{ base: '80px', md: '100px' }} bg="whiteAlpha.50" />
          ))}
        </Grid>

        {/* Overlay */}
        <Flex
          position="absolute"
          inset={0}
          align="center"
          justify="center"
          bg="blackAlpha.800"
          borderRadius="xl"
          direction="column"
          gap={3}
        >
          <Flex gap={4} align="center">
            <FontAwesomeIcon
              icon={faInstagram as IconProp}
              color="white"
              fontSize="1.8rem"
            />
            <FontAwesomeIcon
              icon={faFacebook as IconProp}
              color="white"
              fontSize="1.8rem"
            />
          </Flex>
          <Text
            color="white"
            fontWeight="bold"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Follow the Bombers
          </Text>
          <Flex gap={3} wrap="wrap" justify="center">
            <Link
              href={INSTAGRAM_URL}
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              <Button
                size="sm"
                bg="brand.highlight"
                color="brand.dark"
                fontWeight="black"
                textTransform="uppercase"
                fontSize="xs"
                _hover={{ bg: 'yellow.200' }}
              >
                Instagram
              </Button>
            </Link>
            <Link
              href={FACEBOOK_URL}
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              <Button
                size="sm"
                variant="outline"
                borderColor="whiteAlpha.400"
                color="white"
                fontWeight="black"
                textTransform="uppercase"
                fontSize="xs"
                _hover={{
                  borderColor: 'brand.highlight',
                  color: 'brand.highlight',
                }}
              >
                Facebook
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
