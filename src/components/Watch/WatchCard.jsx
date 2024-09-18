import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Card from "common/Card";
import React from "react";

const WatchCard = ({ name, href }) => {
  return (
    <Card
      key={name}
      radius="8px"
      id="board-card"
      styles={{
        minHeight: "370px",
        height: "auto",
        maxWidth: "300px",
        display: "flex",
        justifyContent: "space-around",
        cursor: "pointer",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "gray",
      }}
      bg="/static/logos/white_logo.png"
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
          p="0 0 16px 20px"
          direction="column"
          w="100%"
          alignSelf="flex-end"
        >
          <Link color="brand.highlight" href={href} isExternal>
            <Heading
              m={1}
              color="brand.white"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {name}
            </Heading>
          </Link>
        </Flex>
      </Box>
    </Card>
  );
};

export default WatchCard;
