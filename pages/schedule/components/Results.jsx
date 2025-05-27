// import React from "react";
// import GameInfo from "../../../src/components/Games/GameInfo";
// import {
//   Box,
//   Divider,
//   Stack,
//   Text,
//   Accordion,
//   AccordionButton,
//   AccordionIcon,
//   AccordionItem,
//   AccordionPanel,
// } from "@chakra-ui/react";

// const Results = ({ results }) => {
//   const formatDateTime = (dateTime) => {
//     const date = new Date(dateTime);
//     const formattedDate =
//       date.toLocaleDateString("en-US", { weekday: "short" }) +
//       " " +
//       date.toLocaleDateString("en-US", { month: "short" }) +
//       " " +
//       date.toLocaleDateString("en-US", { day: "2-digit" });
//     const time = date.toLocaleString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     return {
//       date: formattedDate,
//       time,
//     };
//   };
//   const isBombers = (team) => {
//     return team === "Bombers";
//   };

//   const isHome = (homeTeam) => {
//     return isBombers(homeTeam);
//   };

//   return (
//     <Accordion allowMultiple defaultIndex={[0]}>
//       {results?.map((game) => {
//         const gameInfoProps = {
//           homeTeam: {
//             name: game.home?.name,
//             logo: game.home?.logo,
//             score: game.home_score,
//           },
//           awayTeam: {
//             name: game.away?.name,
//             logo: game.away?.logo,
//             score: game.away_score,
//           },
//           location: game.location,
//         };
//         return (
//           <AccordionItem key={game.slug} maxW="1200px">
//             <AccordionButton
//               _expanded={{ bg: "brand.800", color: "brand.400" }}
//             >
//               <Stack
//                 direction="row"
//                 textAlign="left"
//                 alignItems="center"
//                 justifyContent="start"
//                 w="100%"
//               >
//                 <Box>
//                   <Text
//                     m={0}
//                     fontWeight="light"
//                     fontSize="md"
//                     textTransform="uppercase"
//                     fontFamily="body"
//                   >
//                     {formatDateTime(game.date).date}
//                   </Text>
//                 </Box>
//                 <Divider size="xl" orientation="vertical"></Divider>
//                 <Box>
//                   <Text
//                     m={0}
//                     fontWeight="bold"
//                     fontSize="lg"
//                     textTransform="uppercase"
//                     fontFamily="body"
//                   >
//                     {isHome(game.home?.name)
//                       ? `${game.home?.name} - ${game.away?.name}`
//                       : `${game.away?.name} @ ${game.home?.name}`}
//                   </Text>
//                 </Box>
//                 <Divider size="xl" orientation="vertical"></Divider>
//                 <Box flex="1">
//                   <Text
//                     m={0}
//                     fontWeight="light"
//                     fontSize="xl"
//                     textTransform="uppercase"
//                     fontFamily="body"
//                     as="b"
//                     color={
//                       game.winner?.id === undefined
//                         ? "gray"
//                         : game.winner.name.includes("St. Louis Bombers")
//                         ? "green"
//                         : "red"
//                     }
//                   >
//                     {game.winner?.id === undefined
//                       ? "T"
//                       : game.winner.name.includes("St. Louis Bombers")
//                       ? "W"
//                       : "L"}
//                   </Text>
//                 </Box>
//                 <AccordionIcon />
//               </Stack>
//             </AccordionButton>
//             <AccordionPanel pb={4}>
//               <GameInfo {...gameInfoProps} />
//             </AccordionPanel>
//           </AccordionItem>
//         );
//       })}
//     </Accordion>
//   );
// };

// export default Results;

import { Box, Text, Divider, Stack, Seperator } from "@chakra-ui/react";
import GameInfo from "../../../src/components/Games/GameInfo";

const Results = ({ results }) => {
  console.log("Results:", results);
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
              <Stack
                direction="row"
                textAlign="center"
                alignItems="center"
                justifyContent="center"
                w="100%"
              >
                <Text
                  m={0}
                  fontWeight="bold"
                  fontSize="md"
                  // textTransform="uppercase"
                  fontFamily="body"
                >
                  {game.location}
                </Text>
                <Divider size="xl" orientation="vertical" />
                <Text
                  m={0}
                  fontWeight="light"
                  fontSize="xl"
                  textTransform="uppercase"
                  fontFamily="body"
                  as="b"
                  color={
                    game.winner?.id === undefined
                      ? "black"
                      : game.winner.name.includes("St. Louis Bombers")
                      ? "green"
                      : "red"
                  }
                >
                  {game.winner?.id === undefined
                    ? "T"
                    : game.winner.name.includes("St. Louis Bombers")
                    ? "W"
                    : "L"}
                </Text>
              </Stack>
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
