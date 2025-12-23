import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiClock, FiMapPin } from 'react-icons/fi'
import Layout from '../../../src/common/Layout'
import Mdx from '../../../src/common/Mdx'
import { fetchAPI } from '../../../src/lib/api'

const Practice = ({ practice }) => {
  const formatTime = (timeString) => {
    if (!timeString) return ''
    const [hour, minute] = timeString.split(':')
    const h = parseInt(hour, 10)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const adjustedHour = h % 12 || 12
    return `${adjustedHour}:${minute} ${ampm}`
  }

  return (
    <Layout
      header="Practice Schedule"
      seo={{
        metaTitle: 'Practice Locations',
        shareImage: '/static/willmore_park.jpg',
        metaDescription: 'Join us Tuesdays and Thursdays for practice.',
      }}
    >
      <Box bg="gray.50" minH="100vh" py={12}>
        <VStack spacing={6} w="full" maxW="800px" mx="auto" px={4}>
          {practice?.map((section) => {
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              section?.location?.address || '',
            )}`

            return (
              <Flex
                key={section.id}
                direction="column"
                bg="white"
                borderRadius="xl"
                boxShadow="sm"
                border="1px solid"
                borderColor="gray.200"
                w="full"
                p={{ base: 6, md: 8 }}
              >
                {/* Header: Name and Schedule Info */}
                <Flex
                  justify="space-between"
                  align={{ base: 'flex-start', md: 'center' }}
                  direction={{ base: 'column', md: 'row' }}
                  mb={4}
                >
                  <Heading size="lg" color="gray.800" mb={{ base: 2, md: 0 }}>
                    {section?.location?.name}
                  </Heading>

                  <VStack
                    align={{ base: 'flex-start', md: 'flex-end' }}
                    spacing={1}
                  >
                    <Badge
                      colorScheme="blue"
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      Tuesdays & Thursdays
                    </Badge>
                    <Flex align="center" color="gray.600" fontSize="sm">
                      <Icon as={FiClock} mr={1} />
                      <Text fontWeight="bold">
                        {formatTime(section.start_time)} —{' '}
                        {formatTime(section.end_time)}
                      </Text>
                    </Flex>
                  </VStack>
                </Flex>
                <Link
                  href={mapUrl}
                  isExternal
                  display="inline-flex"
                  alignItems="center"
                  color="brand.black"
                  fontWeight="semibold"
                  fontSize="md"
                  mb={6}
                  userSelect="none"
                  transition="all 0.2s"
                  outline="none !important"
                  _hover={{ color: 'brand.gold', textDecoration: 'none' }}
                >
                  <Icon as={FiMapPin} mr={2} />
                  {section?.location?.address}
                </Link>
                <Divider mb={6} />
                <Box fontSize="md" color="gray.700" lineHeight="tall">
                  <Mdx>{section.content}</Mdx>
                </Box>
              </Flex>
            )
          })}
        </VStack>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const practice = await fetchAPI('/practices?populate=*')
  return {
    props: {
      practice: Array.isArray(practice) ? practice : [],
    },
    revalidate: 86400,
  }
}

export default Practice
