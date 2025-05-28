import { Box, Flex, Heading, Stack, Divider, Text } from "@chakra-ui/react";
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

  const isBombers = (team) => team.includes("Bombers");
  const isHome = (homeTeam) => isBombers(homeTeam);

  return preview ? (
    <Box
      id="game-info-container"
      direction="row"
      bg={bgs[division.toUpperCase()]}
      width="100%"
      height="100%"
      m="0"
      justifyContent="space-around"
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
    <Stack direction="column" justifyContent="center" m={4}>
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
                {location}
              </Text>
              <Divider size="xl" orientation="vertical"></Divider>
              <Box>
                <Text
                  m={0}
                  fontWeight="bold"
                  fontSize="md"
                  // textTransform="uppercase"
                  fontFamily="body"
                >
                  {formatDateTime(date).date}
                </Text>
              </Box>
              <Divider size="xl" orientation="vertical"></Divider>
              <Text
                m={0}
                fontWeight="bold"
                fontSize="md"
                textTransform="uppercase"
                fontFamily="body"
              >
                {formatDateTime(date).time}
              </Text>
            </Stack>
          </Flex>
        </Stack>
      )}
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign={{ base: "center", md: "center" }}
        alignItems="center"
        justifyContent={{ base: "center", md: "center" }}
        w="100%"
        // spacing={{ base: 2, md: 4 }}
      >
        <Team team={isBombers(homeTeam?.name) ? homeTeam : awayTeam}></Team>
        <Text
          m={0}
          fontWeight="bold"
          fontSize="lg"
          textTransform="uppercase"
          fontFamily="body"
        >
          {isHome(homeTeam?.name) ? `-` : `@`}
        </Text>
        <Team team={isBombers(homeTeam?.name) ? awayTeam : homeTeam}></Team>
      </Stack>
    </Stack>
  );
};

export default GameInfo;
