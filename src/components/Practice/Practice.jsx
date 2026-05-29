import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import LocationWithCopy from 'common/LocationWithCopy'

const DAYS = ['Tuesday', 'Thursday']

export const Practice = ({ practices }) => {
  const formatTime = (timeString) => {
    if (!timeString) return ''
    const [hour, minute] = timeString.split(':')
    const h = parseInt(hour, 10)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const adjustedHour = h % 12 || 12
    return `${adjustedHour}:${minute} ${ampm}`
  }

  if (!practices?.length) {
    return (
      <Flex
        align="center"
        justify="center"
        bg="brand.mediumSecondary"
        borderRadius="sm"
        py={16}
      >
        <Text
          color="whiteAlpha.400"
          fontFamily="display"
          fontSize="0.8125rem"
          textTransform="uppercase"
          letterSpacing="0.3em"
        >
          No practice schedule listed
        </Text>
      </Flex>
    )
  }

  return (
    <Flex direction="column" gap={{ base: '1rem', md: '1.25rem' }}>
      {practices.map((practice) => {
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          practice?.location?.address || '',
        )}`
        const time = formatTime(practice.start_time)

        return (
          <Box
            key={practice.id}
            bg="brand.dark"
            borderRadius="sm"
            overflow="hidden"
          >
            {/* Card header */}
            <Box px={6} pt={6} pb={4}>
              <Text
                fontFamily="display"
                fontWeight={800}
                fontSize="lg"
                letterSpacing="0.3em"
                textTransform="uppercase"
                color="brand.highlight"
              >
                Practice Schedule
              </Text>
            </Box>

            <Divider borderColor="whiteAlpha.100" />

            {/* Day rows */}
            {DAYS.map((day, idx) => (
              <Box key={day}>
                <Flex align="center" px={6} py={{ base: 5, md: 6 }} gap={6}>
                  <Text
                    fontFamily="display"
                    fontWeight={800}
                    fontSize={{ base: '3xl', md: '4xl' }}
                    textTransform="uppercase"
                    letterSpacing="0.04em"
                    lineHeight={1}
                    color="white"
                  >
                    {day}
                  </Text>
                  <Text
                    fontFamily="display"
                    fontWeight={700}
                    fontSize={{ base: '1rem', md: '1.125rem' }}
                    letterSpacing="0.08em"
                    color="brand.highlight"
                    border="1px solid"
                    borderColor="brand.highlight"
                    borderRadius="full"
                    px={4}
                    py={1.5}
                    lineHeight={1}
                  >
                    {time}
                  </Text>
                </Flex>
                {idx < DAYS.length - 1 && (
                  <Divider borderColor="whiteAlpha.100" />
                )}
              </Box>
            ))}

            <Divider borderColor="whiteAlpha.100" />

            {/* Location */}
            <Box px={6} py={5}>
              <LocationWithCopy
                name={practice?.location?.name ?? ''}
                mapUrl={mapUrl}
                copyText={practice?.location?.address}
                color="whiteAlpha.700"
                fontSize="sm"
                fontWeight="semibold"
              />
              {practice?.location?.city && (
                <Text color="whiteAlpha.400" fontSize="xs" mt={1} ml={5}>
                  {practice.location.city}
                </Text>
              )}
            </Box>
          </Box>
        )
      })}
    </Flex>
  )
}
