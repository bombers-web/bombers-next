// import {
//   Flex,
//   Input,
//   InputGroup,
//   InputLeftAddon,
//   Radio,
//   RadioGroup,
//   SimpleGrid,
// } from "@chakra-ui/react";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// import { useEffect, useState } from "react";

// const DonateButton = ({ onApprove }) => {
//   return (
//     <>
//       <form
//         action="https://www.paypal.com/donate"
//         method="post"
//         target="_blank"
//       >
//         <input type="hidden" name="hosted_button_id" value="5JQ4TPW3RQ9UA" />
//         <input
//           type="image"
//           src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
//           border="0"
//           name="submit"
//           title="PayPal - The safer, easier way to pay online!"
//           alt="Donate with PayPal button"
//         />
//         <img
//           alt=""
//           border="0"
//           src="https://www.paypal.com/en_US/i/scr/pixel.gif"
//           width="1"
//           height="1"
//         />
//       </form>
//     </>
//   );
// };

// export default DonateButton;
import {
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
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
