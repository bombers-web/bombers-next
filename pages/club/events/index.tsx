import { Box, Text, VStack } from '@chakra-ui/react'
import Layout from '../../../src/common/Layout'
import EventCard from '../../../src/components/Event/EventCard'
import SectionHeading from 'common/SectionHeading'
import SectionLabel from 'common/SectionLabel'
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
      mainBg="brand.bg"
      seo={{
        metaTitle: 'Events | St. Louis Bombers Rugby',
        metaDescription:
          'Stay up to date with the latest Bombers matches, fundraisers, and social events.',
      }}
    >
      {/* Dark page header */}
      <Box
        bg="brand.black"
        color="white"
        py={{ base: 10, md: 12 }}
        px={{ base: 4, md: 8 }}
      >
        <Box maxW="1100px" mx="auto">
          <SectionHeading
            eyebrow="On the Calendar"
            heading={<>Club Events</>}
            eyebrowColor="brand.highlight"
            headingColor="white"
            as="h1"
            headingSize="clamp(48px, 5.5vw, 72px)"
            mb="1rem"
          />
        </Box>
      </Box>

      {/* Content */}
      <Box
        maxW="1100px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 10, md: 14 }}
      >
        <SectionLabel>Upcoming Events</SectionLabel>

        <VStack spacing="14px" align="stretch" mb={12}>
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
              bg="brand.mediumSecondary"
              borderRadius="sm"
              p={10}
              textAlign="center"
            >
              <Text
                color="whiteAlpha.400"
                fontFamily="display"
                fontSize="13px"
                textTransform="uppercase"
                letterSpacing="0.3em"
              >
                No upcoming events scheduled. Check back soon!
              </Text>
            </Box>
          )}
        </VStack>

        {pastEvents.length > 0 && (
          <>
            <SectionLabel mt={14}>Past Events</SectionLabel>
            <VStack spacing="14px" align="stretch">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </VStack>
          </>
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
