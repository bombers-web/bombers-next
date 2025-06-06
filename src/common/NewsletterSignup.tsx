import React from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const NewsletterSignup: React.FC = () => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="space-between"
      p={8}
      bg="brand.meta"
      color="white"
      borderRadius="lg"
      wrap="wrap"
      maxW="container.lg"
      mx="auto"
    >
      <Box flexShrink={0} mb={{ base: 4, md: 0 }} mr={{ md: 6 }}>
        {" "}
        {/* Adds margin to the right on medium screens and up */}
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
          Sign up for our newsletter
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} mt={2}>
          Get the latest news and updates from the St. Louis Bombers.
        </Text>
      </Box>

      <form
        action="https://stlouisbombers.us22.list-manage.com/subscribe/post?u=d3de19555e475384fba3810d5&amp;id=5ddc6f8c2e&amp;f_id=00fde3e1f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        target="_blank"
        style={{ flexGrow: 1, maxWidth: "400px" }}
      >
        <FormControl id="email" isRequired>
          <FormLabel srOnly>Email Address</FormLabel>{" "}
          {/* srOnly hides label visually but keeps it for screen readers */}
          <Input
            type="email"
            name="EMAIL"
            placeholder="* Enter your email address"
            bg="white"
            color="gray.800"
            _placeholder={{ color: "gray.500" }}
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            size="lg"
            mb={3}
          />
        </FormControl>
        <FormControl id="fname">
          <FormLabel srOnly>First Name</FormLabel>
          {""}
          <Input
            type="text"
            name="FNAME"
            placeholder="First Name"
            bg="white"
            color="gray.800"
            _placeholder={{ color: "gray.500" }}
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            size="lg"
            mb={3}
          />
        </FormControl>

        <FormControl id="lname">
          <FormLabel srOnly>Last Name</FormLabel>
          {""}
          <Input
            type="text"
            name="LNAME"
            placeholder="Last Name"
            bg="white"
            color="gray.800"
            _placeholder={{ color: "gray.500" }}
            borderColor="gray.300"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            size="lg"
            mb={3} // Margin bottom
          />
        </FormControl>

        {/* This is a Mailchimp hidden input for bot prevention, usually fine as is */}
        <div
          style={{ position: "absolute", left: "-5000px" }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="b_d3de19555e475384fba3810d5_5ddc6f8c2e"
            tabIndex={-1}
            value=""
            readOnly
          />
        </div>

        <Button
          type="submit"
          name="subscribe"
          id="mc-embedded-subscribe"
          colorScheme="blue"
          size="lg"
          width="full"
          _hover={{ opacity: 0.9 }}
        >
          Subscribe
        </Button>
      </form>
    </Flex>
  );
};

export default NewsletterSignup;
