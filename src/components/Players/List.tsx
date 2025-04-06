import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Fade,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import { Player } from "../../types/playerTypes";
import PlayerCard from "./PlayerCard";

type ListProps = {
  players: Array<Player>;
  noClick?: boolean;
  title: string;
  collapsible?: boolean;
};

const List = ({ players, title, collapsible, noClick }: ListProps) => {
  return !players ? (
    <div>Nothing found here</div>
  ) : (
    <Accordion allowToggle={collapsible} defaultIndex={0}>
      <Box m={[0, 0, 0, 4, 8]} id="players-list">
        <AccordionItem>
          <AccordionButton>
            <Heading m={[8, 8]} mt={[2, 4]} flex={1} textAlign="left">
              {title}
            </Heading>
            {collapsible && <AccordionIcon />}
          </AccordionButton>
          <AccordionPanel>
            <SimpleGrid columns={[1, 4]} spacing={[0, 2]} m={[0]}>
              {players?.length ? (
                players?.map((player) => {
                  const { picture, division, position, first_name, last_name } =
                    player;

                  const background =
                    picture?.url || "/static/default/defaultpic.png";
                  const displayName = `${first_name} ${last_name}`;

                  return (
                    <PlayerCard
                      key={player.slug}
                      position={position}
                      size={picture?.size}
                      url={player.slug}
                      bg={background}
                      division={division}
                      displayName={displayName}
                      noClick={noClick}
                    />
                  );
                })
              ) : (
                <Heading as="h5">no players found</Heading>
              )}
            </SimpleGrid>
          </AccordionPanel>
        </AccordionItem>
      </Box>
    </Accordion>
  );
};

export default List;
