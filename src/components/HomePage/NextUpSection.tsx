import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { format } from 'date-fns'
import { parseCity } from 'lib/parse-address'
import HeaderLink from 'common/HeaderLink'

export type NextUpEntry = {
  key: string
  label: string
  date: Date
  type: 'game' | 'tournament'
  data: any
}

type Props = {
  entries?: NextUpEntry[]
  recentGames?: any[]
}

function SideChip({ label }: { label: string }) {
  return (
    <Text
      as="span"
      fontFamily="display"
      fontWeight={700}
      fontSize="sm"
      letterSpacing="0.18em"
      textTransform="uppercase"
      color="brand.highlight"
      border="1px solid"
      borderColor="brand.highlight"
      px="6px"
      py="3px"
      lineHeight={1.4}
      display="inline-block"
      textAlign="center"
    >
      {label}
    </Text>
  )
}

const isBombers = (name: string) => name.toLowerCase().includes('bombers')

const NextUpSection = ({ entries = [], recentGames = [] }: Props) => {
  if (entries.length === 0 && recentGames.length === 0) return null

  const results = recentGames
    .filter((g) => g.home_score != null && g.away_score != null)
    .slice(0, 3)
    .map((g) => {
      const isHome = isBombers(g.home?.name ?? '')
      const opponent = (isHome ? g.away?.name : g.home?.name) ?? 'TBD'
      const bombersScore = (isHome ? g.home_score : g.away_score) as number
      const oppScore = (isHome ? g.away_score : g.home_score) as number
      return {
        dateStr: format(new Date(g.date), 'MMM d'),
        side:
          g.division === 'd1'
            ? 'D1'
            : g.division === 'd2'
            ? 'D2'
            : (g.division ?? '').toUpperCase(),
        opponent,
        vsLabel: isHome ? 'vs' : '@',
        bombersScore,
        oppScore,
        win: bombersScore > oppScore,
      }
    })

  const upcoming = entries.slice(0, 4).map((e) => {
    const isGame = e.type === 'game'
    const isHome = isGame ? isBombers(e.data?.home?.name ?? '') : true
    const opponent = isGame
      ? (isHome ? e.data?.away?.name : e.data?.home?.name) ?? 'TBD'
      : e.data?.name ?? 'TBD'
    const vsLabel = isGame && !isHome ? '@' : 'vs'
    const location =
      e.data?.location?.city ?? parseCity(e.data?.location?.address) ?? null
    const href =
      e.label === '7s' ? '/schedule?tab=sevens' : `/schedule?tab=${e.key}`
    return {
      dateStr: format(e.date, 'MMM d'),
      side: e.label,
      opponent,
      vsLabel,
      location,
      href,
    }
  })

  return (
    <Box
      w="full"
      px={{ base: 4, md: 8 }}
      py={{ base: 14, md: 20 }}
      bg="brand.light"
    >
      <Box maxW="1280px" mx="auto">
        {/* Section header */}
        <Flex
          justify="space-between"
          align="baseline"
          mb={7}
          flexWrap="wrap"
          gap={3}
        >
          <Box>
            <Text
              fontFamily="display"
              fontWeight={600}
              fontSize="md"
              letterSpacing="0.4em"
              color="gray.500"
              textTransform="uppercase"
              mb={1}
            >
              On the Pitch
            </Text>
            <Heading
              fontFamily="display"
              fontWeight={700}
              fontSize="clamp(36px, 4vw, 56px)"
              letterSpacing="0.02em"
              textTransform="uppercase"
              lineHeight="none"
              color="brand.dark"
              margin={0}
            >
              Results &amp; Fixtures
            </Heading>
          </Box>
        </Flex>

        {/* Two panels */}
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
          {/* Recent Results */}
          <Box bg="brand.mediumSecondary" borderRadius="sm" overflow="hidden">
            <Flex
              px={7}
              py={5}
              bg="brand.darkSecondary"
              justify="space-between"
              align="baseline"
              borderBottom="2px solid"
              borderColor="brand.highlight"
            >
              <Text
                fontFamily="display"
                fontWeight={700}
                fontSize="2xl"
                letterSpacing="0.04em"
                textTransform="uppercase"
                color="white"
              >
                Recent Results
              </Text>
              <HeaderLink href="/schedule">All Results →</HeaderLink>
            </Flex>
            {results.length === 0 ? (
              <Box px={7} py={6}>
                <Text fontFamily="body" fontSize="sm" color="gray.500">
                  No recent results
                </Text>
              </Box>
            ) : (
              results.map((r, i) => (
                <Grid
                  key={i}
                  templateColumns="60px 50px 1fr auto"
                  gap={4}
                  alignItems="center"
                  px={7}
                  py="18px"
                  color="white"
                  borderTop={i === 0 ? 'none' : '1px solid'}
                  borderColor="brand.medium"
                >
                  <Text
                    fontFamily="display"
                    fontWeight={600}
                    fontSize="sm"
                    letterSpacing="0.15em"
                    textTransform="uppercase"
                    color="#8a8a8a"
                    margin="0"
                  >
                    {r.dateStr}
                  </Text>
                  <SideChip label={r.side} />
                  <Text fontFamily="body" fontSize="md" minW={0}>
                    <Box as="span" color="#b8b8b8">
                      {r.vsLabel}
                    </Box>{' '}
                    {r.opponent}
                  </Text>
                  <Flex align="center" gap={2}>
                    <Text
                      fontFamily="display"
                      fontWeight={700}
                      fontSize="xl"
                      letterSpacing="0.02em"
                      color="white"
                      lineHeight={1}
                      margin="0"
                    >
                      {r.bombersScore}
                      <Box as="span" color="#8a8a8a" fontWeight={400}>
                        {' '}
                        –{' '}
                      </Box>
                      {r.oppScore}
                    </Text>
                    <Box
                      fontFamily="display"
                      fontWeight={700}
                      fontSize="sm"
                      letterSpacing="0.18em"
                      textTransform="uppercase"
                      color={r.win ? 'brand.win' : 'brand.loss'}
                      border="1px solid"
                      borderColor={r.win ? 'brand.win' : 'brand.loss'}
                      px="7px"
                      py="3px"
                      lineHeight={1.4}
                    >
                      {r.win ? 'W' : 'L'}
                    </Box>
                  </Flex>
                </Grid>
              ))
            )}
          </Box>

          {/* Upcoming */}
          <Box bg="brand.mediumSecondary" borderRadius="sm" overflow="hidden">
            <Flex
              px={7}
              py={5}
              bg="brand.darkSecondary"
              justify="space-between"
              align="baseline"
              borderBottom="2px solid"
              borderColor="brand.highlight"
            >
              <Text
                fontFamily="display"
                fontWeight={700}
                fontSize="2xl"
                letterSpacing="0.04em"
                textTransform="uppercase"
                color="white"
              >
                Upcoming
              </Text>
              <HeaderLink href="/schedule">Schedule →</HeaderLink>
            </Flex>
            {upcoming.length === 0 ? (
              <Box px={7} py={6}>
                <Text fontFamily="body" fontSize="sm" color="gray.500">
                  No upcoming fixtures
                </Text>
              </Box>
            ) : (
              upcoming.map((u, i) => (
                <NextLink key={i} href={u.href} passHref legacyBehavior>
                  <Grid
                    as="a"
                    templateColumns="60px 50px 1fr auto"
                    gap={4}
                    alignItems="center"
                    px={7}
                    pt={u.location ? '12px' : '18px'}
                    pb="18px"
                    color="white"
                    textDecoration="none"
                    borderTop={i === 0 ? 'none' : '1px solid'}
                    borderColor="brand.medium"
                    _hover={{
                      bg: '#383838',
                      textDecoration: 'none',
                      color: 'brand.highlight',
                    }}
                    transition="background 0.15s"
                  >
                    {u.location && (
                      <Text
                        gridColumn="1 / -1"
                        fontFamily="body"
                        fontSize="xs"
                        color="#8a8a8a"
                        mb={-1}
                      >
                        {u.location}
                      </Text>
                    )}
                    <Text
                      fontFamily="display"
                      fontWeight={600}
                      fontSize="sm"
                      letterSpacing="0.15em"
                      textTransform="uppercase"
                      color="brand.highlight"
                      margin="0"
                    >
                      {u.dateStr}
                    </Text>
                    <SideChip label={u.side} />
                    <Text fontFamily="body" fontSize="md" minW={0}>
                      <Box as="span" color="#b8b8b8">
                        {u.vsLabel}
                      </Box>{' '}
                      {u.opponent}
                    </Text>
                    <Text
                      fontFamily="display"
                      fontWeight={600}
                      fontSize="xs"
                      letterSpacing="0.25em"
                      textTransform="uppercase"
                      color="brand.highlight"
                    >
                      Details →
                    </Text>
                  </Grid>
                </NextLink>
              ))
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default NextUpSection
