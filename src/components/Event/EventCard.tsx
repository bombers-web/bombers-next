import { useState } from 'react'
import { CalendarIcon, InfoIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Collapse,
} from '@chakra-ui/react'
import { format } from 'date-fns'

const EventCard = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false)

  const eventDate = new Date(event?.date)
  const month = format(eventDate, 'MMM')
  const day = format(eventDate, 'dd')
  const time = format(eventDate, 'p')

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
      borderColor={isOpen ? 'brand.highlight' : 'gray.100'}
      cursor="pointer"
      onClick={() => setIsOpen(!isOpen)}
      _hover={{
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
          bg={isOpen ? 'brand.medium' : 'gray.50'}
          color={isOpen ? 'white' : 'inherit'}
          w={{ base: '100%', md: '120px' }}
          py={6}
          borderRight={{ md: '1px solid' }}
          borderColor="gray.100"
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
        <VStack p={6} spacing={2} align="start" flex="1" position="relative">
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

          <HStack
            spacing={1}
            color="brand.highlight"
            fontWeight="bold"
            pb={isOpen ? 0 : 4}
          >
            <InfoIcon w={3} h={3} />
            <Text fontSize="sm">{event?.location}</Text>
          </HStack>

          {/* COLLAPSIBLE DETAILS */}
          <Collapse in={isOpen} animateOpacity style={{ width: '100%' }}>
            <Box
              pt={4}
              pb={6}
              mt={2}
              borderTop="1px solid"
              borderColor="gray.100"
            >
              <Text fontSize="sm" color="gray.600" lineHeight="tall">
                {event?.description ||
                  'No further details available for this event.'}
              </Text>
            </Box>
          </Collapse>

          {/* BOTTOM RIGHT TOGGLE */}
          <HStack
            position="absolute"
            bottom={4}
            right={6}
            spacing={1}
            color="brand.medium"
            fontWeight="bold"
            align="center" // Ensures vertical centering
            transition="0.2s"
            _groupHover={{ color: 'brand.highlight' }}
          >
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="wider"
              lineHeight="1" // Prevents the text box from being taller than the font
            >
              {isOpen ? 'Close' : 'Full Details'}
            </Text>
            <ChevronDownIcon
              transition="transform 0.3s"
              transform={isOpen ? 'rotate(180deg)' : 'none'}
              w={4}
              h={4}
              // mt="-1px" // Micro-adjustment to pull the icon up visually
            />
          </HStack>
        </VStack>
      </Flex>

      {/* Subtle Brand Accent bar */}
      <Box
        h="3px"
        w={isOpen ? '100%' : '0%'}
        bg="brand.highlight"
        transition="width 0.3s ease"
        _groupHover={{ w: '100%' }}
      />
    </Box>
  )
}

export default EventCard
