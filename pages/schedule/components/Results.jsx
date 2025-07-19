import {
  Box,
  Text,
  Select,
  VStack,
  Spinner,
  Center,
  Flex,
} from "@chakra-ui/react";
import GameInfo from "../../../src/components/Games/GameInfo";
import React, { useState, useEffect, useMemo } from "react";

const Results = ({ results }) => {
  const [selectedSeason, setSelectedSeason] = useState("");
  const [loading, setLoading] = useState(true);

  const getSeasonForDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null;

      const year = date.getFullYear();
      const month = date.getMonth();

      // If the month is August (7) or later (Sept, Oct, Nov, Dec)
      // it belongs to the season starting in the current year.
      // e.g., August 2024 -> 2024-2025 Season
      if (month >= 7) {
        return `${year}-${year + 1} Season`;
      }
      // If the month is before August (Jan-July),
      // it belongs to the season that started in the previous year.
      // e.g., March 2025 -> 2024-2025 Season
      else {
        return `${year - 1}-${year} Season`;
      }
    } catch (error) {
      console.error("Error determining season for date:", dateString, error);
      return null;
    }
  };

  const gamesBySeason = useMemo(() => {
    const grouped = {};
    if (results && results.length > 0) {
      results.forEach((game) => {
        const season = getSeasonForDate(game?.date);
        if (season) {
          if (!grouped[season]) {
            grouped[season] = [];
          }
          grouped[season].push(game);
        }
      });
    }

    const sortedSeasons = Object.keys(grouped).sort((a, b) => {
      const yearA = parseInt(a.split("-")[0]);
      const yearB = parseInt(b.split("-")[0]);
      return yearB - yearA;
    });

    const sortedGrouped = {};
    sortedSeasons.forEach((season) => {
      sortedGrouped[season] = grouped[season];
    });

    return sortedGrouped;
  }, [results]);

  const gamesForSelectedSeason = useMemo(() => {
    return selectedSeason ? gamesBySeason[selectedSeason] || [] : [];
  }, [selectedSeason, gamesBySeason]);

  useEffect(() => {
    if (Object.keys(gamesBySeason).length > 0 && !selectedSeason) {
      const latestSeason = Object.keys(gamesBySeason)[0];
      setSelectedSeason(latestSeason);
    }

    if (!results || results.length === 0) {
      setLoading(false);
    }
  }, [gamesBySeason, selectedSeason, results]);

  useEffect(() => {
    if (selectedSeason || (results && results.length === 0)) {
      setLoading(false);
    }
  }, [selectedSeason, results]);

  if (loading) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="brand.primary" />
      </Center>
    );
  }

  const hasSeasons = Object.keys(gamesBySeason).length > 0;

  return (
    <VStack spacing={6} align="stretch" p={4}>
      {hasSeasons && (
        <Flex direction="column" align="center" gap={2} mb={4}>
          <Select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            bg="white"
            borderColor="gray.300"
            _hover={{ borderColor: "gray.800" }}
            focusBorderColor="brand.primary"
            textAlign={"center"}
            maxWidth={"300px"}
          >
            {Object.keys(gamesBySeason).map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </Select>
        </Flex>
      )}
      {gamesForSelectedSeason.length > 0 ? (
        <Box>
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
              preview: false,
            };

            return (
              <Box
                key={
                  game.id ||
                  `${game.date}-${game?.home?.name}-${game?.away?.name}`
                }
                p={2}
                m={2}
                borderRadius="md"
                boxShadow="sm"
                _hover={{
                  boxShadow: "md",
                  transform: "translateY(-2px)",
                }}
                transition="all 0.2s ease-in-out"
                bg="brand.meta"
              >
                <GameInfo {...gameInfoProps} />
              </Box>
            );
          })}
        </Box>
      ) : (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" color="gray.500">
            {selectedSeason
              ? `No games found for the ${selectedSeason}.`
              : "No Games Currently Scheduled!"}
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default Results;
