import { Badge, Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'

const SevensTournamentGame = ({ game }) => {
  const { home, away, home_score, away_score, finished, winner, date } = game

  const timeLabel = date
    ? new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null

  const isBombersHome = home?.name?.includes('Bombers')
  const bombers = isBombersHome ? home : away
  const opponent = isBombersHome ? away : home
  const bombersScore = isBombersHome ? home_score : away_score
  const opponentScore = isBombersHome ? away_score : home_score

  const isCancelled = finished && home_score == null && away_score == null
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

  const borderColor = hasTie
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
      pb={timeLabel && !finished ? 1.5 : 2}
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

        {/* Center: score or VS */}
        <Flex align="center" gap={2} flexShrink={0}>
          {finished ? (
            <>
              {outcome && (
                <Badge
                  colorScheme={
                    isCancelled
                      ? 'orange'
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
              />
            )}
          </Box>
        </Flex>
      </Flex>

      {/* Time footer */}
      {timeLabel && !finished && (
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
