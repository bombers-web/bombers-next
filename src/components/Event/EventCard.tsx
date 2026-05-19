import { useState } from 'react'
import { Box, Button, Collapse, Flex, Icon, Link, Text } from '@chakra-ui/react'
import {
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
} from 'react-icons/fi'
import { format } from 'date-fns'
import { EventType } from '../../types/eventTypes'
import LocationWithCopy from '../../common/LocationWithCopy'

const EventCard = ({
  event,
  isPast,
}: {
  event: EventType
  isPast?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const eventDate = new Date(event?.date)
  const dateLabel = format(eventDate, 'EEE, MMM d, yyyy')
  const time = format(eventDate, 'p')
  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <Box
      w="full"
      bg="brand.mediumSecondary"
      borderRadius="xl"
      overflow="hidden"
      opacity={isPast ? 0.5 : 1}
      filter={isPast ? 'grayscale(0.75)' : undefined}
    >
      {/* IMAGE BANNER */}
      {event?.image?.url && (
        <Box
          h="180px"
          backgroundImage={`url(${event.image.url})`}
          backgroundPosition="center"
          backgroundSize="cover"
        />
      )}

      {/* CLICKABLE HEADER */}
      <Box
        w="full"
        onClick={() => setIsOpen((v) => !v)}
        cursor="pointer"
        _hover={{ bg: 'whiteAlpha.50' }}
        transition="background 0.15s"
        px={{ base: 4, md: 6 }}
        pt={4}
        pb={4}
      >
        <Flex direction="column" gap={2}>
          {/* Event name */}
          <Text
            color="brand.light"
            fontWeight="800"
            fontSize={{ base: '2xl', md: '3xl' }}
            textTransform="uppercase"
            letterSpacing="wider"
            textAlign="center"
          >
            {event?.name}
          </Text>

          {/* Date + time */}
          <Flex direction="column" gap={4}>
            <Flex align="center" gap={1}>
              <Icon as={FiCalendar} color="brand.highlight" boxSize={3} />
              <Text as="span" color="brand.light" opacity={0.6} fontSize="md">
                {dateLabel}
              </Text>
              <Text as="span" color="brand.light" opacity={0.4} fontSize="md">
                · {time}
              </Text>
            </Flex>
            <LocationWithCopy
              name={event?.location || ''}
              mapUrl={
                isPast
                  ? undefined
                  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      event?.location || '',
                    )}`
              }
              stopPropagation
            />
          </Flex>

          {/* CTA + Details row */}
          <Flex justify="space-between" align="center" pt={4}>
            {event?.link && !isPast ? (
              <Box onClick={stopPropagation}>
                <Link
                  href={event.link}
                  isExternal
                  _hover={{ textDecoration: 'none' }}
                >
                  <Button
                    size="sm"
                    bg="brand.highlight"
                    color="brand.dark"
                    fontWeight="black"
                    textTransform="uppercase"
                    fontSize="sm"
                    rightIcon={<Icon as={FiExternalLink} />}
                    _hover={{ bg: 'yellow.200' }}
                  >
                    {event?.link_text || 'Sign Up Now'}
                  </Button>
                </Link>
              </Box>
            ) : (
              <Box />
            )}
            <Flex align="center" gap={1}>
              <Text
                fontSize="xs"
                fontWeight="800"
                letterSpacing="widest"
                textTransform="uppercase"
                color="brand.light"
                opacity={0.4}
                margin={0}
              >
                Details
              </Text>
              <Icon
                as={isOpen ? FiChevronUp : FiChevronDown}
                color="brand.light"
                opacity={0.4}
                boxSize={4}
              />
            </Flex>
          </Flex>
        </Flex>
      </Box>

      {/* COLLAPSIBLE DETAILS */}
      <Collapse in={isOpen} animateOpacity>
        <Box
          px={{ base: 4, md: 6 }}
          pb={5}
          borderTop="1px solid"
          borderColor="whiteAlpha.100"
        >
          <Text
            color="brand.light"
            opacity={0.7}
            fontSize="sm"
            lineHeight="tall"
            pt={4}
          >
            {event?.description ||
              'No further details available for this event.'}
          </Text>
        </Box>
      </Collapse>
    </Box>
  )
}

export default EventCard
