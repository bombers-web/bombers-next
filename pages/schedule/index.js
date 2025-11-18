import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { groupBy } from 'lodash'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../src/common/Layout'
import { fetchAPI } from '../../src/lib/api'
import ScheduleTabs from './components/ScheduleTabs'
import Calender from './components/Calender'

const Schedule = ({ games, calenders }) => {
  const { d1, d2 } = groupBy(games, 'division')
  const router = useRouter()

  const tabMap = {
    d1: 0,
    d2: 1,
    events: 2,
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

  return (
    <Layout seo={seo}>
      <Box maxW="1180px" justifyContent={'center'} mx="auto" mt={8} mb={4}>
        <Tabs
          id="schedule"
          isFitted
          size="lg"
          colorScheme="brand.meta"
          fontWeight="bold"
          fontFamily="Big Shoulders Display"
          fontSize="xl"
          color="brand.black"
          index={tabIndex}
          onChange={handleTabChange}
        >
          <TabList>
            <Tab>Bombers DI</Tab>
            <Tab>Bombers DII</Tab>
            <Tab>Club Events</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ScheduleTabs games={d1}></ScheduleTabs>
            </TabPanel>
            <TabPanel>
              <ScheduleTabs games={d2}></ScheduleTabs>
            </TabPanel>
            <TabPanel>
              <Calender calenders={calenders}></Calender>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const [games, calenders] = await Promise.all([
    fetchAPI(
      '/games?populate[0]=home.logo&populate[1]=away.logo&populate=winner&sort[0]=date:desc',
    ),
    fetchAPI('/calenders?populate[0]=calender&sort[1]=date:desc'),
  ])

  return {
    props: {
      games,
      calenders,
    },
    // refetch every day
    revalidate: 86400,
  }
}

export default Schedule
