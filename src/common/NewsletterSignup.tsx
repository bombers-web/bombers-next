import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'

const NewsletterSignup = () => {
  return (
    <Box
      py={10}
      px={6}
      bg="whiteAlpha.50"
      borderRadius="2xl"
      my={6}
      border="1px solid"
      borderColor="whiteAlpha.300"
      boxShadow="xl" // Added depth
    >
      <Heading
        size="lg"
        color="white"
        mb={8}
        textTransform="uppercase"
        textAlign={{ base: 'center', lg: 'center' }} // Center title on mobile
      >
        Newsletter
      </Heading>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'center', lg: 'start' }} // Center items horizontally on mobile
        justify="space-between"
        gap={8}
      >
        <Box
          flex="1"
          textAlign={{ base: 'center', lg: 'left' }} // Center text on mobile
          display="flex"
          flexDirection="column"
          alignItems={{ base: 'center', lg: 'flex-start' }} // Center text block on mobile
        >
          <Text fontSize="xl" fontWeight="bold" color="brand.light">
            Stay in the Loop
          </Text>
          <Text color="gray.300" fontSize="sm" mt={2} maxW="400px">
            Get the latest news, match results, and community updates delivered
            straight from the St. Louis Bombers pitch to your inbox.
          </Text>
        </Box>

        <form
          action="https://stlouisbombers.us22.list-manage.com/subscribe/post?u=d3de19555e475384fba3810d5&amp;id=5ddc6f8c2e&amp;f_id=00fde3e1f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <VStack spacing={3} w="100%">
            <Flex gap={3} w="100%" direction={{ base: 'column', md: 'row' }}>
              <FormControl id="fname">
                <FormLabel srOnly>First Name</FormLabel>
                <Input
                  type="text"
                  name="FNAME"
                  placeholder="First Name"
                  bg="transparent"
                  color="white"
                  borderColor="whiteAlpha.400"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'whiteAlpha.600' }}
                  _focus={{
                    borderColor: 'yellow.400',
                    boxShadow: '0 0 0 1px yellow.400',
                  }}
                />
              </FormControl>
              <FormControl id="lname">
                <FormLabel srOnly>Last Name</FormLabel>
                <Input
                  type="text"
                  name="LNAME"
                  placeholder="Last Name"
                  bg="transparent"
                  color="white"
                  borderColor="whiteAlpha.400"
                  _placeholder={{ color: 'gray.500' }}
                  _hover={{ borderColor: 'whiteAlpha.600' }}
                  _focus={{
                    borderColor: 'yellow.400',
                    boxShadow: '0 0 0 1px yellow.400',
                  }}
                />
              </FormControl>
            </Flex>

            <FormControl id="email" isRequired>
              <FormLabel srOnly>Email Address</FormLabel>
              <Input
                type="email"
                name="EMAIL"
                placeholder="Email Address *"
                bg="transparent"
                color="white"
                borderColor="whiteAlpha.400"
                _placeholder={{ color: 'gray.500' }}
                _hover={{ borderColor: 'whiteAlpha.600' }}
                _focus={{
                  borderColor: 'yellow.400',
                  boxShadow: '0 0 0 1px yellow.400',
                }}
              />
            </FormControl>

            {/* Mailchimp HoneyPot */}
            <div
              style={{ position: 'absolute', left: '-5000px' }}
              aria-hidden="true"
            >
              <input
                type="text"
                name="b_d3de19555e475384fba3810d5_5ddc6f8c2e"
                tabIndex={-1}
                defaultValue=""
                readOnly
              />
            </div>

            <Button
              type="submit"
              name="subscribe"
              colorScheme="yellow"
              variant="outline"
              w="100%"
              h="45px"
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="bold"
            >
              Subscribe Now
            </Button>
          </VStack>
        </form>
      </Flex>
    </Box>
  )
}

export default NewsletterSignup
