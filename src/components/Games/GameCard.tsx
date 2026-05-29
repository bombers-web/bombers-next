import { Box, Center, Divider, Flex, Text, VStack } from '@chakra-ui/react'
import LocationWithCopy from '../../common/LocationWithCopy'
import MatchTeams from './MatchTeams'
import Team from './Team'

/**
 * GameCard — unified component for displaying a scheduled game.
 *
 * Props:
 *   homeTeam      { name, logo, score }
 *   awayTeam      { name, logo, score }
 *   date          ISO date string
 *   location      { name, address }
 *   winner        { id, name }  — optional, shows WIN/LOSS/TIE when provided
 *   compact       boolean — compact layout for home page previews (default: false)
 *   showLocation  boolean — show location row (default: true)
 */
const GameCard = ({
  homeTeam,
  awayTeam,
  date,
  location,
  division,
  winner = undefined,
  compact = false,
  showLocation = true,
}) => {
  const d = new Date(date)
  const formattedDay = d.toLocaleDateString('en-US', { weekday: 'short' })
  const formattedDate = d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  })
  const formattedLongDate = d.toLocaleDateString('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  })
  const formattedTime = d.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const isBombers = (name) => name?.includes('Bombers')
  const bombersWon = winner?.name?.includes('St. Louis Bombers')

  const statusColor = !winner?.id
    ? 'gray.400'
    : bombersWon
    ? 'green.500'
    : 'red.500'
  const statusLabel = !winner?.id ? 'TIE' : bombersWon ? 'WIN' : 'LOSS'

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location?.address,
  )}`

  // ─── Compact layout (home page preview) ───────────────────────────────────
  if (compact) {
    return (
      <Box w="full" py={6}>
        {/* Teams */}
        <MatchTeams match={{ home: homeTeam, away: awayTeam, division }} />

        {/* Date & Time */}
        <VStack spacing={1} mt={4}>
          <Text color="white" fontWeight="bold" fontSize="lg">
            {formattedLongDate} @ {formattedTime}
          </Text>

          {/* Location */}
          {showLocation && (
            <Box>
              {location?.city && (
                <Text
                  fontSize="xs"
                  color="white"
                  opacity={0.7}
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  {location?.city}
                </Text>
              )}
              <LocationWithCopy
                name={location?.name}
                mapUrl={mapUrl}
                copyText={`${location?.name ?? ''} ${
                  location?.address ?? ''
                }`.trim()}
                color="yellow.400"
              />
            </Box>
          )}

          {/* Result badge (if winner provided) */}
          {winner !== undefined && !showLocation && (
            <Text
              fontSize="md"
              fontWeight="black"
              color={statusColor}
              letterSpacing="4px"
              opacity={0.8}
            >
              {statusLabel}
            </Text>
          )}
        </VStack>
      </Box>
    )
  }

  return (
    <Box
      w="full"
      bg="brand.meta"
      py={{ base: 6, md: 8 }}
      px={{ base: 4, md: 8 }}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        width="100%"
        gap={{ base: 6, md: 8 }}
      >
        {/* Date & Time */}
        <Flex align="center" justify="center" gap={{ base: 4, md: 6 }} w="full">
          <VStack align="center" spacing={0}>
            <Text
              color="brand.light"
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight="900"
              letterSpacing="3px"
            >
              {formattedDay}
            </Text>
            <Text
              color="brand.light"
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="900"
              lineHeight="0.9"
            >
              {formattedDate}
            </Text>
          </VStack>
          <Divider
            orientation="vertical"
            h={{ base: '40px', md: '50px' }}
            borderColor="brand.light"
            opacity={0.2}
          />
          <VStack align="center" spacing={0}>
            <Text
              color="brand.light"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="800"
              lineHeight="1"
            >
              {formattedTime}
            </Text>
          </VStack>
        </Flex>

        {/* Teams */}
        <Flex
          align="center"
          justify="center"
          gap={{ base: 4, md: 10 }}
          w="full"
          flexWrap="wrap"
        >
          <Team team={isBombers(homeTeam?.name) ? homeTeam : awayTeam} />
          <Center>
            <Text
              fontWeight="black"
              fontSize={{ base: 'sm', md: 'md' }}
              color="gray.400"
              fontStyle="italic"
            >
              {isBombers(homeTeam?.name) ? 'VS' : '@'}
            </Text>
          </Center>
          <Team team={isBombers(homeTeam?.name) ? awayTeam : homeTeam} />
        </Flex>

        {/* Location or Result */}
        <Flex justify="center" w="full">
          {showLocation ? (
            <VStack align="center" spacing={0}>
              <LocationWithCopy
                name={location?.name}
                mapUrl={mapUrl}
                copyText={`${location?.name ?? ''} ${
                  location?.address ?? ''
                }`.trim()}
                color="brand.light"
                fontSize={{ base: 'lg', md: '2xl' }}
                fontWeight="900"
                textTransform="uppercase"
                pinSize={{ base: 5, md: 7 }}
              />
              {location?.city && (
                <Text
                  fontSize={{ base: 'xs', md: 'sm' }}
                  fontWeight="500"
                  color="brand.light"
                  opacity={0.6}
                  letterSpacing="2px"
                  textTransform="uppercase"
                >
                  {location?.city}
                </Text>
              )}
            </VStack>
          ) : (
            <VStack align="center" spacing={0}>
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="black"
                color={statusColor}
                letterSpacing="4px"
                opacity={0.8}
              >
                {statusLabel}
              </Text>
            </VStack>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default GameCard
