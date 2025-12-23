import { Box, Text, VStack } from '@chakra-ui/react'
import GameInfo from '../../../src/components/Games/GameInfo'

const Schedule = ({ upcoming }) => {
  return upcoming?.length > 0 ? (
    <VStack spacing={4} align="stretch" w="full" py={4}>
      {upcoming.map((game) => {
        const gameInfoProps = {
          homeTeam: {
            name: game?.home?.name,
            logo: game?.home?.logo,
            score: game?.home_score,
          },
          awayTeam: {
            name: game?.away?.name,
            logo: game?.away?.logo,
            score: game?.away_score,
          },
          date: game?.date,
          location: game?.location,
          preview: false,
        }

        return (
          <Box
            key={game.id || game.date}
            _hover={{
              transform: 'scale(1.01)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
            }}
          >
            <GameInfo {...gameInfoProps} />
          </Box>
        )
      })}
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

export default Schedule
