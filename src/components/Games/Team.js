import { Box, Flex, Heading, Text, Avatar } from "@chakra-ui/react";

const Team = ({ team: { name, score, logo, ...teamData }, away, preview }) => {
  // const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   if (!loaded) setLoaded(true);
  // }, [loaded]);
  // const [isMobile] = useMediaQuery("(max-width: 800px)", {
  //   ssr: true,
  //   fallback: false, // return false on the server, and re-evaluate on the client side
  // });
  return (
    <>
      <Flex
        justifyContent="start"
        alignItems="center"
        direction="row"
        width="100%"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          direction="row"
        >
          <Box m={2}>
            <Avatar
              bg="brand.200"
              size={preview ? "sm" : "xl"}
              name={name}
              src={logo?.url}
            />
          </Box>
          <Flex flexGrow="1">
            <Heading
              fontWeight={name === "Bombers" ? "extrabold" : "normal"}
              my={0}
              mx={2}
              size={preview ? "lg" : "xl"}
              fontFamily="Big Shoulders Display"
              color={preview ? "white" : "inherit"}
            >
              {name}
            </Heading>
          </Flex>
        </Flex>

        <Box>
          <Text
            color={score ? "tomato" : "transparent"}
            fontWeight={"extrabold"}
            my={0}
            mx={2}
            fontSize="2xl"
            fontFamily="Big Shoulders Display"
            textTransform="capitalize"
            // bgColor={preview ? "#e2e2e2" : "none"}
            p={2}
          >
            {score || "00"}
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default Team;
