import { Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { formatDate } from "../../../utils/formatDate.js";
import { getFlag, getNationality, getPosition } from "./utils";

const PlayerInfo = ({ player }) => {
  const data = [
    {
      label: "Date of Birth",
      value: player?.date_of_birth
        ? formatDate(player?.date_of_birth, "long")
        : "?",
    },
    {
      label: "Age",
      value: player?.date_of_birth
        ? formatDate(player?.date_of_birth, "age")
        : "?",
    },
    {
      label: "Height",
      value: player?.height || "?",
    },
    {
      label: "Weight",
      value: player?.weight ? `${player?.weight} lbs.` : "?",
    },

    {
      label: "Hometown",
      value: player?.hometown || "?",
    },
    {
      label: "Nationality",
      value: getNationality(player?.nationality) || "United States",
    },
    {
      label: "Position(s)",
      value: getPosition(player?.position || 2),
    },
  ];
  return (
    <>
      <SimpleGrid columns={[2, 1, 2]} pl={8} pt={[8, 16]} pr={[0, 36]} pb={[0, 36]}>
        {data?.map(({ label, value }) => {
          return (
            <Stack
              alignItems="flex-start"
              display="flex"
              spacing="3"
              direction="column"
              marginRight="5"
              marginLeft="5"
            >
              <Heading color="brand.medium" size="xs" as="div" minW="80px">
                {label}:
              </Heading>
              <Heading
                color="brand.meta"
                size="lg"
                textTransform="capitalize"
                fontWeight="hairline"
                mt={0}
              >
                {value} {getFlag(value)}
              </Heading>
            </Stack>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default PlayerInfo;
