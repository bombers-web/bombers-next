import { Stack } from "@chakra-ui/react";

const Games = ({ games = [] }) => {
  return (
    <Stack
      h="auto"
      w="99%"
      spacing={2}
      m={4}
      justifyContent="space-
      evenly"
      alignItems="center"
      id="game-container"
    ></Stack>
  );
};

export default Games;
