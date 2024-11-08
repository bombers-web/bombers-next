import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Team from "./Team";

const GameInfo = ({
  homeTeam,
  awayTeam,
  date,
  location,
  preview,
  division,
  finished,
  slug,
}) => {
  const formatDateTime = (dateTime, format = "") => {
    const date = new Date(dateTime);
    const formats = {
      short: date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
      }),
    };
    const formattedDate =
      date.toLocaleDateString("en-US", { weekday: "short" }) +
      " " +
      date.toLocaleDateString("en-US", { month: "short" }) +
      " " +
      date.toLocaleDateString("en-US", { day: "2-digit" });

    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      date: format === "" ? formattedDate : formats[format],
      time,
    };
  };

  const bgs = {
    DII: "brand.medium",
    D2: "brand.medium",
    D1: "brand.black",
    DI: "brand.black",
  };

  return preview ? (
    <Box
      id="game-info-container"
      direction="row"
      bg={bgs[division.toUpperCase()]}
      width="100%"
      height="100%"
      m="0"
      // justifyContent="space-around"
      alignItems="center"
    >
      <Flex direction="column" m="0" py="4" minH="100%">
        <Flex alignItems="center" justifyContent="start">
          <Stack
            w="100%"
            direction="horizontal"
            spacing="5"
            justifyContent="space-between"
            mb="8"
            p="4"
            shadow="md"
          >
            <Heading as="div" size="lg" color="brand.light">
              {division}
            </Heading>
            <Heading
              as="div"
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              size="sm"
              color="brand.light"
            >
              <Box>{formatDateTime(date).date}</Box>
              <Box>{formatDateTime(date).time}</Box>
            </Heading>
          </Stack>
        </Flex>
        <Team team={homeTeam} preview></Team>
        <Team team={awayTeam} preview></Team>
      </Flex>
    </Box>
  ) : (
    <Stack direction="column" justifyContent="center" pt={4}>
      {!homeTeam.score && (
        <Stack
          borderRadius="8px"
          p="2"
          fontSize="xs"
          alignContent="center"
          justifyContent="center"
          textAlign="center"
        >
          <Flex w="100%" justifyContent="center">
            <Box p="2" fontSize="xs">
              {location}
            </Box>
          </Flex>
        </Stack>
      )}
      <Team team={homeTeam}></Team>

      <Team team={awayTeam} away></Team>
    </Stack>
  );
};

export default GameInfo;
