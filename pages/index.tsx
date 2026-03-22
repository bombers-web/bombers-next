import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import NewsletterSignup from 'common/NewsletterSignup'
import GameCard from 'components/Games/GameCard'
import PageContent from 'src/common/PageContent'
import Hero from '../src/common/Hero'
import Layout from '../src/common/Layout'
import { GetInvolved } from '../src/components/HomePage/GetInvolved'
import { Practice } from '../src/components/Practice/Practice'
import Section from '../src/components/Section'
import { fetchAPI } from '../src/lib/api'
import MatchTeams from 'components/Games/MatchTeams'
import { FiMapPin } from 'react-icons/fi'
import useBp from 'theme/useBp'
import Utils from 'utils/Utils'

const Home = (props) => {
  const { homepage, highlight, d1Upcoming, d2Upcoming, practices } = props
  const { isMobile } = useBp()
  const { getLongDate } = new Utils()

  const isCancelled = (game) =>
    game?.finished && game?.home_score == null && game?.away_score == null

  const d1Games = d1Upcoming?.filter((g) => !g.finished || isCancelled(g)) ?? []
  const d2Games = d2Upcoming?.filter((g) => !g.finished || isCancelled(g)) ?? []
  const upcomingMatches =
    d1Upcoming || d2Upcoming
      ? [...d1Games.slice(0, 1), ...d2Games.slice(0, 1)]
      : []

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

              {upcomingMatches?.length > 0 ? (
                upcomingMatches.map((upcomingMatch, idx) => {
                  // Fixed the URL path from /0 to /search/
                  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${upcomingMatch?.location?.name} ${
                      upcomingMatch?.location?.address || ''
                    }`,
                  )}`

                  return (
                    <Box key={idx} w="full">
                      <VStack spacing={4} py={6}>
                        {/* Match Teams Component (Centered) */}
                        <MatchTeams match={upcomingMatch} />

                        <VStack spacing={1}>
                          <Text color="white" fontWeight="bold" fontSize="lg">
                            {getLongDate(upcomingMatch?.date)[0]} @{' '}
                            {getLongDate(upcomingMatch?.date)[1]}
                          </Text>

                          {/* CLICKABLE LOCATION OR CANCELLED */}
                          {isCancelled(upcomingMatch) ? (
                            <Text
                              color="red.400"
                              fontSize="2xl"
                              fontWeight="bold"
                              letterSpacing="2px"
                            >
                              CANCELLED
                            </Text>
                          ) : (
                            <Link
                              href={mapUrl}
                              isExternal
                              color="yellow.400"
                              fontSize="md"
                              display="flex"
                              alignItems="center"
                              fontWeight="semibold"
                              _hover={{
                                color: 'yellow.200',
                                textDecoration: 'none',
                              }}
                            >
                              <Icon as={FiMapPin} mr={2} />
                              {upcomingMatch?.location?.name}
                            </Link>
                          )}
                        </VStack>
                      </VStack>

                      {idx !== upcomingMatches.length - 1 && (
                        <Divider
                          borderColor="whiteAlpha.300"
                          w="60%"
                          mx="auto"
                        />
                      )}
                    </Box>
                  )
                })
              ) : (
                <Text color="yellow.400" py={4}>
                  There are no upcoming scheduled games
                </Text>
              )}
            </Flex>

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

  const [content, homepage, d1Upcoming, d2Upcoming, homeCta, practices] =
    await Promise.all([
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
    ])

  return {
    props: {
      content,
      homepage,
      d1Upcoming,
      d2Upcoming,
      highlight: homeCta?.content || null,
      practices: Array.isArray(practices) ? practices : [],
    },
    revalidate: 86400,
  }
}

export default Home
