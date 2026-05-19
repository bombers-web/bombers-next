import {
  Box,
  Button,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

export const GetInvolved = () => {
  return (
    <Box
      py={10}
      px={6}
      bg="brand.mediumSecondary"
      borderRadius="2xl"
      my={6}
      boxShadow="xl"
    >
      <Heading size="lg" color="white" mb={8} textTransform="uppercase">
        Get Involved
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <VStack
          spacing={4}
          align="center"
          p={6}
          border="1px solid"
          borderColor="brand.mediumSecondary"
          borderRadius="lg"
        >
          <Text fontSize="xl" fontWeight="bold" color="brand.light">
            Join the Squad
          </Text>
          <Text color="gray.300" fontSize="sm">
            Looking to take the pitch with the Bombers? We are always recruiting
            new talent.
          </Text>
          <Link href="/contact" w="100%">
            <Button colorScheme="yellow" variant="outline" w="100%">
              Contact Us!
            </Button>
          </Link>
        </VStack>
        <VStack
          spacing={4}
          align="center"
          p={6}
          border="1px solid"
          borderColor="brand.mediumSecondary"
          borderRadius="lg"
        >
          <Text fontSize="xl" fontWeight="bold" color="brand.light">
            Support the Club
          </Text>
          <Text color="gray.300" fontSize="sm">
            Help us grow the game in St. Louis through donations and corporate
            sponsorships.
          </Text>
          <Link href="/pay?tab=donations" w="100%">
            <Button colorScheme="yellow" variant="outline" w="100%">
              Donate & Sponsor
            </Button>
          </Link>
        </VStack>
      </SimpleGrid>
    </Box>
  )
}
