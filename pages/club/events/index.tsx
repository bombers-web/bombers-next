import {
  Box,
  Container,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import Layout from '../../../src/common/Layout'
import EventCard from '../../../src/components/Event/EventCard'
import { fetchAPI } from '../../../src/lib/api'

const EventsPage = ({ events }) => {
  // Separate events based on the "active" flag in your JSON
  const upcomingEvents = events?.filter((e) => e.active) || []
  const pastEvents = events?.filter((e) => !e.active) || []

  return (
    <Layout
      header="Club Events & Socials"
      seo={{
        metaTitle: 'Events | St. Louis Bombers Rugby',
        metaDescription:
          'Stay up to date with the latest Bombers matches, fundraisers, and social events.',
      }}
    >
      <Container maxW="container.md" py={12}>
        {/* UPCOMING EVENTS SECTION */}
        <VStack align="start" spacing={8} mb={20}>
          <Box>
            <Heading as="h1" size="2xl" mb={2}>
              Upcoming Events
            </Heading>
            <Text color="gray.500">
              Don't miss out on the next club social or match day fundraiser.
            </Text>
          </Box>

          <VStack w="full" spacing={6}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <Box
                p={10}
                textAlign="center"
                w="full"
                bg="gray.50"
                borderRadius="xl"
              >
                <Text color="gray.400">
                  No upcoming events scheduled. Check back soon!
                </Text>
              </Box>
            )}
          </VStack>
        </VStack>

        {/* PAST EVENTS / ARCHIVE */}
        {pastEvents.length > 0 && (
          <VStack align="start" spacing={8}>
            <Divider />
            <Box>
              <Heading as="h2" size="lg">
                Past Events
              </Heading>
              <Text color="gray.500" fontSize="sm">
                A look back at our recent gatherings.
              </Text>
            </Box>

            <SimpleGrid columns={[1, 1, 2]} spacing={6} w="full">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </SimpleGrid>
          </VStack>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  // Fetch events from your Strapi API
  const events = await fetchAPI('/events')

  return {
    props: { events },
    revalidate: 60, // Refresh every minute for time-sensitive events
  }
}

export default EventsPage
