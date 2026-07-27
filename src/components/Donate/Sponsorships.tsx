import { Box, Flex, Image, Link, SimpleGrid, Text } from '@chakra-ui/react'
import SectionHeading from '../../common/SectionHeading'
import { useEffect, useState } from 'react'
import { FormattedSponsor, formatSponsors } from 'utils/formatSponsors'

interface SponsorCardProps {
  name: string
  logo?: string
  website?: string
}

const SponsorCard = ({ name, logo, website }: SponsorCardProps) => (
  <Link
    href={website || '#'}
    isExternal={!!website}
    _hover={{ textDecoration: 'none' }}
  >
    <Flex
      direction="column"
      bg="brand.mediumSecondary"
      borderRadius="4px"
      overflow="hidden"
      color="white"
      boxShadow="0 2px 10px rgba(0,0,0,0.1)"
      transition="transform 0.18s, box-shadow 0.18s"
      _hover={{
        transform: 'translateY(-3px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
      }}
      h="100%"
    >
      <Flex
        h="160px"
        bg="brand.darkSecondary"
        align="center"
        justify="center"
        p="24px"
        flex="1"
      >
        {logo ? (
          <Image
            src={logo}
            alt={`${name} logo`}
            maxH="120px"
            maxW="100%"
            objectFit="contain"
          />
        ) : (
          <Text
            fontFamily="display"
            fontWeight={700}
            fontSize="22px"
            letterSpacing="0.1em"
            textTransform="uppercase"
            textAlign="center"
            opacity={0.9}
          >
            {name}
          </Text>
        )}
      </Flex>
      <Flex
        px="22px"
        py="18px"
        borderTop="1px solid #3a3a3a"
        align="center"
        justify="space-between"
      >
        <Box
          fontFamily="display"
          fontWeight={600}
          fontSize="14px"
          letterSpacing="0.1em"
          textTransform="uppercase"
        >
          {name}
        </Box>
        {website && (
          <Box
            fontFamily="display"
            fontWeight={600}
            fontSize="11px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="brand.meta"
            borderBottom="1px solid #555"
            pb="1px"
            transition="color 0.15s, border-color 0.15s"
            sx={{
              'a:hover &': {
                color: 'brand.highlight',
                borderColor: 'brand.highlight',
              },
            }}
          >
            Visit →
          </Box>
        )}
      </Flex>
    </Flex>
  </Link>
)

const Sponsorships = ({ sponsors }) => {
  const [sponsorList, setSponsorList] = useState<FormattedSponsor[]>([])

  useEffect(() => {
    setSponsorList(formatSponsors(sponsors, false, false) as FormattedSponsor[])
  }, [sponsors])

  return (
    <Box maxW="1280px" mx="auto">
      {/* Header */}
      <Flex
        align="baseline"
        justify="space-between"
        flexWrap="wrap"
        gap={4}
        mb="40px"
      >
        <SectionHeading
          eyebrow="The companies that keep the ship afloat"
          heading="Our Sponsors"
        />
        <Link
          href="/contact"
          fontFamily="display"
          fontWeight={600}
          fontSize="13px"
          letterSpacing="0.25em"
          textTransform="uppercase"
          color="brand.dark"
          textDecoration="none"
          borderBottom="2px solid"
          borderColor="brand.highlight"
          pb="2px"
          _hover={{ textDecoration: 'none', color: 'brand.dark' }}
        >
          Become a Sponsor →
        </Link>
      </Flex>

      <SimpleGrid columns={{ base: 2, md: 3 }} gap="18px">
        {sponsorList?.map(({ id, logo, name, website }) => (
          <SponsorCard key={id} name={name} logo={logo} website={website} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Sponsorships
