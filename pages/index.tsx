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
import MatchTeams from 'components/Games/MatchTeams'
import { FiMapPin } from 'react-icons/fi'
import PageContent from 'src/common/PageContent'
import Hero from '../src/common/Hero'
import Layout from '../src/common/Layout'
import { GetInvolved } from '../src/components/HomePage/GetInvolved'
import { Practice } from '../src/components/HomePage/Practice'
import Section from '../src/components/Section'
import { fetchAPI } from '../src/lib/api'
import useBp from '../theme/useBp'
import Utils from '../utils/Utils'

const NextMatchText = styled(Box)`
  color: '#fff';
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .next-match__text--date {
    margin-bottom: 4px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 8px;
  }
  @media (min-width: 992px) {
    margin-bottom: 0;
  }

  @media (min-width: 992px) {
    .next-match__text--date {
      margin-right: 30px;
      gap: 34px;
    }
  }
  @media (min-width: 992px) {
    font-size: 16px;
    line-height: 20px;
  }
`

const NextMatchFont = styled(Box)<{ size?: 'xs' | 'sm' | 'md' | 'lg' }>`
  margin-right: ${(props) =>
    ({
      xs: '0px',
      sm: '0px',
      md: '32px',
      lg: '52px',
    }[props.size || 'xs'])};
  line-height: ${(props) =>
    ({
      xs: '14px',
      sm: '16px',
      md: '20px',
      lg: '24px',
    }[props.size || 'xs'])};
  font-weight: ${(props) => (props.size !== 'lg' ? '400' : '700')};
  font-size: ${(props) =>
    ({
      xs: '12px',
      sm: '14px',
      md: '18px',
      lg: '26px',
    }[props.size || 'xs'])};
  color: var(--chakra-colors-brand-light);
  width: 100%;
  padding: ${(props) =>
    ({
      xs: '0 4px',
      sm: '0 8px',
      md: '0 0 8px 12px',
      lg: '0 0 10px 15px',
    }[props.size || 'xs'])};
`

const Home = (props) => {
  const { homepage, highlight, d1Upcoming, d2Upcoming, practices } = props
  const { isMobile } = useBp()
  const { getLongDate } = new Utils()

  const upcomingMatches =
    d1Upcoming || d2Upcoming
      ? [...d1Upcoming?.slice(0, 1), ...d2Upcoming?.slice(0, 1)]
      : []

  return (
    <Layout seo={homepage?.seo} bg="brand.light" id="homepage">
      <PageContent>
        <Hero size="3xl" {...highlight} direct></Hero>
        <Section
          bg="brand.medium"
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
            {/* NEXT UP SECTION - NOW CENTERED & CLEANED */}
            <Flex
              flexDirection="column"
              bg="whiteAlpha.50"
              p={6}
              borderRadius="2xl"
              border="1px solid"
              borderColor="whiteAlpha.200"
              w="full"
              boxShadow="xl" // Added depth
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

                          {/* CLICKABLE LOCATION */}
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
  const [content, homepage, d1Upcoming, d2Upcoming, homeCta, practices] =
    await Promise.all([
      fetchAPI(
        '/contents?populate=*&filters[status][$eq]=published&sort[1]=publishedAt:asc&pagination[limit]=3',
      ),
      fetchAPI('/homepage?populate=*'),
      fetchAPI(
        '/games?populate[home][populate]=logo&populate[away][populate]=logo&populate=location&filters[division][$eq]=d1&filters[finished][$eq]=false&sort=date:asc',
      ),
      fetchAPI(
        '/games?populate[home][populate]=logo&populate[away][populate]=logo&populate=location&filters[division][$eq]=d2&filters[finished][$eq]=false&sort=date:asc',
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
      practices: Array.isArray(practices) ? practices : [], // <--- Pass it to props
    },
    revalidate: 86400,
  }
}

export default Home
