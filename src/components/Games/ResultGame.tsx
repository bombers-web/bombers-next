import { Badge, Box, Flex, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { getMatchOutcome, parseScore, isBombers } from 'utils/matchOutcome'

const OUTCOME_LABEL = { win: 'WIN', loss: 'LOSS', tie: 'TIE' } as const

const ResultGame = ({
  homeTeam,
  awayTeam,
  date,
  winner,
  division,
  cancelled = false,
}) => {
  const d = new Date(date)
  const formattedDate = d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  })

  const isBombersHome = isBombers(homeTeam?.name)
  const bombers = isBombersHome ? homeTeam : awayTeam
  const opponent = isBombersHome ? awayTeam : homeTeam
  const bombersScore = parseScore(
    isBombersHome ? homeTeam?.score : awayTeam?.score,
  )
  const opponentScore = parseScore(
    isBombersHome ? awayTeam?.score : homeTeam?.score,
  )

  const result = getMatchOutcome({
    home: { name: homeTeam?.name },
    away: { name: awayTeam?.name },
    home_score: homeTeam?.score,
    away_score: awayTeam?.score,
    winner,
    cancelled,
  })
  const bombersWon = result === 'win'
  const outcome = cancelled
    ? 'CANCELLED'
    : result
    ? OUTCOME_LABEL[result]
    : null

  const outcomeScheme = cancelled
    ? 'red'
    : result === 'tie'
    ? 'gray'
    : result === 'win'
    ? 'green'
    : 'red'
  const borderColor =
    result === 'win'
      ? 'green.500'
      : result === 'loss'
      ? 'red.500'
      : result === 'tie'
      ? 'gray.600'
      : 'whiteAlpha.200'

  const bombersScoreColor = 'brand.light'

  const logoSize = { base: '50px', md: '70px' }
  const divisionLabel =
    division === 'd1' ? 'DI' : division === 'd2' ? 'DII' : null

  return (
    <Box
      w="full"
      bg="brand.mediumSecondary"
      borderRadius="lg"
      overflow="hidden"
      borderLeft="4px solid"
      borderLeftColor={borderColor}
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: 'scale(1.01)',
        boxShadow: '0 10px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header: outcome pill + date */}
      <Flex
        px={{ base: 4, md: 6 }}
        pt={4}
        pb={2}
        justify="space-between"
        align="baseline"
      >
        {outcome ? (
          <Badge
            colorScheme={outcomeScheme}
            variant="solid"
            fontSize="xs"
            fontWeight="black"
            letterSpacing="widest"
            px={3}
            py={1}
            borderRadius="full"
          >
            {outcome}
          </Badge>
        ) : (
          <Box />
        )}
        <Text
          color="brand.light"
          opacity={0.5}
          fontSize="md"
          fontWeight="600"
          letterSpacing="wider"
          textTransform="uppercase"
        >
          {formattedDate}
        </Text>
      </Flex>

      {/* Score row */}
      <Flex
        align="center"
        justify="center"
        gap={{ base: 3, md: 8 }}
        px={{ base: 4, md: 8 }}
        py={{ base: 4, md: 6 }}
        w="full"
      >
        {/* Bombers */}
        <Flex direction="column" align="center" flex="1">
          <Box
            position="relative"
            w={logoSize}
            h={logoSize}
            filter="drop-shadow(0 0 8px rgba(0,0,0,0.4))"
          >
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
            mt={2}
            textTransform="uppercase"
            letterSpacing="wider"
            textAlign="center"
          >
            {bombers?.name}
          </Text>
        </Flex>

        {/* Score display */}
        <VStack spacing={0} align="center" minW={{ base: '80px', md: '120px' }}>
          {!cancelled && (
            <Flex align="baseline" gap={2}>
              <Text
                fontSize={{ base: '4xl', md: '5xl' }}
                fontWeight="black"
                color={bombersScoreColor}
                lineHeight="1"
                fontFamily="display"
              >
                {bombersScore ?? '–'}
              </Text>
              <Text
                fontSize={{ base: 'xl', md: '3xl' }}
                fontWeight="300"
                color="whiteAlpha.300"
                lineHeight="1"
              >
                —
              </Text>
              <Text
                fontSize={{ base: '4xl', md: '5xl' }}
                fontWeight="black"
                color="whiteAlpha.500"
                lineHeight="1"
                fontFamily="display"
              >
                {opponentScore ?? '–'}
              </Text>
            </Flex>
          )}
          <Text
            fontSize="md"
            color={cancelled ? 'brand.loss' : 'brand.light'}
            letterSpacing="widest"
            textTransform="uppercase"
            mt={1}
          >
            {cancelled ? 'CANCELLED' : 'FINAL'}
          </Text>
        </VStack>

        {/* Opponent */}
        <Flex
          direction="column"
          align="center"
          flex="1"
          opacity={bombersWon ? 0.65 : 1}
          transition="opacity 0.2s"
        >
          <Box
            position="relative"
            w={logoSize}
            h={logoSize}
            filter="drop-shadow(0 0 8px rgba(0,0,0,0.4))"
          >
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
          <Text
            color="brand.light"
            fontWeight="bold"
            fontSize="md"
            mt={2}
            textTransform="uppercase"
            letterSpacing="wider"
            textAlign="center"
          >
            {opponent?.name}
          </Text>
        </Flex>
      </Flex>

      {/* Footer: division label */}
      {divisionLabel && (
        <Flex justify="center" pb={3}>
          <Text
            color="brand.light"
            opacity={0.5}
            fontSize="md"
            fontWeight="600"
            letterSpacing="wider"
            textTransform="uppercase"
          >
            {divisionLabel} Regular Season
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default ResultGame
