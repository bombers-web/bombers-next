import { Box, Text, Divider, Stack } from "@chakra-ui/react";
import GameInfo from "../../../src/components/Games/GameInfo";

const Results = ({ results }) => {
  return results?.length > 0 ? (
    <>
      {results.map((game) => {
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
          <>
            <Box
              key={game.id || game.date}
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
          </>
        );
      })}
    </>
  ) : (
    <Box textAlign="center" py={10}>
      <Text fontSize="xl" color="gray.500">
        No Games Currently Scheduled!
      </Text>
    </Box>
  );
};

export default Results;
