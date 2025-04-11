import {
  Flex,
  Heading,
  Text,
  VStack,
  Box,
  Link,
  Button,
} from "@chakra-ui/react";

const DonateButton = () => {
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
          mb={4}
          bg="brand.meta"
          color="white"
          p={4}
          borderRadius="md"
        >
          <Heading size="lg" mb={2} textAlign="center">
            Support Our Club!
          </Heading>
          <Text textAlign="center">
            Your generous donations help us thrive.
          </Text>
        </Flex>
        <Flex align="center">
          <Link
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5JQ4TPW3RQ9UA"
            isExternal
            w="50%"
          >
            <Button w="full" variant="solid">
              Donate!
            </Button>
          </Link>
        </Flex>
      </VStack>
    </Box>
  );
};

export default DonateButton;
