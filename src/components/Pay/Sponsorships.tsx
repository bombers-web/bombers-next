import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SponsorTier, formatSponsors } from "utils/formatSponsors";

const Sponsorships = ({ sponsors }) => {
  const [tierSponsors, setTierSponsors] = useState<SponsorTier[]>();

  useEffect(() => {
    setTierSponsors(formatSponsors(sponsors, false));
  }, [sponsors]);

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
          bg="brand.white"
          color="brand.meta"
          p={4}
          borderRadius="md"
        >
          <Heading size="lg" mb={2} textAlign="center">
            Sponsorship Tiers
          </Heading>
          <Text textAlign="center" mt={0}>
            The companies that keep the ship afloat:
          </Text>
        </Flex>

        {tierSponsors?.map(
          ({ tierName, tierDescription, sponsors: formattedSponsors }) => (
            <Box key={tierName} borderWidth="1px" borderRadius="lg" p={4}>
              <Heading size="md" mb={4}>
                {tierName}
              </Heading>
              {tierDescription && (
                <Text textAlign="center" mt={0}>
                  {tierDescription}
                </Text>
              )}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                {formattedSponsors.map(({ id, logo, name, website }) => (
                  <Flex
                    key={id}
                    direction="column"
                    align="center"
                    justify="center"
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                  >
                    <Image
                      src={logo}
                      alt={`${name} Logo`}
                      maxH="150px"
                      objectFit="contain"
                      mb={2}
                    />
                    <Text fontWeight="semibold">{name}</Text>
                    {website && (
                      <Text>
                        <a
                          href={website}
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
          )
        )}
      </VStack>
    </Box>
  );
};

export default Sponsorships;
