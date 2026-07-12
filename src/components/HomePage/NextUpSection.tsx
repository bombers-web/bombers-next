import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import SectionHeading from 'common/SectionHeading'
import NextLink from 'next/link'
import { format } from 'date-fns'
import { parseCity } from 'lib/parse-address'
import HeaderLink from 'common/HeaderLink'
import { getMatchOutcome, parseScore, isBombers } from 'utils/matchOutcome'

// Badge label + brand color per outcome. `null` (indeterminate) renders no badge.
const OUTCOME_BADGE = {
  win: { label: 'W', color: 'brand.win' },
  loss: { label: 'L', color: 'brand.loss' },
  tie: { label: 'T', color: 'brand.lightSecondary' },
} as const

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

const NextUpSection = ({ entries = [], recentGames = [] }: Props) => {
  if (entries.length === 0 && recentGames.length === 0) return null

  const results = recentGames
    .filter((g) => g.home_score != null && g.away_score != null)
    .slice(0, 3)
    .map((g) => {
      const isHome = isBombers(g.home?.name)
      const opponent = (isHome ? g.away?.name : g.home?.name) ?? 'TBD'
      const bombersScore = parseScore(isHome ? g.home_score : g.away_score)
      const oppScore = parseScore(isHome ? g.away_score : g.home_score)
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
        outcome: getMatchOutcome(g),
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
          <SectionHeading
            eyebrow="On the Pitch"
            heading="Results &amp; Fixtures"
            eyebrowColor="gray.500"
            headingSize="clamp(36px, 4vw, 56px)"
          />
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
                  templateColumns={{
                    base: '46px auto minmax(0, 1fr) auto',
                    md: '60px 50px 1fr auto',
                  }}
                  gap={{ base: 2, md: 4 }}
                  alignItems="center"
                  px={{ base: 4, md: 7 }}
                  py="18px"
                  color="white"
                  borderTop={i === 0 ? 'none' : '1px solid'}
                  borderColor="brand.mediumSecondary"
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
                  <Text
                    fontFamily="body"
                    fontSize="md"
                    minW={0}
                    overflowWrap="normal"
                  >
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
                      {r.bombersScore ?? '–'}
                      <Box as="span" color="#8a8a8a" fontWeight={400}>
                        {' '}
                        –{' '}
                      </Box>
                      {r.oppScore ?? '–'}
                    </Text>
                    {r.outcome && (
                      <Box
                        fontFamily="display"
                        fontWeight={700}
                        fontSize="sm"
                        letterSpacing="0.18em"
                        textTransform="uppercase"
                        color={OUTCOME_BADGE[r.outcome].color}
                        border="1px solid"
                        borderColor={OUTCOME_BADGE[r.outcome].color}
                        px="7px"
                        py="3px"
                        lineHeight={1.4}
                      >
                        {OUTCOME_BADGE[r.outcome].label}
                      </Box>
                    )}
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
                    templateColumns={{
                      base: '46px auto minmax(0, 1fr) auto',
                      md: '60px 50px 1fr auto',
                    }}
                    gap={{ base: 2, md: 4 }}
                    alignItems="center"
                    px={{ base: 4, md: 7 }}
                    pt={u.location ? '12px' : '18px'}
                    pb="18px"
                    color="white"
                    textDecoration="none"
                    borderTop={i === 0 ? 'none' : '1px solid'}
                    borderColor="brand.mediumSecondary"
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
                    <Text
                      fontFamily="body"
                      fontSize="md"
                      minW={0}
                      overflowWrap="normal"
                    >
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
