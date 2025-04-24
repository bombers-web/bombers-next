import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Card from "common/Card";
import React from "react";
import { getPosition } from "./utils";

const PlayerCard = ({
  size,
  url,
  bg,
  division,
  position,
  displayName,
  noClick,
}) => {
  return (
    <Card
      key={displayName}
      radius="8px"
      id="team-card"
      as={`/team/${division}/${url}`}
      link={noClick ? null : "/team/[division]/[slug]"}
      height={["25vh", "40vh", "45vh", "50vh"]}
      styles={{
        maxWidth: "300px",
        display: "flex",
        justifyContent: "space-around",
        cursor: "pointer",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: size > 3000 ? "cover" : "contain",
        backgroundColor: "gray",
      }}
      bg={bg}
      border="1px solid #e2e2e2"
    >
      <Box
        style={{
          background: `linear-gradient(
185deg,rgba(0,0,0,0) 20%,rgba(0,0,0,.9) 80%)`,
          height: "70%",
          zIndex: 98,
          width: "100%",
          position: "absolute",
          overflow: "hidden",
          bottom: 0,
          verticalAlign: "baseline",
          display: "flex",
        }}
      >
        <Flex
          id="text-content"
          pl={[2, 2, 3, 4]}
          pb={[2, 2, 3, 4]}
          direction="column"
          w="100%"
          position="absolute"
          bottom={0}
          left={0}
          maxHeight={"80%"}
        >
          <Heading
            m={0}
            color="brand.white"
            fontWeight="bold"
            textTransform="uppercase"
            fontSize={[16, 14, 24, 34]}
          >
            {displayName}
          </Heading>
          <Text
            color="brand.meta"
            textTransform="capitalize"
            fontWeight="300"
            mt={0}
            mb={[3, 0, 2, 3]}
            fontSize={[12, 12, 18, 24]}
          >
            {getPosition(position)}
          </Text>
        </Flex>
      </Box>
    </Card>
  );
};

export default PlayerCard;
