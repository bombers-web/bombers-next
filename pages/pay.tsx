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
  fontWeight: 600,
  fontSize: '14px',
  letterSpacing: '0.3em',
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
        {/* Background logo watermark */}
        <Box
          position="absolute"
          right="40px"
          top="-50px"
          opacity={0.04}
          pointerEvents="none"
          display={{ base: 'none', md: 'block' }}
        >
          <svg viewBox="0 0 100 120" width="360" height="432">
            <g
              fill="#fff"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            >
              <path d="M50 8 C 48 22, 44 30, 50 42 C 56 30, 52 22, 50 8 Z" />
              <path d="M50 40 C 36 36, 22 44, 18 60 C 22 56, 30 54, 34 58 C 26 64, 22 74, 28 82 C 32 74, 40 70, 46 72 C 42 64, 44 54, 50 50 Z" />
              <path d="M50 40 C 64 36, 78 44, 82 60 C 78 56, 70 54, 66 58 C 74 64, 78 74, 72 82 C 68 74, 60 70, 54 72 C 58 64, 56 54, 50 50 Z" />
              <path d="M50 50 C 44 62, 44 78, 50 92 C 56 78, 56 62, 50 50 Z" />
              <rect x="22" y="62" width="56" height="7" rx="2" />
              <path d="M40 92 L60 92 L56 102 L44 102 Z" />
            </g>
          </svg>
        </Box>

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
            letterSpacing="0.02em"
            textTransform="uppercase"
            lineHeight={0.9}
            m={0}
            mb={4}
            maxW="820px"
          >
            Keep the Bombers
            <br />
            <Box as="span" color="brand.highlight">
              on the pitch.
            </Box>
          </Box>
          <Box
            fontFamily="body"
            fontSize="17px"
            color="#E2E2E2"
            lineHeight={1.65}
            maxW="560px"
          >
            Every dollar goes directly to the club — kit, tournament entry,
            pitch maintenance, and getting new players kitted out on day one.
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
