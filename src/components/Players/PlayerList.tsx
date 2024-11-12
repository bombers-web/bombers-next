/* eslint-disable no-unused-vars */
import { Flex, Stack } from "@chakra-ui/react";
import { useCallback } from "react";
import List from "./List";
import { splitForwardsAndBacks } from "./utils";

const PlayerList = ({ list = [], type }) => {
  const sortByPosition = useCallback(
    (playerList = []) => {
      return playerList?.sort((a, b) => {
        const sortBy = type === "coaches-and-staff" ? "id" : "position";
        return a[sortBy] - b[sortBy];
      });
    },
    [type]
  );

  const players = sortByPosition(list);

  const { forwards, backs } = splitForwardsAndBacks(players);

  return (
    <Flex direction="column" gap="8" bg="brand.white">
      <Stack direction="column" spacing="16" m="8">
        {type === "coaches-and-staff" ? (
          <List players={players} title="Coaches and Staff" noClick />
        ) : (
          <>
            <List players={forwards} title="Forwards" />
            <List players={backs} title="Backs" />
          </>
        )}
      </Stack>
    </Flex>
  );
};

export default PlayerList;
