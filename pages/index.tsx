import { Box } from '@chakra-ui/react'
import NewsletterSignup from 'common/NewsletterSignup'
import HomeHero from '../src/components/HomePage/HomeHero'
import Layout from '../src/common/Layout'
import { fetchAPI } from '../src/lib/api'
import StorySection from '../src/components/HomePage/StorySection'
import NextUpSection, {
  NextUpEntry,
} from '../src/components/HomePage/NextUpSection'
import NewsSection from '../src/components/HomePage/NewsSection'
import HomeEventsSection from '../src/components/HomePage/HomeEventsSection'
import { isGameCancelled } from 'utils/matchOutcome'

const Home = (props) => {
  const {
    homepage,
    highlight,
    d1Upcoming,
    d2Upcoming,
    sevensUpcoming,
    featuredEvents,
    recentGames,
    content,
  } = props

  // Cancelled games/tournaments stay on the schedule page with a badge, but
  // never get featured as the next fixture to show up for.
  const d1Games =
    d1Upcoming?.filter((g) => !g.finished && !isGameCancelled(g)) ?? []
  const d2Games =
    d2Upcoming?.filter((g) => !g.finished && !isGameCancelled(g)) ?? []
  const sevensGames =
    sevensUpcoming?.filter((t) => !t.finished && !t.cancelled) ?? []

  const tabEntries: NextUpEntry[] = []

  d1Games.slice(0, 2).forEach((g) => {
    tabEntries.push({
      key: 'd1',
      label: 'D1',
      date: new Date(g.date),
      type: 'game',
      data: g,
    })
  })
  d2Games.slice(0, 2).forEach((g) => {
    tabEntries.push({
      key: 'd2',
      label: 'D2',
      date: new Date(g.date),
      type: 'game',
      data: g,
    })
  })
  sevensGames.slice(0, 2).forEach((t) => {
    tabEntries.push({
      key: 'sevens',
      label: '7s',
      date: new Date(t.date),
      type: 'tournament',
      data: t,
    })
  })

  tabEntries.sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <Layout seo={homepage?.seo} id="homepage">
      <HomeHero image={highlight?.image} />

      <StorySection />

      <NextUpSection entries={tabEntries} recentGames={recentGames ?? []} />

      <NewsSection posts={content ?? []} />

      <HomeEventsSection events={featuredEvents ?? []} />

      <Box
        bg="brand.light"
        w="full"
        px={{ base: 4, md: 8 }}
        pb={{ base: 14, md: 20 }}
      >
        <Box maxW="1280px" mx="auto">
          <NewsletterSignup />
        </Box>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const today = new Date().toISOString().split('T')[0]
  const gamePopulate =
    'populate[home][populate]=logo&populate[away][populate]=logo&populate=location'

  // Resilient fetch: a single Strapi hiccup shouldn't fail the whole
  // build/revalidation. allSettled lets each section fall back independently.
  const settled = await Promise.allSettled([
    fetchAPI('/contents?populate=*&sort[0]=published:desc&pagination[limit]=3'),
    fetchAPI('/homepage?populate=*'),
    fetchAPI(
      `/games?${gamePopulate}&filters[division][$eq]=d1&filters[date][$gte]=${today}&sort=date:asc`,
    ),
    fetchAPI(
      `/games?${gamePopulate}&filters[division][$eq]=d2&filters[date][$gte]=${today}&sort=date:asc`,
    ),
    fetchAPI('/home-cta?populate[content][populate]=image'),
    fetchAPI(`/events?populate=*&filters[active][$eq]=true&sort=date:asc`),
    fetchAPI(
      `/games?${gamePopulate}&filters[finished][$eq]=true&sort=date:desc&pagination[limit]=6`,
    ),
  ])

  const [
    content,
    homepage,
    d1Upcoming,
    d2Upcoming,
    homeCta,
    featuredEvents,
    recentGamesData,
  ] = settled.map((result) =>
    result.status === 'fulfilled' ? result.value : null,
  )

  let sevensUpcoming = []
  try {
    const result = await fetchAPI(
      `/tournaments?populate=location&filters[finished][$ne]=true&filters[cancelled][$ne]=true&sort[0]=date:asc`,
    )
    sevensUpcoming = Array.isArray(result) ? result : []
  } catch {
    sevensUpcoming = []
  }

  return {
    props: {
      content: Array.isArray(content) ? content : [],
      homepage,
      d1Upcoming,
      d2Upcoming,
      sevensUpcoming,
      highlight: homeCta?.content || null,
      featuredEvents: Array.isArray(featuredEvents) ? featuredEvents : [],
      recentGames: Array.isArray(recentGamesData)
        ? recentGamesData.filter(
            (g) => g.home_score != null && g.away_score != null && !g.cancelled,
          )
        : [],
    },
    revalidate: 86400,
  }
}

export default Home
