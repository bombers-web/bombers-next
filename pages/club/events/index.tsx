import { Box, Divider, Text, VStack } from '@chakra-ui/react'
import Layout from '../../../src/common/Layout'
import EventCard from '../../../src/components/Event/EventCard'
import { fetchAPI } from '../../../src/lib/api'
import { EventType } from '../../../src/types/eventTypes'

const EventsPage = ({ events }: { events: EventType[] }) => {
  const upcomingEvents = events?.filter((e) => e.active) || []
  const featuredEvents = upcomingEvents.filter((e) => e.featured)
  const regularEvents = upcomingEvents.filter((e) => !e.featured)
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  const pastEvents =
    events?.filter((e) => !e.active && new Date(e.date) >= sixMonthsAgo) || []

  return (
    <Layout
      header="Club Events & Socials"
      seo={{
        metaTitle: 'Events | St. Louis Bombers Rugby',
        metaDescription:
          'Stay up to date with the latest Bombers matches, fundraisers, and social events.',
      }}
    >
      <Box maxW="780px" mx="auto" mt={6} mb={12} px={4}>
        {/* UPCOMING */}
        <Text
          textAlign="center"
          textTransform="uppercase"
          letterSpacing="widest"
          fontWeight="800"
          fontSize="xl"
          color="brand.medium"
          mb={6}
        >
          Upcoming Events
        </Text>
        <VStack spacing={6} align="stretch" mb={12}>
          {upcomingEvents.length > 0 ? (
            <>
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
              {regularEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </>
          ) : (
            <Box
              bg="blackAlpha.400"
              borderRadius="2xl"
              p={10}
              textAlign="center"
            >
              <Text
                color="whiteAlpha.400"
                fontSize="sm"
                textTransform="uppercase"
                letterSpacing="widest"
              >
                No upcoming events scheduled. Check back soon!
              </Text>
            </Box>
          )}
        </VStack>

        {/* PAST EVENTS */}
        {pastEvents.length > 0 && (
          <VStack spacing={4} align="stretch">
            <Divider borderColor="brand.medium" opacity={0.3} mt={6} />
            <Text
              textAlign="center"
              textTransform="uppercase"
              letterSpacing="widest"
              fontWeight="800"
              fontSize="xl"
              color="brand.meta"
            >
              Past Events
            </Text>
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} isPast />
            ))}
          </VStack>
        )}
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const events = await fetchAPI('/events?populate=*')

  return {
    props: { events },
    revalidate: 86400,
  }
}

export default EventsPage
