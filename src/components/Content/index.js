import {
  Box,
  Link as ChakraLink,
  Divider,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import ContentCard from "./ContentCard";

const Contents = ({ contents }) => {
  return (
    <Box flexDirection="column" w="100%">
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
        w="100%"
        p="8"
      >
        <Link href="/contents" passHref legacyBehavior>
          <ChakraLink>
            <Text fontFamily="Helvetica Neue">See All</Text>
          </ChakraLink>
        </Link>
      </Stack>
      <Stack
        spacing="8"
        w="99%"
        justifyContent="space-evenly"
        alignContent="space-around"
        flexWrap="wrap"
        direction="column"
      >
        {contents.map((content, i) => {
          return (
            <>
              <ContentCard
                styles={{ maxHeight: 500 }}
                content={content}
                key={`content__left__${content?.slug}`}
              />
              <Divider />
            </>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Contents;
