import { Box, Flex } from '@chakra-ui/react'
import { groupBy } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../src/common/Layout'
import SectionHeading from '../../src/common/SectionHeading'
import { fetchAPI } from '../../src/lib/api'
import SevensTabs from 'components/Schedule/SevensTabs'
import ScheduleTabs from 'components/Schedule/ScheduleTabs'

const tabMap = {
  d1: 0,
  d2: 1,
  sevens: 2,
}

const TAB_LABELS = ['Bombers DI', 'Bombers DII', 'Sevens']

const Schedule = ({ games, tournaments }) => {
  const { d1, d2 } = groupBy(games, 'division')
  const router = useRouter()
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
    const tabName =
      Object.keys(tabMap).find((key) => tabMap[key] === index) || 'd1'
    router.push(`/schedule?tab=${tabName}`, undefined, { shallow: true })
    setTabIndex(index)
  }

  const seo = {
    metaTitle: 'Schedule',
  }

  return (
    <Layout seo={seo} mainBg="brand.bg">
      {/* Dark page header */}
      <Box
        bg="brand.black"
        color="white"
        px={{ base: '1.75rem', md: '2rem' }}
        py={{ base: '3rem', md: '3rem' }}
      >
        <Box maxW="1280px" mx="auto">
          <SectionHeading
            eyebrow="On the Pitch"
            heading={
              <>
                Results &amp;{' '}
                <Box as="span" color="brand.highlight">
                  Fixtures
                </Box>
              </>
            }
            eyebrowColor="brand.meta"
            headingColor="white"
            as="h1"
            headingSize={{ base: '2.5rem', md: 'clamp(40px, 5vw, 4rem)' }}
          />
        </Box>
      </Box>

      {/* Sticky division tab bar */}
      <Box
        position="sticky"
        top={{ base: '60px', md: '62px' }}
        zIndex={50}
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Flex maxW="1280px" mx="auto" justify="center">
          {TAB_LABELS.map((label, i) => (
            <Box
              key={i}
              as="button"
              flex="0 0 auto"
              minW={{ base: '6.25rem', md: '11.25rem' }}
              pt={4}
              pb="0.8125rem"
              px={6}
              fontFamily="display"
              fontWeight="600"
              fontSize="sm"
              letterSpacing="0.28em"
              textTransform="uppercase"
              color={tabIndex === i ? 'brand.dark' : 'blackAlpha.400'}
              borderBottom="3px solid"
              borderColor={tabIndex === i ? 'brand.highlight' : 'transparent'}
              bg="transparent"
              cursor="pointer"
              _hover={{
                color: tabIndex === i ? 'brand.dark' : 'blackAlpha.600',
              }}
              transition="color 0.15s, border-color 0.15s"
              onClick={() => handleTabChange(i)}
              textAlign="center"
            >
              {label}
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Content */}
      <Box
        maxW="1280px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        pt={10}
        pb={{ base: 16, md: 24 }}
      >
        {tabIndex === 0 && <ScheduleTabs games={d1 ?? []} />}
        {tabIndex === 1 && <ScheduleTabs games={d2 ?? []} />}
        {tabIndex === 2 && <SevensTabs tournaments={tournaments ?? []} />}
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
