import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import Image from 'next/image'
import LocationWithCopy from 'common/LocationWithCopy'
import {
  getMatchOutcome,
  parseScore,
  isBombers,
  isGameCancelled,
} from 'utils/matchOutcome'
import { formatMatchTime } from 'utils/formatTime'

// Display label + brand color per outcome. `null` (indeterminate) shows no badge.
const OUTCOME = {
  win: { label: 'WIN', color: 'brand.win' },
  loss: { label: 'LOSS', color: 'brand.loss' },
  tie: { label: 'TIE', color: 'brand.lightSecondary' },
}

const MatchCard = ({ game }) => {
  if (!game) return null
  const d = new Date(game.date)
  const month = d
    .toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' })
    .toUpperCase()
  const day = d.toLocaleDateString('en-US', { day: 'numeric', timeZone: 'UTC' })
  const year = d.toLocaleDateString('en-US', {
    year: 'numeric',
    timeZone: 'UTC',
  })
  const time = formatMatchTime(game.date)

  const isBombersHome = isBombers(game?.home?.name)
  const bombers = isBombersHome ? game.home : game.away
  const opponent = isBombersHome ? game.away : game.home
  const bombersScore = parseScore(
    isBombersHome ? game.home_score : game.away_score,
  )
  const opponentScore = parseScore(
    isBombersHome ? game.away_score : game.home_score,
  )

  const cancelled = isGameCancelled(game)
  const isResult = !!game.finished && !cancelled
  const result = getMatchOutcome(game)
  const outcome = result ? OUTCOME[result].label : null
  const outcomeColor = result ? OUTCOME[result].color : 'brand.lightSecondary'
  const outcomeBorderColor = outcomeColor

  const divLabel =
    game.division === 'd1' ? 'DI' : game.division === 'd2' ? 'DII' : null

  const mapUrl =
    game.location?.name || game.location?.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${game.location.name ?? ''} ${game.location.address ?? ''}`.trim(),
        )}`
      : null
  const copyText = `${game.location?.name ?? ''} ${
    game.location?.address ?? ''
  }`.trim()

  const logoSize = { base: '50px', md: '56px' }

  const footerText = isResult
    ? [divLabel ? `${divLabel} Regular Season` : null, game.location?.city]
        .filter(Boolean)
        .join(' · ')
    : null

  return (
    <Box
      display="flex"
      alignItems="stretch"
      bg="brand.mediumSecondary"
      borderRadius="sm"
      overflow="hidden"
      mb={3}
      opacity={cancelled ? 0.65 : 1}
    >
      {/* Date Rail */}
      <Box
        flexShrink={0}
        w={{ base: '4rem', md: '5.375rem' }}
        bg="brand.darkSecondary"
        borderRight="2px solid"
        borderRightColor="brand.highlight"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
        py={{ base: 3, md: '0.875rem' }}
        px={{ base: 1, md: 2 }}
      >
        <Text
          fontFamily="display"
          fontWeight="600"
          fontSize="xs"
          letterSpacing="widest"
          textTransform="uppercase"
          color="brand.highlight"
          lineHeight="1"
        >
          {month}
        </Text>
        <Text
          fontFamily="display"
          fontWeight="700"
          fontSize={{ base: '2xl', md: '3xl' }}
          color="white"
          lineHeight="0.9"
        >
          {day}
        </Text>
        <Text
          fontFamily="display"
          fontWeight="500"
          fontSize="xs"
          letterSpacing="wider"
          color="brand.meta"
          lineHeight="1"
        >
          {year}
        </Text>
      </Box>

      {/* Match Main */}
      <Box flex="1" minW={0}>
        {/* Meta row: Home/Away tag only, right-aligned, with bottom divider */}
        <Flex
          alignItems="center"
          justifyContent="flex-end"
          px={{ base: 3, md: 5 }}
          py={{ base: 2, md: '0.625rem' }}
          borderBottom="1px solid"
          borderColor="whiteAlpha.200"
        >
          <Text
            fontFamily="display"
            fontWeight="700"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
            px={2}
            py="0.1875rem"
            border="1px solid"
            borderColor="brand.highlight"
            color={isBombersHome ? 'brand.black' : 'brand.highlight'}
            bg={isBombersHome ? 'brand.highlight' : 'transparent'}
          >
            {isBombersHome ? 'HOME' : 'AWAY'}
          </Text>
        </Flex>

        {/* Body */}
        <Grid
          templateColumns="1fr auto 1fr"
          alignItems="center"
          gap={{ base: 2, md: 4 }}
          px={{ base: 3, md: 6 }}
          py={{ base: 5, md: '1.625rem' }}
        >
          {/* Bombers */}
          <Flex
            direction="column"
            alignItems="center"
            gap={3}
            textAlign="center"
          >
            <Box position="relative" w={logoSize} h={logoSize} flexShrink={0}>
              {bombers?.logo?.url && (
                <Image
                  alt={bombers.name}
                  src={bombers.logo?.formats?.small?.url || bombers.logo?.url}
                  fill
                  sizes="56px"
                  style={{ objectFit: 'contain' }}
                />
              )}
            </Box>
            <Box>
              <Text
                fontFamily="display"
                fontWeight="700"
                fontSize={{ base: 'xs', md: 'sm' }}
                letterSpacing="wider"
                textTransform="uppercase"
                color="white"
                lineHeight="1.2"
              >
                {bombers?.name}
              </Text>
            </Box>
          </Flex>

          {/* Center: score + outcome badge, or VS/time */}
          <Flex
            direction="column"
            alignItems="center"
            gap={2}
            minW={{ base: '5.25rem', md: '7.5rem' }}
          >
            {cancelled ? (
              <Text
                fontFamily="display"
                fontWeight="700"
                fontSize="xs"
                letterSpacing="widest"
                textTransform="uppercase"
                px={2}
                py="0.1875rem"
                border="1px solid"
                borderColor="brand.loss"
                color="brand.loss"
              >
                CANCELLED
              </Text>
            ) : isResult ? (
              <>
                <Text
                  fontFamily="display"
                  fontWeight="700"
                  fontSize={{ base: '3xl', md: '4xl' }}
                  color="white"
                  lineHeight="1"
                  whiteSpace="nowrap"
                >
                  {bombersScore ?? '–'}
                  <Box
                    as="span"
                    fontWeight="300"
                    color="brand.meta"
                    mx="0.375rem"
                  >
                    –
                  </Box>
                  {opponentScore ?? '–'}
                </Text>
                {outcome && (
                  <Text
                    fontFamily="display"
                    fontWeight="700"
                    fontSize="xs"
                    letterSpacing="widest"
                    textTransform="uppercase"
                    px={2}
                    py="0.1875rem"
                    border="1px solid"
                    borderColor={outcomeBorderColor}
                    color={outcomeColor}
                  >
                    {outcome}
                  </Text>
                )}
              </>
            ) : (
              <>
                <Text
                  fontFamily="display"
                  fontWeight="300"
                  fontSize="2xl"
                  letterSpacing="wider"
                  color="brand.meta"
                >
                  {isBombersHome ? 'VS' : '@'}
                </Text>
                <Text
                  fontFamily="display"
                  fontWeight="600"
                  fontSize="sm"
                  letterSpacing="wider"
                  color="brand.light"
                >
                  {time}
                </Text>
              </>
            )}
          </Flex>

          {/* Opponent */}
          <Flex
            direction="column"
            alignItems="center"
            gap={3}
            textAlign="center"
          >
            <Box position="relative" w={logoSize} h={logoSize} flexShrink={0}>
              {opponent?.logo?.url && (
                <Image
                  alt={opponent.name}
                  src={opponent.logo?.formats?.small?.url || opponent.logo?.url}
                  fill
                  sizes="56px"
                  style={{ objectFit: 'contain' }}
                />
              )}
            </Box>
            <Text
              fontFamily="display"
              fontWeight="700"
              fontSize={{ base: 'xs', md: 'sm' }}
              letterSpacing="wider"
              textTransform="uppercase"
              color="white"
              lineHeight="1.2"
            >
              {opponent?.name}
            </Text>
          </Flex>
        </Grid>

        {/* Footer: season + city for results; venue with copy for upcoming */}
        {(footerText || game.location?.name) && (
          <Flex
            alignItems="center"
            justifyContent="center"
            gap={2}
            px={5}
            py={3}
            borderTop="1px solid"
            borderColor="whiteAlpha.200"
          >
            {isResult ? (
              <Text
                fontFamily="display"
                fontWeight="500"
                fontSize="sm"
                color="brand.meta"
                textAlign="center"
              >
                {footerText}
              </Text>
            ) : (
              <LocationWithCopy
                name={game.location.name}
                mapUrl={mapUrl}
                copyText={copyText}
                fontSize="sm"
                color="brand.meta"
                pinSize={3}
              />
            )}
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export default MatchCard
