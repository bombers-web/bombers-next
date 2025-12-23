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
  const statusLabel = !winner?.id ? 'T' : bombersWon ? 'WIN' : 'LOSS'
  const statusInitial = !winner?.id ? 'T' : bombersWon ? 'W' : 'L'

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location?.address,
  )}`

  return (
    <Box w="full" bg="brand.medium" py={8} px={{ base: 4, md: 8 }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align="center"
        justify="space-between"
        width="100%"
        gap={{ base: 8, lg: 4 }}
      >
        {/* DATE & TIME */}
        <Flex
          align="center"
          gap={6}
          flex={{ lg: '1' }}
          justify={{ base: 'center', lg: 'start' }}
        >
          <VStack align={{ base: 'center', lg: 'start' }} spacing={0}>
            <Text
              color="brand.light"
              fontSize="sm"
              fontWeight="900"
              textTransform=""
              letterSpacing="3px"
            >
              {formattedDay}
            </Text>
            <Text
              color="brand.light"
              fontSize="4xl"
              fontWeight="900"
              lineHeight="0.9"
            >
              {formattedDate}
            </Text>
          </VStack>
          <Divider
            orientation="vertical"
            h="50px"
            borderColor="brand.light"
            opacity={0.2}
          />
          <VStack align={{ base: 'center', lg: 'start' }} spacing={0}>
            <Text
              color="brand.light"
              fontSize="2xl"
              fontWeight="800"
              lineHeight="1"
            >
              {formattedTime}
            </Text>
          </VStack>
        </Flex>

        {/* TEAMS */}
        <Flex
          flex={{ base: 'none', lg: '1.5' }}
          align="center"
          justify="center"
          gap={{ base: 6, md: 10 }}
        >
          <Team team={isBombers(homeTeam?.name) ? homeTeam : awayTeam} />
          <Center>
            <Text
              fontWeight="black"
              fontSize="md"
              color="gray.400"
              fontStyle="italic"
            >
              {isBombers(homeTeam?.name) ? 'VS' : '@'}
            </Text>
          </Center>
          <Team team={isBombers(homeTeam?.name) ? awayTeam : homeTeam} />
        </Flex>

        {/* RIGHT SIDE: LOCATION OR RESULT */}
        <Flex
          flex={{ lg: '1' }}
          justify={{ base: 'center', lg: 'end' }}
          minW="200px"
        >
          {showLocation ? (
            <Link
              href={mapUrl}
              isExternal
              _hover={{ textDecoration: 'none' }}
              group
            >
              <Flex align="center" gap={4}>
                <VStack align={{ base: 'center', lg: 'end' }} spacing={0}>
                  <Text
                    fontSize="2xl"
                    fontWeight="900"
                    color="brand.light"
                    textTransform="uppercase"
                  >
                    {location?.name}
                  </Text>
                </VStack>
                <Icon as={FiMapPin} color="brand.light" boxSize={7} />
              </Flex>
            </Link>
          ) : (
            /* BIG RESULT INDICATOR */
            <VStack align={{ base: 'center', lg: 'end' }} spacing={0}>
              <Text
                fontSize="2xl"
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
