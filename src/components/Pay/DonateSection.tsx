import {
  Flex,
  Heading,
  Text,
  VStack,
  Box,
  Link,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { ReactElement } from "react-markdown/lib/react-markdown";

const DonateButton: React.FC<{
  link: string;
  leftIcon: ReactElement;
  textColor?: string;
  buttonText?: string;
  backgroundColor?: string;
}> = ({
  link,
  leftIcon,
  textColor,
  buttonText = "Donate",
  backgroundColor,
}) => {
  return (
    <Link href={link} isExternal w={{ base: "100%", md: "50%" }}>
      <Button
        w="full"
        variant="solid"
        size="lg"
        backgroundColor={backgroundColor}
        color={textColor}
        leftIcon={leftIcon}
      >
        {buttonText}
      </Button>
    </Link>
  );
};

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
          <DonateButton
            link="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5JQ4TPW3RQ9UA"
            leftIcon={
              <Image
                src="/icons/paypal_logo.png"
                alt="Paypal"
                width={100}
                height={24}
                style={{ paddingRight: 12 }}
              />
            }
          />
          <DonateButton
            link="https://account.venmo.com/u/stlbombersrfc"
            backgroundColor="#0074DE"
            textColor="brand.white"
            leftIcon={
              <Image
                src="/icons/venmo_logo.png"
                alt="Venmo"
                width={100}
                height={24}
                style={{ paddingRight: 12 }}
              />
            }
          />
        </Flex>
      </VStack>
    </Box>
  );
};

export default DonateSection;
