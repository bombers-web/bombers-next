import {
  Box,
  Center,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'
import { useEffect, useMemo, useState } from 'react'
import ResultGame from 'components/Games/ResultGame'
import { getMatchOutcome } from 'utils/matchOutcome'

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
  } catch {
    return null
  }
}

const Results = ({ results }) => {
  const [selectedSeason, setSelectedSeason] = useState('')
  const [loading, setLoading] = useState(true)

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

  // Season record: wins/losses/ties from games with resolved outcomes.
  // Indeterminate games (finished but no scores and no winner) are not counted.
  const seasonRecord = useMemo(() => {
    let wins = 0
    let losses = 0
    let ties = 0
    gamesForSelectedSeason.forEach((game) => {
      const outcome = getMatchOutcome(game)
      if (outcome === 'win') wins++
      else if (outcome === 'loss') losses++
      else if (outcome === 'tie') ties++
    })
    return { wins, losses, ties }
  }, [gamesForSelectedSeason])

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
  const hasRecord =
    seasonRecord.wins + seasonRecord.losses + seasonRecord.ties > 0

  return (
    <VStack spacing={6} align="stretch" w="full" py={4}>
      {/* Season selector + record */}
      {hasSeasons && (
        <VStack
          justify="space-between"
          align="center"
          flexWrap="wrap"
          gap={3}
          mb={2}
        >
          <Menu matchWidth>
            <MenuButton
              as={Box}
              cursor="pointer"
              bg="brand.mediumSecondary"
              borderRadius="xl"
              px={5}
              py={3}
              w="full"
              maxW="320px"
              transition="background 0.15s"
            >
              <Flex justify="space-between" align="center">
                <Text
                  fontWeight="700"
                  fontSize="sm"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  color="brand.light"
                >
                  {selectedSeason}
                </Text>
                <Icon as={FiChevronDown} color="brand.light" opacity={0.5} />
              </Flex>
            </MenuButton>
            <MenuList
              bg="brand.dark"
              borderColor="whiteAlpha.100"
              borderRadius="xl"
              boxShadow="0 8px 32px rgba(0,0,0,0.5)"
              py={2}
            >
              {Object.keys(gamesBySeason).map((season) => (
                <MenuItem
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  bg="transparent"
                  color="brand.light"
                  fontWeight={season === selectedSeason ? '800' : '500'}
                  fontSize="sm"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  _hover={{ bg: 'whiteAlpha.100', color: 'brand.highlight' }}
                  _focus={{ bg: 'whiteAlpha.100' }}
                >
                  {season}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          {hasRecord && (
            <Box
              bg="brand.mediumSecondary"
              borderRadius="xl"
              px={6}
              py={4}
              w="full"
              maxW="320px"
            >
              <Text
                fontSize="10px"
                fontWeight="800"
                letterSpacing="widest"
                textTransform="uppercase"
                color="brand.light"
                textAlign="center"
                mb={3}
              >
                Season Record
              </Text>
              <Flex justify="center" align="center" gap={0}>
                {[
                  {
                    label: 'W',
                    value: seasonRecord.wins,
                    color: 'brand.light',
                  },
                  {
                    label: 'L',
                    value: seasonRecord.losses,
                    color: 'brand.light',
                  },
                  ...(seasonRecord.ties > 0
                    ? [
                        {
                          label: 'T',
                          value: seasonRecord.ties,
                          color: 'brand.light',
                        },
                      ]
                    : []),
                ].map((stat, i, arr) => (
                  <Flex key={stat.label} align="center" flex="1">
                    <Flex direction="column" align="center" flex="1">
                      <Text
                        fontSize="5xl"
                        fontWeight="black"
                        color={stat.color}
                        lineHeight="1"
                        fontFamily="display"
                      >
                        {stat.value}
                      </Text>
                      <Text
                        fontWeight="700"
                        letterSpacing="widest"
                        textTransform="uppercase"
                        color="brand.light"
                        mt={1}
                      >
                        {stat.label}
                      </Text>
                    </Flex>
                    {i < arr.length - 1 && (
                      <Box w="1px" h="36px" bg="whiteAlpha.200" />
                    )}
                  </Flex>
                ))}
              </Flex>
            </Box>
          )}
        </VStack>
      )}

      {/* Games list */}
      {gamesForSelectedSeason.length > 0 ? (
        <VStack spacing={3} align="stretch" w="full">
          {gamesForSelectedSeason.map((game) => (
            <ResultGame
              key={game.id || `${game.date}-${game?.home?.name}`}
              homeTeam={{
                name: game?.home?.name,
                logo: game?.home?.logo,
                score: game?.home_score,
              }}
              awayTeam={{
                name: game?.away?.name,
                logo: game?.away?.logo,
                score: game?.away_score,
              }}
              date={game?.date}
              finished={game?.finished}
              division={game?.division}
              winner={game?.winner}
              cancelled={!!game?.cancelled}
            />
          ))}
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
