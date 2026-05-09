import {
  Box,
  Collapse,
  Flex,
  Icon,
  Link,
  Text,
  VStack,
  Badge,
} from '@chakra-ui/react'
import {
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiMapPin,
} from 'react-icons/fi'
import { useState } from 'react'
import SevensTournamentGame from './SevensTournamentGame'

const SevensTournament = ({ tournament, defaultExpanded = false }) => {
  const [isOpen, setIsOpen] = useState(defaultExpanded)
  const { name, date, location, games = [], finished } = tournament

  const dateLabel = date
    ? new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null

  const mapUrl =
    location?.address || location?.name
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${location.name ?? ''} ${location.address ?? ''}`.trim(),
        )}`
      : null

  const record = games.reduce(
    (acc, game) => {
      if (!game?.finished) return acc
      const isCancelled = game.home_score == null && game.away_score == null
      if (isCancelled) return acc
      const bombersWon = game?.winner?.name?.includes('St. Louis Bombers')
      const hasTie = game.finished && !game?.winner?.id
      if (bombersWon) acc.wins++
      else if (hasTie) acc.ties++
      else if (game?.winner?.id) acc.losses++
      return acc
    },
    { wins: 0, losses: 0, ties: 0 },
  )

  const hasRecord = finished && record.wins + record.losses + record.ties > 0

  return (
    <Box
      w="full"
      bg="brand.medium"
      borderRadius="xl"
      overflow="hidden"
      border="1px solid"
      borderColor="whiteAlpha.100"
    >
      {/* Clickable header */}
      <Box
        as="button"
        w="full"
        onClick={() => setIsOpen((v) => !v)}
        textAlign="left"
        _hover={{ bg: 'whiteAlpha.50' }}
        transition="background 0.15s"
        px={{ base: 4, md: 6 }}
        pt={4}
        pb={4}
      >
        <Flex direction="column" gap={2}>
          {/* Row 1: name (left) — chevron (right) */}
          <Flex align="center" justify="space-between">
            <Text
              color="brand.light"
              fontWeight="800"
              fontSize={{ base: 'md', md: 'lg' }}
              textTransform="uppercase"
              letterSpacing="wider"
              margin={0}
            >
              {name}
            </Text>

            <Flex align="center" gap={2} flexShrink={0}>
              {hasRecord && (
                <Flex gap={1} align="center">
                  <Badge
                    colorScheme="green"
                    variant="solid"
                    borderRadius="full"
                    px={2}
                    fontSize="xs"
                  >
                    {record.wins}W
                  </Badge>
                  <Badge
                    colorScheme="red"
                    variant="solid"
                    borderRadius="full"
                    px={2}
                    fontSize="xs"
                  >
                    {record.losses}L
                  </Badge>
                  {record.ties > 0 && (
                    <Badge
                      colorScheme="gray"
                      variant="solid"
                      borderRadius="full"
                      px={2}
                      fontSize="xs"
                    >
                      {record.ties}T
                    </Badge>
                  )}
                </Flex>
              )}
              <Icon
                as={isOpen ? FiChevronUp : FiChevronDown}
                color="brand.light"
                opacity={0.5}
                boxSize={5}
              />
            </Flex>
          </Flex>

          {/* Row 2: 2×2 grid — location/city (left) | date/games (right) */}
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gridTemplateRows="auto auto"
            rowGap={1}
          >
            {/* Left col, row 1: location */}
            <Flex align="center" gap={1} gridColumn="1" gridRow="1">
              {location &&
                (mapUrl ? (
                  <Link
                    href={mapUrl}
                    isExternal
                    color="brand.highlight"
                    fontSize="sm"
                    fontWeight="semibold"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    _hover={{ color: 'yellow.200', textDecoration: 'none' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon as={FiMapPin} boxSize={3} />
                    {location.name}
                  </Link>
                ) : location ? (
                  <Flex align="center" gap={1}>
                    <Icon as={FiMapPin} color="brand.highlight" boxSize={3} />
                    <Text color="brand.highlight" fontSize="sm">
                      {location.name}
                    </Text>
                  </Flex>
                ) : null)}
            </Flex>

            {/* Right col, row 1: date */}
            <Flex
              align="center"
              gap={1}
              gridColumn="2"
              gridRow="1"
              justify="flex-end"
            >
              {dateLabel && (
                <>
                  <Icon as={FiCalendar} color="brand.highlight" boxSize={3} />
                  <Text color="brand.light" opacity={0.6} fontSize="sm">
                    {dateLabel}
                  </Text>
                </>
              )}
            </Flex>

            {/* Left col, row 2: city */}
            <Box gridColumn="1" gridRow="2">
              {location?.city && (
                <Text
                  fontSize="xs"
                  color="brand.light"
                  opacity={0.4}
                  fontWeight="600"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  {location.city}
                </Text>
              )}
            </Box>

            {/* Right col, row 2: game count */}
            <Flex gridColumn="2" gridRow="2" justify="flex-end">
              {games.length > 0 && (
                <Text
                  fontSize="xs"
                  color="brand.light"
                  opacity={0.4}
                  fontWeight="600"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  {games.length} {games.length === 1 ? 'Game' : 'Games'}
                </Text>
              )}
            </Flex>
          </Box>
        </Flex>
      </Box>

      {/* Collapsible games */}
      <Collapse in={isOpen} animateOpacity>
        <Box px={{ base: 3, md: 5 }} pb={4}>
          {games.length > 0 ? (
            <VStack spacing={2} align="stretch">
              {games.map((game) => (
                <SevensTournamentGame
                  key={game.id ?? `${game.date}-${game.home?.name}`}
                  game={game}
                />
              ))}
            </VStack>
          ) : (
            <Text
              color="whiteAlpha.400"
              fontSize="sm"
              textAlign="center"
              py={4}
              textTransform="uppercase"
              letterSpacing="widest"
            >
              No games scheduled
            </Text>
          )}
        </Box>
      </Collapse>
    </Box>
  )
}

export default SevensTournament
