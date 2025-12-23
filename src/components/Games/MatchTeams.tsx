import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { MatchType } from 'src/types/matchTypes'

const MatchTeams = ({ match }: { match: MatchType }) => {
  const { home, away } = match

  // Common styles for the team logos
  const logoSize = { base: '60px', md: '90px' }

  return (
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
            style={{ objectFit: 'contain' }} // Contain is usually better for logos
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
  )
}

export default MatchTeams
