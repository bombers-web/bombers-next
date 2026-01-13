import { EmailIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  FormattedSponsor,
  SponsorTier,
  formatSponsors,
} from 'utils/formatSponsors'

interface SponsorGridProps {
  sponsors: FormattedSponsor[]
}

const SponsorGrid = ({ sponsors }: SponsorGridProps) => {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing={4}>
      {sponsors?.map(({ id, logo, name, website }) => (
        <Flex
          key={id}
          direction="column"
          align="center"
          justify="flex-end"
          borderWidth="1px"
          borderRadius="md"
          p={4}
          bg="gradient.regular"
        >
          <Image
            src={logo}
            alt={`${name} Logo`}
            maxH="150px"
            objectFit="contain"
            width="80%"
            p={4}
            mb={2}
          />
          <Text fontWeight="semibold" color="white">
            {name}
          </Text>
          {website && (
            <Text color="white">
              <Link
                href={website}
                isExternal
                _hover={{ color: 'brand.highlight', textDecoration: 'none' }}
                transition="color 0.2s"
              >
                Visit Website
              </Link>
            </Text>
          )}
        </Flex>
      ))}
    </SimpleGrid>
  )
}

const Sponsorships = ({ sponsors }) => {
  const [sponsorList, setSponsorList] = useState<
    SponsorTier[] | FormattedSponsor[]
  >()
  // "Feature flags" - change them as needed
  const useTiers = false
  const returnEmptyTiers = useTiers && true

  useEffect(() => {
    setSponsorList(formatSponsors(sponsors, useTiers, returnEmptyTiers))
  }, [sponsors])

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
            {useTiers ? 'Sponsorship Tiers' : 'Sponsors'}
          </Heading>
          <Text textAlign="center" mt={0}>
            For inquries into sponsoring the St. Louis Bombers, contact:
            <Box pt={3} w="100%">
              <Link
                href={`mailto:president@stlouisbombers.com`}
                fontSize="sm"
                color="gray.500"
                display="flex"
                alignItems="center"
                _hover={{ color: 'brand.highlight', textDecoration: 'none' }}
              >
                <EmailIcon mr={2} />
                <Text noOfLines={1}>president@stlouisbombers.com</Text>
              </Link>
            </Box>
          </Text>
          <Text textAlign="center" mt={0}>
            The companies that keep the ship afloat:
          </Text>
        </Flex>

        {useTiers ? (
          (sponsorList as SponsorTier[])?.map(
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
                <SponsorGrid sponsors={formattedSponsors} />
              </Box>
            ),
          )
        ) : (
          <SponsorGrid sponsors={sponsorList as FormattedSponsor[]} />
        )}
      </VStack>
    </Box>
  )
}

export default Sponsorships
