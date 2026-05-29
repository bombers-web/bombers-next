import { Box, Flex, Heading, Text, Link as ChakraLink } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { MatchType } from '../../types/matchTypes'

const MatchTeams = ({
  match,
}: {
  match: Pick<MatchType, 'home' | 'away' | 'division'>
}) => {
  const { home, away } = match
  const logoSize = { base: '60px', md: '90px' }

  return (
    <Box position="relative" w="full" pt={{ base: 8, md: 0 }}>
      {/* FULL SCHEDULE LINK */}
      <Box position="absolute" top={0} right={0}>
        <Link
          href={match?.division === 'd1' ? '/schedule' : '/schedule?tab=d2'}
          passHref
          legacyBehavior
        >
          <ChakraLink
            color="whiteAlpha.700"
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="tight"
            _hover={{ color: 'brand.highlight', textDecoration: 'none' }}
          >
            {`View ${match.division} Schedule →`}
          </ChakraLink>
        </Link>
      </Box>
      <Flex align="center" justify="center" w="full" gap={{ base: 4, md: 10 }}>
        {/* HOME TEAM */}
        <Flex direction="column" align="center" flex="1">
          <Box
            position="relative"
            w={logoSize}
            h={logoSize}
            filter="drop-shadow(0 0 10px rgba(0,0,0,0.3))"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <Image
              alt={home?.name}
              src={home?.logo?.formats?.small?.url || home?.logo?.url}
              style={{ objectFit: 'contain' }}
              fill
            />
          </Box>
          <Text
            color="white"
            fontWeight="bold"
            fontSize={{ base: 'xs', md: 'sm' }}
            mt={3}
            textTransform="uppercase"
            letterSpacing="wider"
            textAlign="center"
          >
            {home.name}
          </Text>
        </Flex>

        {/* VS DIVIDER */}
        <Heading
          size={{ base: 'xl', md: '2xl' }}
          color="whiteAlpha.400"
          fontStyle="italic"
          fontWeight="900"
          textTransform="uppercase"
          userSelect="none"
        >
          VS
        </Heading>

        {/* AWAY TEAM */}
        <Flex direction="column" align="center" flex="1">
          <Box
            position="relative"
            w={logoSize}
            h={logoSize}
            filter="drop-shadow(0 0 10px rgba(0,0,0,0.3))"
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          >
            <Image
              alt={away?.name}
              src={away?.logo?.formats?.small?.url || away?.logo?.url}
              style={{ objectFit: 'contain' }}
              fill
            />
          </Box>
          <Text
            color="white"
            fontWeight="bold"
            fontSize={{ base: 'xs', md: 'sm' }}
            mt={3}
            textTransform="uppercase"
            letterSpacing="wider"
            textAlign="center"
          >
            {away.name}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default MatchTeams
