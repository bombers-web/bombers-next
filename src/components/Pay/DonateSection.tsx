import {
  Flex,
  Heading,
  Text,
  VStack,
  Box,
  Link,
  Button,
} from "@chakra-ui/react";

const DonateSection = () => {
  return (
    <Box
      p={4}
      bg="brand.white"
      borderRadius="md"
      boxShadow="md"
      maxWidth="1140px"
    >
      <VStack spacing={4} align="stretch">
        <Flex
          direction="column"
          align="center"
          justify="center"
          bg="brand.white"
          color="brand.meta"
          borderRadius="md"
        >
          <Heading size="lg" mb={2} textAlign="center">
            Support Our Club!
          </Heading>
          <Text textAlign="center" mt={0}>
            Your generous donations help us thrive
          </Text>
        </Flex>
        <Flex
          align="center"
          mb={8}
          justifyContent="center"
          flexDirection={"column"}
          gap={8}
        >
          <Link
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5JQ4TPW3RQ9UA"
            isExternal
            w="50%"
          >
            <Button w="full" variant="solid" size="lg">
              Donate through PayPal
            </Button>
          </Link>
          <Link
            href="https://account.venmo.com/u/stlbombersrfc"
            isExternal
            w="50%"
          >
            <Button
              w="full"
              variant="solid"
              size="lg"
              backgroundColor="#0074DE"
              color="brand.white"
            >
              Donate through Venmo
            </Button>
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
};

export default DonateSection;
