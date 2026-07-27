import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../src/common/Layout'
import PageTabs from '../src/common/PageTabs'
import SectionHeading from 'common/SectionHeading'
import DonateSection from '../src/components/Donate/DonateSection'
import DuesSection from '../src/components/Donate/DuesSection'
import Sponsorships from '../src/components/Donate/Sponsorships'
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

const Donate = (props) => {
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
    router.push(`/donate?tab=${tabName}`, undefined, { shallow: true })
    setTabIndex(index)
  }

  const handleSubtabChange = (index) => {
    const subtabKeys = Object.keys(subtabMap)
    const subtabName =
      subtabKeys.find((key) => subtabMap[key] === index) || 'player'
    router.push(`/donate?tab=dues&subtab=${subtabName}`, undefined, {
      shallow: true,
    })
    setSubtabIndex(index)
  }

  return (
    <Layout
      seo={{
        metaTitle: 'Donate',
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
          <SectionHeading
            eyebrow="Support the Club"
            heading={<>Be part of the Bombers Community</>}
            eyebrowColor="brand.highlight"
            headingColor="white"
            as="h1"
            headingSize="clamp(48px, 5.5vw, 72px)"
            mb="1rem"
          />
        </Box>
      </Box>

      {/* TABS */}
      <PageTabs
        tabs={['Donations', 'Club Dues', 'Sponsors']}
        index={tabIndex}
        onChange={handleTabChange}
        id="content-tabs"
      >
        <DonateSection />
        <DuesSection
          subscriptions={subscriptions}
          subtabIndex={subtabIndex}
          onSubtabChange={handleSubtabChange}
        />
        <Sponsorships sponsors={sponsors} />
      </PageTabs>
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

export default Donate
