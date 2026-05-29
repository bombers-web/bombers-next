import { Box, Collapse, Flex, Icon, Text, VStack } from '@chakra-ui/react'
import { FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useState } from 'react'
import SevensTournamentGame from './SevensTournamentGame'
import LocationWithCopy from '../../common/LocationWithCopy'

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
  const isInProgress = !finished && games.some((g) => g.finished)

  const recordLabel = hasRecord
    ? [
        record.wins,
        record.losses,
        ...(record.ties > 0 ? [record.ties] : []),
      ].join(' – ')
    : null

  return (
    <Box
      w="full"
      bg="brand.mediumSecondary"
      borderRadius="sm"
      overflow="hidden"
      border="1px solid"
      borderColor="whiteAlpha.100"
    >
      {/* Clickable header */}
      <Flex
        align="center"
        justify="space-between"
        px={{ base: 4, md: 7 }}
        py={{ base: 4, md: '1.125rem' }}
        cursor="pointer"
        onClick={() => setIsOpen((v) => !v)}
        _hover={{ bg: 'whiteAlpha.50' }}
        transition="background 0.15s, border-color 0.15s"
        borderBottom="1px solid"
        borderColor={isOpen ? 'brand.highlight' : 'whiteAlpha.200'}
        borderBottomWidth={isOpen ? '2px' : '1px'}
        bg={isOpen ? 'brand.darkSecondary' : 'transparent'}
      >
        {/* Left: short date + 7S badge + tournament name */}
        <Flex align="center" gap={4} minW={0}>
          <Text
            fontFamily="display"
            fontWeight="600"
            fontSize="sm"
            letterSpacing="wider"
            color={finished ? 'brand.meta' : 'brand.highlight'}
            flexShrink={0}
            w={16}
          >
            {date
              ? new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC',
                })
              : '—'}
          </Text>
          <Text
            fontFamily="display"
            fontWeight="700"
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
            color="brand.highlight"
            border="1px solid"
            borderColor="brand.highlight"
            px={2}
            py="0.1875rem"
            flexShrink={0}
          >
            7S
          </Text>
          <Text
            fontFamily="display"
            fontWeight="700"
            fontSize={{ base: 'md', md: 'lg' }}
            letterSpacing="wider"
            textTransform="uppercase"
            color="white"
            noOfLines={1}
          >
            {name}
          </Text>
        </Flex>

        {/* Right: record + status tags + chevron */}
        <Flex align="center" gap={3} flexShrink={0} ml={4}>
          {hasRecord && (
            <Text
              fontFamily="display"
              fontWeight="600"
              fontSize="sm"
              letterSpacing="wider"
              color="brand.light"
              whiteSpace="nowrap"
            >
              {recordLabel}
            </Text>
          )}
          {finished && (
            <Text
              fontFamily="display"
              fontWeight="700"
              fontSize="xs"
              letterSpacing="widest"
              textTransform="uppercase"
              px={2}
              py="0.1875rem"
              border="1px solid"
              borderColor="brand.win"
              color="brand.win"
              display={{ base: 'none', sm: 'block' }}
            >
              Complete
            </Text>
          )}
          {isInProgress && (
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
              color="brand.highlight"
              display={{ base: 'none', sm: 'block' }}
            >
              In Progress
            </Text>
          )}
          {!isOpen && games.length > 0 && !finished && !isInProgress && (
            <Text
              fontSize="xs"
              fontFamily="display"
              fontWeight="500"
              letterSpacing="widest"
              textTransform="uppercase"
              color="brand.meta"
              whiteSpace="nowrap"
              display={{ base: 'none', md: 'block' }}
            >
              {games.length} {games.length === 1 ? 'Game' : 'Games'}
            </Text>
          )}
          <Icon
            as={isOpen ? FiChevronUp : FiChevronDown}
            color={isOpen ? 'brand.highlight' : 'brand.meta'}
            boxSize={4}
            flexShrink={0}
            transition="color 0.15s"
          />
        </Flex>
      </Flex>

      {/* Collapsible: meta row + games */}
      <Collapse in={isOpen} animateOpacity>
        {/* Location + date meta */}
        <Flex
          align="center"
          gap={7}
          px={{ base: 4, md: 7 }}
          py={3}
          borderBottom="1px solid"
          borderColor="whiteAlpha.200"
          flexWrap="wrap"
        >
          {location?.name && (
            <LocationWithCopy
              name={`${location.name}${
                location.city ? `, ${location.city}` : ''
              }`}
              mapUrl={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                [location.name, location.address, location.city]
                  .filter(Boolean)
                  .join(' '),
              )}`}
              copyText={[location.name, location.address, location.city]
                .filter(Boolean)
                .join(', ')}
              color="brand.light"
              fontSize="sm"
              fontWeight="500"
              pinSize={3}
              stopPropagation
            />
          )}
          {dateLabel && (
            <Flex align="center" gap="0.375rem">
              <Icon
                as={FiCalendar}
                color="brand.meta"
                boxSize={3}
                flexShrink={0}
              />
              <Text fontSize="sm" color="brand.light" fontWeight="500">
                {dateLabel}
              </Text>
            </Flex>
          )}
        </Flex>

        {/* Games */}
        <Box px={{ base: 3, md: 5 }} py={4}>
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
              color="brand.meta"
              fontSize="sm"
              textAlign="center"
              py={4}
              textTransform="uppercase"
              letterSpacing="widest"
              fontFamily="display"
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
