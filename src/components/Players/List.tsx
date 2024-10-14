import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { Player } from "../../types/playerTypes";
import PlayerCard from "./PlayerCard";

type ListProps = {
  players: Array<Player>;
  noClick?: boolean;
  title: string;
};

const List = ({ players, title }: ListProps) => {
  return !players ? (
    <div>Nothing found here</div>
  ) : (
    <Box m={[0, 0, 0, 8, 16]} id="players-list">
      <Heading m={[8, 16]}>{title}</Heading>
      <SimpleGrid columns={[1, 4]} spacing={[0, 2]} m={[0]}>
        {players?.length ? (
          players?.map((player) => {
            const { picture, division, position, first_name, last_name } =
              player;

            const background = picture?.url || "/static/default/defaultpic.png";
            const displayName = `${first_name} ${last_name}`;

            return (
              <PlayerCard
                position={position}
                size={picture?.size}
                url={player.slug}
                bg={background}
                division={division}
                displayName={displayName}
              />
            );
          })
        ) : (
          <Heading as="h5">no players found</Heading>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default List;
