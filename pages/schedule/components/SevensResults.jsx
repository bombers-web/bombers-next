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
import SevensTournament from '../../../src/components/Games/SevensTournament'

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

const SevensResults = ({ tournaments = [] }) => {
  const [selectedSeason, setSelectedSeason] = useState('')
  const [loading, setLoading] = useState(true)

  const tournamentsBySeason = useMemo(() => {
    const grouped = {}
    tournaments.forEach((t) => {
      const season = getSeasonForDate(t.date)
      if (season) {
        if (!grouped[season]) grouped[season] = []
        grouped[season].push(t)
      }
    })
    const sorted = Object.keys(grouped).sort(
      (a, b) => parseInt(b.split('-')[0]) - parseInt(a.split('-')[0]),
    )
    const result = {}
    sorted.forEach((s) => (result[s] = grouped[s]))
    return result
  }, [tournaments])

  const tournamentsForSeason = useMemo(
    () => (selectedSeason ? tournamentsBySeason[selectedSeason] ?? [] : []),
    [selectedSeason, tournamentsBySeason],
  )

  useEffect(() => {
    if (Object.keys(tournamentsBySeason).length > 0 && !selectedSeason) {
      setSelectedSeason(Object.keys(tournamentsBySeason)[0])
    }
    if (selectedSeason || tournaments.length === 0) {
      setLoading(false)
    }
  }, [tournamentsBySeason, selectedSeason, tournaments])

  if (loading) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="brand.primary" thickness="4px" />
      </Center>
    )
  }

  const hasSeasons = Object.keys(tournamentsBySeason).length > 0

  return (
    <VStack spacing={6} align="stretch" w="full" py={4}>
      {hasSeasons && (
        <Menu matchWidth>
          <MenuButton
            as={Box}
            cursor="pointer"
            bg="brand.medium"
            borderRadius="xl"
            px={5}
            py={3}
            w="full"
            maxW="320px"
            mx="auto"
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
            {Object.keys(tournamentsBySeason).map((season) => (
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
      )}

      {tournamentsForSeason.length > 0 ? (
        <VStack spacing={3} align="stretch">
          {tournamentsForSeason.map((tournament) => (
            <SevensTournament
              key={tournament.id}
              tournament={tournament}
              defaultExpanded={false}
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
              : 'No Tournament Results Found'}
          </Text>
        </Box>
      )}
    </VStack>
  )
}

export default SevensResults
