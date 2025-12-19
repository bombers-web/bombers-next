import { Badge, Flex, Link, Text } from '@chakra-ui/react'
import React from 'react'

export const Practice = ({ practices }) => {
  // Helper to format time (reuse from your practice page)
  const formatTime = (timeString) => {
    if (!timeString) return ''
    const [hour, minute] = timeString.split(':')
    const h = parseInt(hour, 10)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const adjustedHour = h % 12 || 12
    return `${adjustedHour}:${minute} ${ampm}`
  }

  return (
    practices?.length > 0 && (
      <Flex
        flexDirection="column"
        m="10px"
        p="20px"
        w="full"
        bg="whiteAlpha.100"
        borderRadius="lg"
        border="1px solid"
        borderColor="whiteAlpha.200"
      >
        <Text color="brand.white">Practice:</Text>
        {practices.map((practice, idx) => {
          const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            practice?.location?.address || '',
          )}`

          return (
            <Flex
              key={practice.id}
              direction={{ base: 'column', md: 'row' }}
              align="center"
              justify="center"
              gap={4}
              mb={idx !== practices.length - 1 ? 4 : 0}
            >
              <Badge
                colorScheme="yellow"
                variant="solid"
                px={3}
                py={1}
                borderRadius="full"
              >
                Tue & Thu @ {formatTime(practice.start_time)}
              </Badge>

              <Link
                href={mapUrl}
                isExternal
                color="white"
                fontWeight="semibold"
                _hover={{ color: 'brand.gold', textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
                sx={{ WebkitTapHighlightColor: 'transparent' }}
              >
                📍 {practice?.location?.name}
              </Link>
            </Flex>
          )
        })}
      </Flex>
    )
  )
}
