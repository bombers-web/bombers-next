import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { groupBy } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../src/common/Layout'
import { fetchAPI } from '../../src/lib/api'
import SevensTabs from './components/SevensTabs'
import ScheduleTabs from './components/ScheduleTabs'

const Schedule = ({ games, tournaments }) => {
  const { d1, d2 } = groupBy(games, 'division')
  const router = useRouter()

  const tabMap = {
    d1: 0,
    d2: 1,
    sevens: 2,
  }

  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    const tab = Array.isArray(router.query.tab)
      ? router.query.tab[0]
      : router.query.tab

    if (tab && tabMap[tab.toLowerCase()] !== undefined) {
      setTabIndex(tabMap[tab.toLowerCase()])
    }
  }, [router.query, router.asPath])

  const handleTabChange = (index) => {
    const tabKeys = Object.keys(tabMap)
    const tabName = tabKeys.find((key) => tabMap[key] === index) || 'd1'

    router.push(`/schedule?tab=${tabName}`, undefined, { shallow: true })
    setTabIndex(index)
  }

  const seo = {
    metaTitle: 'Schedule',
  }

  const tabStyle = {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: 'ls',
    color: 'brand.medium',
    _selected: {
      color: 'brand.black',
      borderColor: 'brand.black',
    },
    _hover: { color: 'brand.highlight' },
    transition: 'all 0.2s',
  }

  return (
    <Layout seo={seo}>
      <Box
        maxW="1180px"
        justifyContent={'center'}
        mx="auto"
        mt={6}
        mb={4}
        px={4}
      >
        <Tabs
          id="schedule"
          isFitted
          variant="line"
          index={tabIndex}
          onChange={handleTabChange}
        >
          <TabList borderBottom="2px solid" borderColor="gray.100" mb={8}>
            <Tab {...tabStyle}>Bombers DI</Tab>
            <Tab {...tabStyle}>Bombers DII</Tab>
            <Tab {...tabStyle}>Sevens</Tab>
          </TabList>

          <TabPanels>
            <TabPanel p={0}>
              <ScheduleTabs games={d1} />
            </TabPanel>
            <TabPanel p={0}>
              <ScheduleTabs games={d2} />
            </TabPanel>
            <TabPanel p={0}>
              <SevensTabs tournaments={tournaments ?? []} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const gamePopulate =
    'populate[0]=home.logo&populate[1]=away.logo&populate=location&populate=winner'
  const tournamentPopulate =
    'populate[games][populate][home][populate]=logo' +
    '&populate[games][populate][away][populate]=logo' +
    '&populate[games][populate]=winner' +
    '&populate[games][populate]=location' +
    '&populate=location'

  const [games, tournaments] = await Promise.all([
    fetchAPI(`/games?pagination[limit]=100&${gamePopulate}&sort[0]=date:asc`),
    fetchAPI(
      `/tournaments?pagination[limit]=100&${tournamentPopulate}&sort[0]=date:asc`,
    ),
  ])

  return {
    props: {
      games: games ?? [],
      tournaments: tournaments ?? [],
    },
    revalidate: 86400,
  }
}

export default Schedule
