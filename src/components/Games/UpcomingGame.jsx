import { Box, Flex, Icon, Link, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { FiMapPin } from 'react-icons/fi'

const UpcomingGame = ({ homeTeam, awayTeam, date, location }) => {
  const d = new Date(date)

  const dateLabel = d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  })
  const formattedTime = d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const isBombersHome = homeTeam?.name?.includes('Bombers')
  const bombers = isBombersHome ? homeTeam : awayTeam
  const opponent = isBombersHome ? awayTeam : homeTeam
  const vsLabel = isBombersHome ? 'VS' : '@'
  const borderColor = isBombersHome ? 'green.500' : 'blue.400'

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location?.address || '',
  )}`

  const logoSize = { base: '50px', md: '70px' }

  return (
    <Box
      w="full"
      bg="brand.medium"
      borderRadius="lg"
      overflow="hidden"
      border="1px solid"
      borderColor="whiteAlpha.100"
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: 'scale(1.01)',
        boxShadow: '0 10px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header: HOME/AWAY label (left) + date (right) */}
      <Flex
        px={{ base: 4, md: 6 }}
        pt={4}
        pb={2}
        justify="space-between"
        align="baseline"
      >
        <Text
          color="brand.light"
          fontSize="xs"
          fontWeight="black"
          letterSpacing="widest"
          textTransform="uppercase"
          border="1px solid"
          borderColor={borderColor}
          borderRadius="full"
          px={2}
          py={0.5}
        >
          {isBombersHome ? 'HOME' : 'AWAY'}
        </Text>
        <Text
          color="brand.light"
          opacity={0.5}
          fontSize="md"
          fontWeight="600"
          letterSpacing="wider"
          textTransform="uppercase"
        >
          {dateLabel}
        </Text>
      </Flex>

      {/* Teams row */}
      <Flex
        align="center"
        justify="center"
        gap={{ base: 3, md: 8 }}
        px={{ base: 4, md: 8 }}
        py={{ base: 4, md: 6 }}
        w="full"
      >
        {/* Bombers */}
        <Flex direction="column" align="center" flex="1">
          <Box
            position="relative"
            w={logoSize}
            h={logoSize}
            filter="drop-shadow(0 0 8px rgba(0,0,0,0.4))"
          >
            {bombers?.logo?.url && (
              <Image
                alt={bombers.name}
                src={bombers.logo?.formats?.small?.url || bombers.logo?.url}
                style={{ objectFit: 'contain' }}
                fill
              />
            )}
          </Box>
          <Text
            color="brand.light"
            fontWeight="bold"
            fontSize="sm"
            mt={2}
            textTransform="uppercase"
            letterSpacing="wider"
            textAlign="center"
          >
            {bombers?.name}
          </Text>
        </Flex>

        {/* VS or @ */}
        <Text
          fontWeight="black"
          fontSize={{ base: 'xl', md: '2xl' }}
          color="whiteAlpha.300"
          fontStyle="italic"
          userSelect="none"
          minW={{ base: '32px', md: '48px' }}
          textAlign="center"
        >
          {vsLabel}
        </Text>

        {/* Opponent */}
        <Flex direction="column" align="center" flex="1">
          <Box
            position="relative"
            w={logoSize}
            h={logoSize}
            filter="drop-shadow(0 0 8px rgba(0,0,0,0.4))"
          >
            {opponent?.logo?.url && (
              <Image
                alt={opponent.name}
                src={opponent.logo?.formats?.small?.url || opponent.logo?.url}
                style={{ objectFit: 'contain' }}
                fill
              />
            )}
          </Box>
          <Text
            color="brand.light"
            fontWeight="bold"
            fontSize="sm"
            mt={2}
            textTransform="uppercase"
            letterSpacing="wider"
            textAlign="center"
          >
            {opponent?.name}
          </Text>
        </Flex>
      </Flex>

      {/* Footer: time + location */}
      <VStack spacing={0} pb={3} align="center">
        <Text
          color="brand.light"
          opacity={0.6}
          fontSize="lg"
          fontWeight="600"
          letterSpacing="wider"
          textTransform="uppercase"
        >
          {formattedTime}
        </Text>
        {location && (
          <Link
            href={mapUrl}
            isExternal
            color="brand.highlight"
            fontWeight="semibold"
            _hover={{ color: 'yellow.200', textDecoration: 'none' }}
          >
            <Flex align="center" gap={2}>
              <Icon as={FiMapPin} />
              <Text fontSize="md" fontWeight="semibold">
                {location?.name}
              </Text>
            </Flex>
          </Link>
        )}
        {location?.city && (
          <Text
            color="brand.light"
            opacity={0.4}
            fontSize="md"
            fontWeight="600"
            letterSpacing="widest"
            textTransform="uppercase"
          >
            {location.city}
          </Text>
        )}
      </VStack>
    </Box>
  )
}

export default UpcomingGame
