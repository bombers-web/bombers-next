import { CalendarIcon, InfoIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { format } from 'date-fns'

const EventCard = ({ event }) => {
  // Parsing the Strapi date string
  const eventDate = new Date(event?.date)
  const month = format(eventDate, 'MMM')
  const day = format(eventDate, 'dd')
  const fullDate = format(eventDate, 'PPPP') // e.g., Saturday, December 20th, 2025
  const time = format(eventDate, 'p') // e.g., 2:30 PM

  return (
    <Box
      role="group"
      w="full"
      bg="white"
      boxShadow="sm"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s ease"
      border="1px solid"
      borderColor="gray.100"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
        borderColor: 'brand.highlight',
      }}
    >
      <Flex direction={{ base: 'column', md: 'row' }}>
        {/* LEFT SIDE: DATE BADGE */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          bg="gray.50"
          w={{ base: '100%', md: '120px' }}
          py={6}
          borderRight={{ md: '1px solid' }}
          borderColor="gray.100"
          _groupHover={{ bg: 'brand.medium', color: 'white' }}
          transition="all 0.3s"
        >
          <Text
            fontSize="xs"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="widest"
          >
            {month}
          </Text>
          <Text fontSize="4xl" fontWeight="900" lineHeight="1">
            {day}
          </Text>
        </Flex>

        {/* RIGHT SIDE: CONTENT */}
        <VStack p={6} spacing={2} align="start" flex="1">
          <HStack w="100%" justify="space-between">
            <Badge
              colorScheme={event?.active ? 'green' : 'gray'}
              variant="subtle"
            >
              {event?.active ? 'Upcoming' : 'Past'}
            </Badge>
            <HStack color="gray.400" spacing={1}>
              <CalendarIcon w={3} h={3} />
              <Text fontSize="xs" fontWeight="bold">
                {time}
              </Text>
            </HStack>
          </HStack>

          <Heading as="h3" fontSize="xl" color="gray.800">
            {event?.name}
          </Heading>

          <HStack spacing={1} color="brand.highlight" fontWeight="bold">
            <InfoIcon w={3} h={3} />
            <Text fontSize="sm">{event?.location}</Text>
          </HStack>

          <Text fontSize="sm" color="gray.600" noOfLines={2} pt={2}>
            {event?.description}
          </Text>

          <Button
            size="sm"
            variant="ghost"
            color="brand.medium"
            p={0}
            _hover={{ bg: 'transparent', textDecoration: 'underline' }}
          >
            Event Details
          </Button>
        </VStack>
      </Flex>

      {/* Subtle Brand Accent bar */}
      <Box
        h="3px"
        w="0%"
        bg="brand.highlight"
        transition="width 0.3s ease"
        _groupHover={{ w: '100%' }}
      />
    </Box>
  )
}

export default EventCard
