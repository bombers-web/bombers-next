import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import SevensTournament from '../../../src/components/Games/SevensTournament'

const getMonthLabel = (dateString) =>
  new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })

const SevensUpcoming = ({ tournaments = [] }) => {
  const byMonth = {}
  tournaments.forEach((t) => {
    const month = getMonthLabel(t.date)
    if (!byMonth[month]) byMonth[month] = []
    byMonth[month].push(t)
  })

  return tournaments.length > 0 ? (
    <VStack spacing={6} align="stretch" w="full" py={4}>
      {Object.entries(byMonth).map(([month, items]) => (
        <Box key={month}>
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
            {items.map((tournament) => (
              <SevensTournament
                key={tournament.id}
                tournament={tournament}
                defaultExpanded={false}
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
        No Upcoming Tournaments
      </Text>
    </Box>
  )
}

export default SevensUpcoming
