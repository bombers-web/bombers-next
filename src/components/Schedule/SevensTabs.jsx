import { Box, Flex, Select, Text, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import SevensTournament from 'components/Games/SevensTournament'

const getSeasonForDate = (dateString) => {
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return null
    const year = date.getFullYear()
    const month = date.getMonth()
    return month >= 7
      ? `${year}–${year + 1} Season`
      : `${year - 1}–${year} Season`
  } catch {
    return null
  }
}

const SevensTabs = ({ tournaments = [] }) => {
  const seasons = useMemo(() => {
    const s = new Set()
    tournaments.forEach((t) => {
      const season = getSeasonForDate(t.date)
      if (season) s.add(season)
    })
    return Array.from(s).sort((a, b) => parseInt(b) - parseInt(a))
  }, [tournaments])

  const [selectedSeason, setSelectedSeason] = useState('')

  useEffect(() => {
    if (seasons.length > 0 && !selectedSeason) {
      setSelectedSeason(seasons[0])
    }
  }, [seasons, selectedSeason])

  const filtered = useMemo(
    () =>
      selectedSeason
        ? tournaments.filter((t) => getSeasonForDate(t.date) === selectedSeason)
        : tournaments,
    [tournaments, selectedSeason],
  )

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [filtered],
  )

  return (
    <VStack spacing={0} align="stretch" w="full">
      {seasons.length > 0 && (
        <Box mb={6}>
          <Select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            aria-label="Select season"
            bg="brand.mediumSecondary"
            color="white"
            border="1px solid"
            borderColor="whiteAlpha.300"
            borderRadius="sm"
            fontFamily="display"
            fontWeight="500"
            fontSize="sm"
            letterSpacing="widest"
            textTransform="uppercase"
            cursor="pointer"
            iconColor="brand.highlight"
            maxW={300}
            _focus={{ boxShadow: 'none', borderColor: 'brand.highlight' }}
            sx={{ option: { background: '#2f2f2f', color: 'white' } }}
          >
            {seasons.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {sorted.length > 0 ? (
        <VStack spacing={3} align="stretch" w="full">
          {sorted.map((tournament) => (
            <SevensTournament
              key={tournament.id}
              tournament={tournament}
              defaultExpanded={false}
            />
          ))}
        </VStack>
      ) : (
        <Box
          bg="brand.mediumSecondary"
          borderRadius="sm"
          py={16}
          textAlign="center"
        >
          <Text
            fontFamily="display"
            fontWeight="600"
            fontSize="sm"
            letterSpacing="widest"
            textTransform="uppercase"
            color="brand.meta"
          >
            No Tournaments Scheduled
          </Text>
        </Box>
      )}
    </VStack>
  )
}

export default SevensTabs
