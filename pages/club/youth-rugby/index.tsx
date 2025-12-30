import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image, // Make sure to add this to your imports!
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiExternalLink, FiGlobe, FiMail } from 'react-icons/fi'
import Layout from '../../../src/common/Layout'
import SectionHeader from '../../../src/common/SectionHeader'
import { fetchAPI } from '../../../src/lib/api'

const YouthRugby = ({ youthTeams }) => {
  return (
    <Layout
      header="Youth Rugby"
      cover={{
        url: '/static/jets_mark.jpg',
        alternativeText: 'Youth Rugby',
      }}
      seo={{
        metaTitle: 'Youth Rugby Clubs | St. Louis',
        shareImage: '/static/jets_mark.jpg',
        metaDescription:
          'Discover youth rugby opportunities in the St. Louis area.',
      }}
    >
      <Box bg="gray.50" py={12}>
        <VStack spacing={10} maxW="1000px" mx="auto" px={4}>
          <VStack>
            <SectionHeader title="Youth Rugby Clubs in St. Louis" />
            <Text fontSize="lg" color="gray.600" maxW="2xl" textAlign="center">
              St. Louis is home to several incredible youth rugby programs.
              Explore the clubs below to get involved.
            </Text>
          </VStack>

          {youthTeams?.map((team) => {
            // Strapi image paths are usually: team.image.url
            // If you use a local provider, you might need to prefix the API URL
            const imageUrl = team.image?.url || null

            return (
              <Flex
                key={team.id}
                direction={{ base: 'column', lg: 'row' }}
                bg="white"
                w="full"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="0 4px 20px rgba(0,0,0,0.05)"
                border="1px solid"
                borderColor="gray.100"
                transition="all 0.3s ease"
                _hover={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              >
                {/* Standard Box Container */}
                <Box
                  w={{ base: 'full', lg: '350px' }}
                  bg="brand.dark"
                  minH="250px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Image
                    src={imageUrl}
                    alt={team.name}
                    objectFit="cover"
                    w="100%"
                    h="100%"
                    fallback={
                      <Icon
                        as={FiGlobe}
                        color="whiteAlpha.300"
                        fontSize="5xl"
                      />
                    }
                  />
                </Box>

                {/* Content Area */}
                <Stack
                  spacing={4}
                  p={{ base: 6, md: 8 }}
                  flex="1"
                  justify="center"
                >
                  <Flex justify="space-between" align="flex-start">
                    <VStack align="flex-start" spacing={1}>
                      <Badge
                        colorScheme="yellow"
                        variant="subtle"
                        borderRadius="md"
                      >
                        Youth Club
                      </Badge>
                      <Heading size="lg" color="gray.800">
                        {team.name}
                      </Heading>
                    </VStack>
                  </Flex>

                  <Text color="gray.600" fontSize="md" lineHeight="tall">
                    {team.description ||
                      'Learn more about youth rugby opportunities with this club.'}
                  </Text>

                  <Flex gap={4} pt={4} wrap="wrap">
                    <Button
                      as={Link}
                      href={team.website}
                      isExternal
                      leftIcon={<FiExternalLink />}
                      bg="brand.dark"
                      color="white"
                      _hover={{ bg: 'brand.medium', textDecoration: 'none' }}
                      flex={{ base: '1', md: 'initial' }}
                    >
                      Visit Website
                    </Button>

                    <Button
                      as={Link}
                      href={`mailto:${team.email}`}
                      leftIcon={<FiMail />}
                      variant="outline"
                      borderColor="gray.300"
                      _hover={{ bg: 'gray.50', textDecoration: 'none' }}
                      flex={{ base: '1', md: 'initial' }}
                    >
                      Email Club
                    </Button>
                  </Flex>
                </Stack>
              </Flex>
            )
          })}
        </VStack>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const youthTeams = await fetchAPI('/youths?populate=image')

  return {
    props: {
      youthTeams: Array.isArray(youthTeams) ? youthTeams : [],
    },
  }
}

export default YouthRugby
