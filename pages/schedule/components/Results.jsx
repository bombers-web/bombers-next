import {
  Box,
  Center,
  Flex,
  Select,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import GameInfo from '../../../src/components/Games/GameInfo'
import { faLess } from '@fortawesome/free-brands-svg-icons'

const Results = ({ results }) => {
  const [selectedSeason, setSelectedSeason] = useState('')
  const [loading, setLoading] = useState(true)

  const getSeasonForDate = (dateString) => {
    if (!dateString) return null
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return null
      const year = date.getFullYear()
      const month = date.getMonth()
      return month >= 7
        ? `${year}-${year + 1} Season`
        : `${year - 1}-${year} Season`
    } catch (error) {
      return null
    }
  }

  const gamesBySeason = useMemo(() => {
    const grouped = {}
    if (results?.length > 0) {
      results.forEach((game) => {
        const season = getSeasonForDate(game?.date)
        if (season) {
          if (!grouped[season]) grouped[season] = []
          grouped[season].push(game)
        }
      })
    }
    const sortedSeasons = Object.keys(grouped).sort(
      (a, b) => parseInt(b.split('-')[0]) - parseInt(a.split('-')[0]),
    )
    const sortedGrouped = {}
    sortedSeasons.forEach((season) => {
      sortedGrouped[season] = grouped[season]
    })
    return sortedGrouped
  }, [results])

  const gamesForSelectedSeason = useMemo(() => {
    return selectedSeason ? gamesBySeason[selectedSeason] || [] : []
  }, [selectedSeason, gamesBySeason])

  useEffect(() => {
    if (Object.keys(gamesBySeason).length > 0 && !selectedSeason) {
      setSelectedSeason(Object.keys(gamesBySeason)[0])
    }
    if (selectedSeason || !results || results.length === 0) {
      setLoading(false)
    }
  }, [gamesBySeason, selectedSeason, results])

  if (loading) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="brand.primary" thickness="4px" />
      </Center>
    )
  }

  const hasSeasons = Object.keys(gamesBySeason).length > 0

  return (
    <VStack spacing={6} align="stretch" w="full" py={4}>
      {/* SEASON SELECTOR - TIGHTENED AESTHETIC */}
      {hasSeasons && (
        <Flex justify="center" mb={2}>
          <Select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            bg="white"
            borderColor="gray.200"
            _hover={{ borderColor: 'brand.primary' }}
            fontWeight="bold"
            textAlign="center"
            maxWidth="300px"
            size="lg"
            borderRadius="xl"
            boxShadow="sm"
          >
            {Object.keys(gamesBySeason).map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </Select>
        </Flex>
      )}

      {/* GAMES LIST - MATCHES SCHEDULE COMPONENT */}
      {gamesForSelectedSeason.length > 0 ? (
        <VStack spacing={4} align="stretch" w="full">
          {gamesForSelectedSeason.map((game) => {
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
              finished: game?.finished,
              division: game?.division,
              winner: game?.winner,
              cancelled:
                game?.finished &&
                game?.home_score == null &&
                game?.away_score == null,
              preview: false,
              showLocation: false,
            }

            return (
              <Box
                key={game.id || `${game.date}-${game?.home?.name}`}
                transition="all 0.2s ease-in-out"
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
        <Box
          textAlign="center"
          py={20}
          bg="blackAlpha.400"
          borderRadius="2xl"
          mx={2}
        >
          <Text
            fontSize="xl"
            color="whiteAlpha.500"
            textTransform="uppercase"
            letterSpacing="widest"
            fontWeight="bold"
          >
            {selectedSeason
              ? `No results for ${selectedSeason}`
              : 'No Results Found'}
          </Text>
        </Box>
      )}
    </VStack>
  )
}

export default Results
