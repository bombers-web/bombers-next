import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import UpcomingGame from 'components/Games/UpcomingGame'

const getMonthLabel = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

const Upcoming = ({ upcoming }) => {
  // Group games by month
  const byMonth = {}
  upcoming?.forEach((game) => {
    const month = getMonthLabel(game.date)
    if (!byMonth[month]) byMonth[month] = []
    byMonth[month].push(game)
  })

  return upcoming?.length > 0 ? (
    <VStack spacing={6} align="stretch" w="full" py={4}>
      {Object.entries(byMonth).map(([month, games]) => (
        <Box key={month}>
          {/* Month header divider */}
          <Flex align="center" gap={3} mb={3}>
            <Text
              fontSize="lg"
              fontWeight="800"
              letterSpacing="widest"
              textTransform="uppercase"
              color="gray.400"
              whiteSpace="nowrap"
            >
              {month}
            </Text>
            <Box flex="1" h="1px" bg="gray.200" opacity={0.2} />
          </Flex>

          <VStack spacing={3} align="stretch">
            {games.map((game) => (
              <UpcomingGame
                key={game.id || game.date}
                homeTeam={{ name: game?.home?.name, logo: game?.home?.logo }}
                awayTeam={{ name: game?.away?.name, logo: game?.away?.logo }}
                date={game?.date}
                location={game?.location}
                cancelled={!!game?.cancelled}
              />
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  ) : (
    <Box textAlign="center" py={20} bg="blackAlpha.400" borderRadius="2xl">
      <Text
        fontSize="xl"
        color="whiteAlpha.500"
        textTransform="uppercase"
        letterSpacing="widest"
        fontWeight="bold"
      >
        No Games Currently Scheduled
      </Text>
    </Box>
  )
}

export default Upcoming
