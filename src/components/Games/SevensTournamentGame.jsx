import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { formatMatchTime } from 'utils/formatTime'
import { isGameCancelled } from 'utils/matchOutcome'

const SevensTournamentGame = ({ game, tournamentCancelled = false }) => {
  const { home, away, home_score, away_score, finished, winner, date } = game

  const timeLabel = date
    ? formatMatchTime(date, { hour: '2-digit', minute: '2-digit' })
    : null

  const isBombersHome = home?.name?.includes('Bombers')
  const bombers = isBombersHome ? home : away
  const opponent = isBombersHome ? away : home
  const bombersScore = isBombersHome ? home_score : away_score
  const opponentScore = isBombersHome ? away_score : home_score

  const isCancelled = tournamentCancelled || isGameCancelled(game)
  const bombersWon = winner?.name?.includes('St. Louis Bombers')
  const hasTie = finished && !winner?.id && !isCancelled
  const outcome = isCancelled
    ? 'CANCELLED'
    : hasTie
    ? 'TIE'
    : bombersWon
    ? 'WIN'
    : winner?.id
    ? 'LOSS'
    : null

  const borderColor = isCancelled
    ? 'whiteAlpha.100'
    : hasTie
    ? 'gray.600'
    : bombersWon
    ? 'green.500'
    : winner?.id
    ? 'red.500'
    : 'whiteAlpha.100'

  const logoSize = '36px'

  return (
    <Box
      w="full"
      bg="blackAlpha.300"
      borderRadius="md"
      borderLeft="3px solid"
      borderLeftColor={borderColor}
      px={3}
      pt={2}
      pb={timeLabel && !finished && !isCancelled ? 1.5 : 2}
      opacity={isCancelled ? 0.65 : 1}
    >
      {/* Teams row */}
      <Flex align="center" justify="space-between" gap={2}>
        {/* Bombers side */}
        <Flex align="center" gap={2} flex="1">
          <Box position="relative" w={logoSize} h={logoSize} flexShrink={0}>
            {bombers?.logo?.url && (
              <Image
                alt={bombers.name}
                src={bombers.logo?.formats?.small?.url || bombers.logo?.url}
                style={{ objectFit: 'contain' }}
                fill
                sizes="70px"
              />
            )}
          </Box>
          <Text
            color="brand.light"
            fontWeight="bold"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            {bombers?.name}
          </Text>
        </Flex>

        {/* Center: cancelled badge, score, or VS */}
        <Flex align="center" gap={2} flexShrink={0}>
          {isCancelled || finished ? (
            <>
              {outcome && (
                <Badge
                  colorScheme={
                    isCancelled
                      ? 'red'
                      : hasTie
                      ? 'gray'
                      : bombersWon
                      ? 'green'
                      : 'red'
                  }
                  variant="solid"
                  fontSize="sm"
                  fontWeight="black"
                  letterSpacing="widest"
                  px={2}
                  py={0.5}
                  borderRadius="full"
                >
                  {outcome}
                </Badge>
              )}
              {!isCancelled && (
                <Text
                  fontFamily="display"
                  fontSize="xl"
                  fontWeight="black"
                  color="brand.light"
                  letterSpacing="tight"
                >
                  {bombersScore ?? '–'} – {opponentScore ?? '–'}
                </Text>
              )}
            </>
          ) : (
            <Text
              color="whiteAlpha.400"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              textTransform="uppercase"
            >
              VS
            </Text>
          )}
        </Flex>

        {/* Opponent side */}
        <Flex
          align="center"
          gap={2}
          flex="1"
          justify="flex-end"
          opacity={bombersWon ? 0.6 : 1}
        >
          <Text
            color="brand.light"
            fontWeight="bold"
            fontSize="sm"
            textTransform="uppercase"
            letterSpacing="wider"
            textAlign="right"
            my={2}
          >
            {opponent?.name}
          </Text>
          <Box position="relative" w={logoSize} h={logoSize} flexShrink={0}>
            {opponent?.logo?.url && (
              <Image
                alt={opponent.name}
                src={opponent.logo?.formats?.small?.url || opponent.logo?.url}
                style={{ objectFit: 'contain' }}
                fill
                sizes="70px"
              />
            )}
          </Box>
        </Flex>
      </Flex>

      {/* Time footer */}
      {timeLabel && !finished && !isCancelled && (
        <Text
          color="whiteAlpha.400"
          fontSize="sm"
          fontWeight="600"
          letterSpacing="wider"
          textAlign="center"
          mt={1}
        >
          {timeLabel}
        </Text>
      )}
    </Box>
  )
}

export default SevensTournamentGame
