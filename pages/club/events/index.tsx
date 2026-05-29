import { Box, Divider, Flex, Text, VStack } from '@chakra-ui/react'
import Layout from '../../../src/common/Layout'
import EventCard from '../../../src/components/Event/EventCard'
import { fetchAPI } from '../../../src/lib/api'
import { EventType } from '../../../src/types/eventTypes'

function SectionLabel({ children, mt }: { children: string; mt?: number }) {
  return (
    <Flex align="center" gap={3} mb={6} mt={mt}>
      <Divider borderColor="gray.300" my={0} />
      <Text
        fontFamily="display"
        fontWeight={600}
        fontSize="13px"
        letterSpacing="0.42em"
        textTransform="uppercase"
        color="brand.meta"
        whiteSpace="nowrap"
        flexShrink={0}
      >
        {children}
      </Text>
      <Divider borderColor="gray.300" my={0} />
    </Flex>
  )
}

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
          <Text
            fontFamily="display"
            fontWeight={600}
            fontSize="13px"
            letterSpacing="0.4em"
            textTransform="uppercase"
            color="brand.meta"
            mb={2}
          >
            On the Calendar
          </Text>
          <Text
            as="h1"
            fontFamily="display"
            fontWeight={700}
            fontSize={{ base: '40px', md: '64px' }}
            letterSpacing="0.02em"
            textTransform="uppercase"
            lineHeight={0.95}
            color="white"
          >
            Club{' '}
            <Box as="span" color="brand.highlight">
              Events
            </Box>
          </Text>
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
