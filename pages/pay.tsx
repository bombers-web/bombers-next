/* eslint-disable no-unused-vars */
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../src/common/Layout'
import DonateSection from '../src/components/Pay/DonateSection'
import DuesSection from '../src/components/Pay/DuesSection'
import Sponsorships from '../src/components/Pay/Sponsorships'
import { fetchAPI } from '../src/lib/api'

const tabMap = {
  donations: 0,
  dues: 1,
  sponsors: 2,
}

const subtabMap = {
  player: 0,
  supporter: 1,
}

const tabStyle = {
  fontFamily: "'Big Shoulders Display', sans-serif",
  fontWeight: 700,
  fontSize: 'sm',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  color: 'gray.400',
  padding: '20px 32px 17px',
  borderBottomWidth: '3px',
  _selected: {
    color: 'brand.dark',
    borderColor: 'brand.highlight',
  },
  _hover: { color: 'brand.dark' },
  transition: 'color 0.15s',
}

const Pay = (props) => {
  const [sponsors, setSponsors] = useState([])
  const { subscriptions } = props
  const router = useRouter()

  const [tabIndex, setTabIndex] = useState(0)
  const [subtabIndex, setSubtabIndex] = useState(0)

  useEffect(() => {
    const tab = Array.isArray(router.query.tab)
      ? router.query.tab[0]
      : router.query.tab
    const subtab = Array.isArray(router.query.subtab)
      ? router.query.subtab[0]
      : router.query.subtab

    if (tab && tabMap[tab.toLowerCase()] !== undefined) {
      setTabIndex(tabMap[tab.toLowerCase()])
    }
    if (subtab && subtabMap[subtab.toLowerCase()] !== undefined) {
      setSubtabIndex(subtabMap[subtab.toLowerCase()])
    }
  }, [router.query, router.asPath])

  useEffect(() => {
    fetchAPI('/sponsors?populate=*')
      .then((val) => {
        if (val) setSponsors(val)
      })
      .catch((err) => console.error(err))
  }, [])

  const handleTabChange = (index) => {
    const tabKeys = Object.keys(tabMap)
    const tabName = tabKeys.find((key) => tabMap[key] === index) || 'donations'
    router.push(`/pay?tab=${tabName}`, undefined, { shallow: true })
    setTabIndex(index)
  }

  const handleSubtabChange = (index) => {
    const subtabKeys = Object.keys(subtabMap)
    const subtabName =
      subtabKeys.find((key) => subtabMap[key] === index) || 'player'
    router.push(`/pay?tab=dues&subtab=${subtabName}`, undefined, {
      shallow: true,
    })
    setSubtabIndex(index)
  }

  return (
    <Layout
      seo={{
        metaTitle: 'Pay',
        metaDescription: 'Dues, Donations and Sponsorships',
      }}
    >
      {/* HERO */}
      <Box
        bg="black"
        color="white"
        px={{ base: '24px', md: '60px' }}
        py={{ base: '52px', md: '86px' }}
        position="relative"
        overflow="hidden"
      >
        <Box maxW="1280px" mx="auto" position="relative">
          <Box
            fontFamily="display"
            fontWeight={600}
            fontSize="13px"
            letterSpacing="0.5em"
            textTransform="uppercase"
            color="brand.highlight"
            mb={3}
          >
            Support the Club
          </Box>
          <Box
            as="h1"
            fontFamily="display"
            fontWeight={700}
            fontSize={{ base: '52px', md: '72px', lg: '80px' }}
            color="brand.light"
            letterSpacing="0.02em"
            textTransform="uppercase"
            lineHeight={0.9}
            m={0}
            mb={4}
            maxW="820px"
          >
            Keep the Bombers
            <br />
            <Box as="span" color="brand.light">
              on the pitch.
            </Box>
          </Box>
        </Box>
      </Box>

      {/* TABS */}
      <Tabs
        variant="line"
        size="lg"
        align="center"
        id="content-tabs"
        index={tabIndex}
        onChange={handleTabChange}
      >
        <TabList
          bg="white"
          borderBottom="1px solid"
          borderColor="brand.light"
          position="sticky"
          top={0}
          zIndex={40}
        >
          <Tab sx={tabStyle}>Donations</Tab>
          <Tab sx={tabStyle}>Club Dues</Tab>
          <Tab sx={tabStyle}>Sponsors</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={{ base: '24px', md: '60px' }} py="64px">
            <DonateSection />
          </TabPanel>
          <TabPanel px={{ base: '24px', md: '60px' }} py="64px">
            <DuesSection
              subscriptions={subscriptions}
              subtabIndex={subtabIndex}
              onSubtabChange={handleSubtabChange}
            />
          </TabPanel>
          <TabPanel px={{ base: '24px', md: '60px' }} py="64px">
            <Sponsorships sponsors={sponsors} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  )
}

export async function getStaticProps() {
  const [subscriptions] = await Promise.all([
    fetchAPI('/subscriptions?populate=*'),
  ])
  return {
    props: {
      subscriptions: subscriptions || [],
    },
  }
}

export default Pay
