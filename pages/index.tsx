import {
  Flex,
  Heading,
  Icon,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react'
import NewsletterSignup from 'common/NewsletterSignup'
import MatchTeams from 'components/Games/MatchTeams'
import NextLink from 'next/link'
import { FiCalendar } from 'react-icons/fi'
import PageContent from '../src/common/PageContent'
import Hero from '../src/common/Hero'
import Layout from '../src/common/Layout'
import { GetInvolved } from '../src/components/HomePage/GetInvolved'
import { Practice } from '../src/components/Practice/Practice'
import Section from '../src/components/Section'
import { fetchAPI } from '../src/lib/api'
import Utils from 'utils/Utils'
import EventCard from '../src/components/Event/EventCard'
import { EventType } from '../src/types/eventTypes'
import LocationWithCopy from '../src/common/LocationWithCopy'

const isCancelled = (game) =>
  game?.finished && game?.home_score == null && game?.away_score == null

const GameNextUp = ({ game, getLongDate }) => {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${game?.location?.name ?? ''} ${game?.location?.address ?? ''}`.trim(),
  )}`

  return (
    <VStack spacing={4} py={6} w="full">
      <MatchTeams match={game} />

      <VStack spacing={1}>
        <Text color="white" fontWeight="bold" fontSize="lg">
          {getLongDate(game?.date)[0]} @ {getLongDate(game?.date)[1]}
        </Text>

        {isCancelled(game) ? (
          <Text
            color="red.400"
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing="2px"
          >
            CANCELLED
          </Text>
        ) : (
          <LocationWithCopy
            name={game?.location?.name}
            mapUrl={mapUrl}
            copyText={`${game?.location?.name ?? ''} ${game?.location?.address ?? ''}`.trim()}
            color="yellow.400"
          />
        )}
      </VStack>
    </VStack>
  )
}

const TournamentNextUp = ({ tournament }) => {
  const dateLabel = tournament?.date
    ? new Date(tournament.date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null

  const mapUrl =
    tournament?.location?.address || tournament?.location?.name
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${tournament.location.name ?? ''} ${
            tournament.location.address ?? ''
          }`.trim(),
        )}`
      : null

  return (
    <VStack spacing={3} py={6} w="full">
      <Flex w="full" justify="flex-end">
        <NextLink href="/schedule?tab=sevens" passHref legacyBehavior>
          <Link
            color="whiteAlpha.600"
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="tight"
            _hover={{ color: 'brand.highlight', textDecoration: 'none' }}
          >
            View Sevens Schedule →
          </Link>
        </NextLink>
      </Flex>

      <Heading
        size={{ base: 'md', md: 'lg' }}
        color="white"
        textTransform="uppercase"
        letterSpacing="wider"
        textAlign="center"
        margin={0}
      >
        {tournament?.name}
      </Heading>

      {dateLabel && (
        <Flex align="center" gap={2}>
          <Icon as={FiCalendar} color="yellow.400" />
          <Text color="white" fontWeight="semibold" fontSize="md">
            {dateLabel}
          </Text>
        </Flex>
      )}

      {tournament?.location && (
        <VStack spacing={0}>
          <LocationWithCopy
            name={tournament.location.name}
            mapUrl={mapUrl}
            copyText={`${tournament.location.name ?? ''} ${tournament.location.address ?? ''}`.trim()}
            color="yellow.400"
          />
          {tournament.location.city && (
            <Text
              color="white"
              opacity={0.4}
              fontSize="sm"
              fontWeight="600"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              {tournament.location.city}
            </Text>
          )}
        </VStack>
      )}
    </VStack>
  )
}

const Home = (props) => {
  const {
    homepage,
    highlight,
    d1Upcoming,
    d2Upcoming,
    sevensUpcoming,
    practices,
    featuredEvents,
  } = props
  const { getLongDate } = new Utils()

  const d1Games = d1Upcoming?.filter((g) => !g.finished || isCancelled(g)) ?? []
  const d2Games = d2Upcoming?.filter((g) => !g.finished || isCancelled(g)) ?? []
  const sevensGames = sevensUpcoming?.filter((t) => !t.finished) ?? []

  const tabEntries: Array<{
    key: string
    label: string
    date: Date
    type: 'game' | 'tournament'
    data: any
  }> = []

  if (d1Games.length > 0) {
    tabEntries.push({
      key: 'd1',
      label: 'D1',
      date: new Date(d1Games[0].date),
      type: 'game',
      data: d1Games[0],
    })
  }
  if (d2Games.length > 0) {
    tabEntries.push({
      key: 'd2',
      label: 'D2',
      date: new Date(d2Games[0].date),
      type: 'game',
      data: d2Games[0],
    })
  }
  if (sevensGames.length > 0) {
    tabEntries.push({
      key: 'sevens',
      label: '7s',
      date: new Date(sevensGames[0].date),
      type: 'tournament',
      data: sevensGames[0],
    })
  }

  tabEntries.sort((a, b) => a.date.getTime() - b.date.getTime())

  const tabStyle = {
    color: 'whiteAlpha.500',
    fontWeight: 'bold',
    fontSize: 'md',
    textTransform: 'uppercase' as const,
    letterSpacing: '2px',
    _selected: {
      color: 'brand.highlight',
      borderColor: 'brand.highlight',
    },
    _hover: { color: 'white' },
    transition: 'all 0.2s',
  }

  return (
    <Layout seo={homepage?.seo} bg="brand.light" id="homepage">
      <PageContent>
        <Hero size="3xl" {...highlight} direct></Hero>
        <Section
          bg="brand.light"
          padding="0px"
          style={{ display: 'flex', justifyContent: 'center' }}
          align="center"
        >
          <Flex
            flexDirection="column"
            textAlign="center"
            my="10px"
            w="full"
            maxW="container.lg"
          >
            {/* NEXT UP SECTION */}
            <Flex
              flexDirection="column"
              bg="brand.medium"
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor="brand.medium"
              w="full"
              boxShadow="xl"
            >
              <Heading
                size="lg"
                color="brand.light"
                mb={2}
                textTransform="uppercase"
              >
                Next Up
              </Heading>

              {tabEntries.length > 0 ? (
                <Tabs variant="line" size="lg">
                  <TabList
                    borderBottom="1px solid"
                    borderColor="whiteAlpha.200"
                    mb={0}
                    justifyContent="center"
                    gap={4}
                  >
                    {tabEntries.map((entry) => (
                      <Tab key={entry.key} {...tabStyle}>
                        {entry.label}
                      </Tab>
                    ))}
                  </TabList>

                  <TabPanels>
                    {tabEntries.map((entry) => (
                      <TabPanel key={entry.key} p={0}>
                        {entry.type === 'game' ? (
                          <GameNextUp
                            game={entry.data}
                            getLongDate={getLongDate}
                          />
                        ) : (
                          <TournamentNextUp tournament={entry.data} />
                        )}
                      </TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              ) : (
                <Text color="yellow.400" py={4}>
                  There are no upcoming scheduled games
                </Text>
              )}
            </Flex>

            {/* FEATURED EVENTS SECTION */}
            {featuredEvents?.length > 0 && (
              <Flex
                flexDirection="column"
                bg="brand.medium"
                p={6}
                borderRadius="2xl"
                border="1px solid"
                w="full"
                mt={4}
                gap={4}
              >
                <Flex justify="space-between" align="center">
                  <Heading
                    size="lg"
                    color="brand.light"
                    textTransform="uppercase"
                    margin={0}
                  >
                    Upcoming Events
                  </Heading>
                  <NextLink href="/club/events" passHref legacyBehavior>
                    <Link
                      color="whiteAlpha.600"
                      fontSize="xs"
                      fontWeight="bold"
                      textTransform="uppercase"
                      letterSpacing="tight"
                      _hover={{
                        color: 'brand.highlight',
                        textDecoration: 'none',
                      }}
                    >
                      View All →
                    </Link>
                  </NextLink>
                </Flex>
                <VStack spacing={4} align="stretch">
                  {featuredEvents.map((event: EventType) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </VStack>
              </Flex>
            )}

            {/* PRACTICE SECTION */}
            <Flex>
              <Practice practices={practices} />
            </Flex>

            {/* GET INVOLVED SECTION */}
            <GetInvolved />

            {/* NEWSLETTER SECTION */}
            <Flex flexDirection="column" textAlign="center" my="10px">
              <NewsletterSignup />
            </Flex>
          </Flex>
        </Section>
      </PageContent>
    </Layout>
  )
}

export async function getStaticProps() {
  const today = new Date().toISOString().split('T')[0]
  const gamePopulate =
    'populate[home][populate]=logo&populate[away][populate]=logo&populate=location'

  const [
    content,
    homepage,
    d1Upcoming,
    d2Upcoming,
    homeCta,
    practices,
    featuredEvents,
  ] = await Promise.all([
    fetchAPI(
      '/contents?populate=*&filters[status][$eq]=published&sort[1]=publishedAt:asc&pagination[limit]=3',
    ),
    fetchAPI('/homepage?populate=*'),
    fetchAPI(
      `/games?${gamePopulate}&filters[division][$eq]=d1&filters[date][$gte]=${today}&sort=date:asc`,
    ),
    fetchAPI(
      `/games?${gamePopulate}&filters[division][$eq]=d2&filters[date][$gte]=${today}&sort=date:asc`,
    ),
    fetchAPI('/home-cta?populate[content][populate]=image'),
    fetchAPI('/practices?populate=*'),
    fetchAPI(
      `/events?populate=*&filters[active][$eq]=true&filters[featured][$eq]=true&sort=date:asc&pagination[limit]=3`,
    ),
  ])

  // Fetched separately so a missing or errored sevens collection never breaks the page
  let sevensUpcoming = []
  try {
    const result = await fetchAPI(
      `/tournaments?populate=location&filters[finished][$ne]=true&sort[0]=date:asc`,
    )
    sevensUpcoming = Array.isArray(result) ? result : []
  } catch {
    sevensUpcoming = []
  }

  return {
    props: {
      content,
      homepage,
      d1Upcoming,
      d2Upcoming,
      sevensUpcoming,
      highlight: homeCta?.content || null,
      practices: Array.isArray(practices) ? practices : [],
      featuredEvents: Array.isArray(featuredEvents) ? featuredEvents : [],
    },
    revalidate: 86400,
  }
}

export default Home
