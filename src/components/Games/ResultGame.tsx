import { Badge, Box, Flex, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'

const ResultGame = ({
  homeTeam,
  awayTeam,
  date,
  winner,
  finished,
  division,
}) => {
  const d = new Date(date)
  const formattedDate = d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  })

  const isBombersHome = homeTeam?.name?.includes('Bombers')
  const bombers = isBombersHome ? homeTeam : awayTeam
  const opponent = isBombersHome ? awayTeam : homeTeam
  const bombersScore = isBombersHome ? homeTeam?.score : awayTeam?.score
  const opponentScore = isBombersHome ? awayTeam?.score : homeTeam?.score

  const bombersWon = winner?.name?.includes('St. Louis Bombers')
  const hasTie = finished && !winner?.id
  const outcome = hasTie
    ? 'TIE'
    : bombersWon
    ? 'WIN'
    : winner?.id
    ? 'LOSS'
    : null

  const outcomeScheme = hasTie ? 'gray' : bombersWon ? 'green' : 'red'
  const borderColor = hasTie
    ? 'gray.600'
    : bombersWon
    ? 'green.500'
    : winner?.id
    ? 'red.500'
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
          <Text
            fontSize="md"
            color="brand.light"
            letterSpacing="widest"
            textTransform="uppercase"
            mt={1}
          >
            FINAL
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
