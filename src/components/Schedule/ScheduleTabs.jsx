import { Box, Flex, Select, Text, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import MatchCard from './MatchCard'

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

const ScheduleTabs = ({ games = [] }) => {
  const seasons = useMemo(() => {
    const s = new Set()
    games.forEach((g) => {
      const season = getSeasonForDate(g.date)
      if (season) s.add(season)
    })
    return Array.from(s).sort((a, b) => parseInt(b) - parseInt(a))
  }, [games])

  const [selectedSeason, setSelectedSeason] = useState('')

  useEffect(() => {
    if (seasons.length > 0 && !selectedSeason) {
      setSelectedSeason(seasons[0])
    }
  }, [seasons, selectedSeason])

  const filtered = useMemo(
    () =>
      selectedSeason
        ? games.filter((g) => getSeasonForDate(g.date) === selectedSeason)
        : games,
    [games, selectedSeason],
  )

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [filtered],
  )

  const record = useMemo(() => {
    let wins = 0,
      losses = 0,
      ties = 0
    filtered.forEach((g) => {
      if (!g?.finished) return
      if (g?.winner?.name?.includes('St. Louis Bombers')) wins++
      else if (g?.winner?.id) losses++
      else ties++
    })
    return { wins, losses, ties }
  }, [filtered])

  const hasRecord = record.wins + record.losses + record.ties > 0

  return (
    <VStack spacing={0} align="stretch" w="full">
      {/* Record bar: season selector + W/L/T pill */}
      <Flex align="center" mb={6}>
        <Box flex={1}>
          {seasons.length > 0 && (
            <Select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
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
          )}
        </Box>

        {hasRecord && (
          <Flex
            align="stretch"
            bg="brand.mediumSecondary"
            borderRadius="sm"
            overflow="hidden"
            border="1px solid"
            borderColor="whiteAlpha.200"
          >
            {[
              { label: 'W', value: record.wins },
              { label: 'L', value: record.losses },
              ...(record.ties > 0 ? [{ label: 'T', value: record.ties }] : []),
            ].map((stat, i, arr) => (
              <Flex
                key={stat.label}
                direction="column"
                align="center"
                px={6}
                py={2}
                gap="0.125rem"
                borderRight={i < arr.length - 1 ? '1px solid' : 'none'}
                borderColor="whiteAlpha.200"
              >
                <Text
                  fontFamily="display"
                  fontWeight="700"
                  fontSize="2xl"
                  color="white"
                  lineHeight="1"
                >
                  {stat.value}
                </Text>
                <Text
                  fontFamily="display"
                  fontWeight="600"
                  fontSize="xs"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  color="brand.meta"
                >
                  {stat.label}
                </Text>
              </Flex>
            ))}
          </Flex>
        )}

        <Box flex={1} />
      </Flex>

      {sorted.length > 0 ? (
        sorted.map((game) => (
          <MatchCard
            key={game.id || `${game.date}-${game?.home?.name}`}
            game={game}
          />
        ))
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
            No Games Scheduled
          </Text>
        </Box>
      )}
    </VStack>
  )
}

export default ScheduleTabs
