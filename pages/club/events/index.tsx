import {
  Box,
  Container,
  Divider,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import SectionHeader from 'common/SectionHeader'
import Layout from '../../../src/common/Layout'
import EventCard from '../../../src/components/Event/EventCard'
import { fetchAPI } from '../../../src/lib/api'

const EventsPage = ({ events }) => {
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
      <Container maxW="container.md" py={12} mx="auto">
        {/* UPCOMING EVENTS SECTION */}
        {/* Changed align to center */}
        <VStack align="center" spacing={8} mb={20} w="full">
          <Box textAlign="center">
            <SectionHeader title="Upcoming Events" />
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
          <VStack align="center" spacing={8} w="full">
            <Divider />
            <Box textAlign="center">
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
  const events = await fetchAPI('/events')

  return {
    props: { events },
    revalidate: 86400,
  }
}

export default EventsPage
