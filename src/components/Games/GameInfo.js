import {
  Box,
  Center,
  Divider,
  Flex,
  Icon,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiMapPin } from 'react-icons/fi'
import Team from './Team'

const GameInfo = ({
  homeTeam,
  awayTeam,
  date,
  location,
  division,
  winner,
  showLocation = true,
  cancelled = false,
}) => {
  const d = new Date(date)
  const formattedDay = d.toLocaleDateString('en-US', { weekday: 'short' })
  const formattedDate = d.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  })
  const formattedTime = d.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const isBombers = (name) => name?.includes('Bombers')
  const bombersWon = winner?.name?.includes('St. Louis Bombers')

  // Logic for the Result Badge
  const statusColor = !winner?.id
    ? 'gray.400'
    : bombersWon
    ? 'green.500'
    : 'red.500'
  const statusLabel = !winner?.id ? 'TIE' : bombersWon ? 'WIN' : 'LOSS'

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location?.address,
  )}`

  return (
    <Box
      w="full"
      bg="brand.meta"
      py={{ base: 6, md: 8 }}
      px={{ base: 4, md: 8 }}
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        width="100%"
        gap={{ base: 6, md: 8 }}
      >
        {/* DATE & TIME - Mobile Centered */}
        <Flex align="center" justify="center" gap={{ base: 4, md: 6 }} w="full">
          <VStack align="center" spacing={0}>
            <Text
              color="brand.light"
              fontSize={{ base: 'xs', md: 'sm' }}
              fontWeight="900"
              letterSpacing="3px"
            >
              {formattedDay}
            </Text>
            <Text
              color="brand.light"
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="900"
              lineHeight="0.9"
            >
              {formattedDate}
            </Text>
          </VStack>
          <Divider
            orientation="vertical"
            h={{ base: '40px', md: '50px' }}
            borderColor="brand.light"
            opacity={0.2}
          />
          <VStack align="center" spacing={0}>
            <Text
              color="brand.light"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="800"
              lineHeight="1"
            >
              {formattedTime}
            </Text>
          </VStack>
        </Flex>

        {/* TEAMS - Stacked on mobile, side by side on desktop */}
        <Flex
          align="center"
          justify="center"
          gap={{ base: 4, md: 10 }}
          w="full"
          flexWrap="wrap"
        >
          <Team team={isBombers(homeTeam?.name) ? homeTeam : awayTeam} />
          <Center>
            <Text
              fontWeight="black"
              fontSize={{ base: 'sm', md: 'md' }}
              color="gray.400"
              fontStyle="italic"
            >
              {isBombers(homeTeam?.name) ? 'VS' : '@'}
            </Text>
          </Center>
          <Team team={isBombers(homeTeam?.name) ? awayTeam : homeTeam} />
        </Flex>

        {/* LOCATION OR RESULT - Centered on mobile */}
        <Flex justify="center" w="full">
          {cancelled ? (
            <VStack align="center" spacing={0}>
              <Text
                fontSize={{ base: '2xl', md: '3xl' }}
                fontWeight="black"
                color="red.600"
                letterSpacing="4px"
                opacity={0.9}
              >
                CANCELLED
              </Text>
            </VStack>
          ) : showLocation ? (
            <Link href={mapUrl} isExternal _hover={{ textDecoration: 'none' }}>
              <Flex align="center" gap={{ base: 2, md: 4 }}>
                <Icon
                  as={FiMapPin}
                  color="brand.light"
                  boxSize={{ base: 5, md: 7 }}
                />
                <VStack align="center" spacing={0}>
                  <Text
                    fontSize={{ base: 'lg', md: '2xl' }}
                    fontWeight="900"
                    color="brand.light"
                    textTransform="uppercase"
                    textAlign="center"
                  >
                    {location?.name}
                  </Text>
                </VStack>
              </Flex>
            </Link>
          ) : (
            /* BIG RESULT INDICATOR */
            <VStack align="center" spacing={0}>
              <Text
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="black"
                color={statusColor}
                letterSpacing="4px"
                opacity={0.8}
              >
                {statusLabel}
              </Text>
            </VStack>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default GameInfo
