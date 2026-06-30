import { useState } from 'react'
import { Box, Button, Collapse, Flex, Icon, Link, Text } from '@chakra-ui/react'
import { FiChevronDown, FiChevronUp, FiExternalLink } from 'react-icons/fi'
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
  const day = format(eventDate, 'd')
  const month = format(eventDate, 'MMM').toUpperCase()
  const weekday = format(eventDate, 'EEE').toUpperCase()
  const year = format(eventDate, 'yyyy')
  const time = format(eventDate, 'p')

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()

  const cardBg = isPast ? 'brand.pastSurface' : 'brand.mediumSecondary'
  const railBg = isPast ? 'brand.pastRail' : 'brand.darkSecondary'
  const railBorderColor = isPast ? 'overlay.lightFaint' : 'brand.highlight'
  const monthColor = isPast ? 'overlay.lightStrong' : 'brand.highlight'
  const subtitleColor = isPast ? 'overlay.light' : 'brand.highlight'
  const detailsColor = isPast ? 'overlay.light' : 'brand.light'

  return (
    <Box w="full" bg={cardBg} borderRadius="sm" overflow="hidden">
      {/* IMAGE BANNER */}
      {event?.image?.url && !isPast && (
        <Box
          h={{ base: '200px', md: '300px' }}
          backgroundImage={`url(${event.image.url})`}
          backgroundPosition="center"
          backgroundSize="cover"
        />
      )}

      {/* ROW: date rail + main content */}
      <Flex align="stretch">
        {/* DATE RAIL */}
        <Flex
          flexShrink={0}
          w={{ base: '70px', md: '96px' }}
          bg={railBg}
          direction="column"
          align="center"
          justify="center"
          py={6}
          px={{ base: '6px', md: '8px' }}
          borderRight="2px solid"
          borderColor={railBorderColor}
        >
          <Text
            fontFamily="display"
            fontWeight={500}
            fontSize="11px"
            letterSpacing="0.25em"
            textTransform="uppercase"
            color="gray.400"
          >
            {weekday}
          </Text>
          <Text
            fontFamily="display"
            fontWeight={600}
            fontSize="13px"
            letterSpacing="0.25em"
            textTransform="uppercase"
            color={monthColor}
          >
            {month}
          </Text>
          <Text
            fontFamily="display"
            fontWeight={700}
            fontSize={{ base: '28px', md: '38px' }}
            color="white"
            lineHeight={0.9}
            mt="6px"
          >
            {day}
          </Text>
          <Text
            fontFamily="body"
            fontWeight={500}
            fontSize="11px"
            letterSpacing="0.12em"
            color="gray.400"
            mt="6px"
          >
            {year}
          </Text>
        </Flex>

        {/* MAIN */}
        <Flex
          direction="column"
          flex={1}
          p={{ base: '20px 18px', md: '24px 28px' }}
          minW={0}
        >
          {/* Title */}
          <Text
            fontFamily="display"
            fontWeight={700}
            fontSize={{ base: '23px', md: '30px' }}
            letterSpacing="0.04em"
            textTransform="uppercase"
            color="white"
            lineHeight={1}
          >
            {event?.name}
          </Text>

          {/* Time subtitle */}
          <Text
            fontFamily="display"
            fontWeight={500}
            fontSize="13px"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color={subtitleColor}
            mt="10px"
          >
            {time}
          </Text>

          {/* Location */}
          {event?.location && (
            <Box mt={3}>
              <LocationWithCopy
                name={event.location}
                mapUrl={
                  isPast
                    ? undefined
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        event.location,
                      )}`
                }
                color={isPast ? 'overlay.lightStrong' : 'brand.highlight'}
                fontSize="13px"
                pinSize={3}
              />
            </Box>
          )}

          {/* Collapsible description */}
          <Collapse in={isOpen} animateOpacity>
            <Box
              mt={4}
              pt={4}
              borderTop="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Text
                fontFamily="body"
                fontSize="14px"
                lineHeight={1.65}
                color={isPast ? 'overlay.lightStrong' : 'brand.light'}
              >
                {event?.description ||
                  'No further details available for this event.'}
              </Text>
            </Box>
          </Collapse>

          {/* Footer row */}
          <Flex align="center" mt={5} gap={3} flexWrap="wrap">
            {event?.link && !isPast ? (
              <Box onClick={stopPropagation}>
                <Link
                  href={event.link}
                  isExternal
                  _hover={{ textDecoration: 'none' }}
                >
                  <Button
                    bg="brand.highlight"
                    color="brand.dark"
                    fontFamily="display"
                    fontWeight={700}
                    fontSize="12px"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    px="22px"
                    py="12px"
                    h="auto"
                    borderRadius="none"
                    rightIcon={<Icon as={FiExternalLink} boxSize={3} />}
                    _hover={{ filter: 'brightness(0.93)' }}
                    _active={{ transform: 'scale(0.98)' }}
                  >
                    {event?.link_text || 'Sign Up Now'}
                  </Button>
                </Link>
              </Box>
            ) : (
              <Box />
            )}
            <Button
              ml="auto"
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen((v) => !v)}
              rightIcon={
                <Icon
                  as={isOpen ? FiChevronUp : FiChevronDown}
                  color={isOpen ? 'brand.highlight' : undefined}
                  transition="color 0.15s"
                />
              }
              fontFamily="display"
              fontWeight={600}
              fontSize="11px"
              letterSpacing="0.25em"
              textTransform="uppercase"
              color={detailsColor}
              _hover={{ color: 'brand.highlight', bg: 'transparent' }}
              px={0}
            >
              Details
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default EventCard
