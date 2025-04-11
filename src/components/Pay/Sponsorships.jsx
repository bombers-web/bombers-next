import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";

const Sponsorships = ({ sponsors }) => {
  // Example sponsors data:
  const exampleSponsors = [
    {
      tierName: "Platinum Sponsors",
      sponsors: [
        {
          name: "Acme Corp",
          logo: "https://via.placeholder.com/150",
          website: "https://www.acmecorp.com",
        },
        {
          name: "Globex Industries",
          logo: "https://via.placeholder.com/150",
          website: "https://www.globex.com",
        },
        {
          name: "Initech",
          logo: "https://via.placeholder.com/150",
          website: "https://www.initech.com",
        },
      ],
    },
    {
      tierName: "Gold Sponsors",
      sponsors: [
        {
          name: "Paper Street Soap Co.",
          logo: "https://via.placeholder.com/150",
          website: "https://www.paperstreet.com",
        },
        {
          name: "Tyrell Corporation",
          logo: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      tierName: "Silver Sponsors",
      sponsors: [
        {
          name: "Wayne Enterprises",
          logo: "https://via.placeholder.com/150",
          website: "https://www.wayneenterprises.com",
        },
      ],
    },
  ];

  sponsors = exampleSponsors;

  // // Check if sponsors is defined and an array
  // if (!Array.isArray(sponsors)) {
  //   return (
  //     <Box
  //       p={4}
  //       bg="brand.light"
  //       borderRadius="md"
  //       boxShadow="md"
  //       maxWidth="1140px"
  //     >
  //       <VStack spacing={4} align="stretch">
  //         <Heading textAlign="center">Our Sponsors</Heading>
  //         <Text textAlign="center">No sponsor data available.</Text>
  //       </VStack>
  //     </Box>
  //   );
  // }

  return (
    <Box
      p={4}
      bg="brand.white"
      borderRadius="md"
      boxShadow="md"
      maxWidth="1140px"
    >
      <VStack spacing={8} align="stretch">
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
            Sponsorship Tiers
          </Heading>
          <Text textAlign="center">
            The companies that keep the ship afloat.
          </Text>
        </Flex>

        {sponsors.map((tier) => (
          <Box key={tier.tierName} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md" mb={4}>
              {tier.tierName}
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {tier.sponsors.map((sponsor) => (
                <Flex
                  key={sponsor.name}
                  direction="column"
                  align="center"
                  justify="center"
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                >
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} Logo`}
                    maxH="150px"
                    objectFit="contain"
                    mb={2}
                  />
                  <Text fontWeight="semibold">{sponsor.name}</Text>
                  {sponsor.website && (
                    <Text>
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                      </a>
                    </Text>
                  )}
                </Flex>
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sponsorships;
