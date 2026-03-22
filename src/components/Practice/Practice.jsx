import { Badge, Box, Flex, Heading, Icon, Link, Text } from '@chakra-ui/react'
import { FiMapPin } from 'react-icons/fi'

export const Practice = ({ practices }) => {
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
        direction="column"
        align="center"
        justify="center"
        my={8}
        p={{ base: 6, md: 10 }}
        w="full"
        bg="brand.medium"
        borderRadius="2xl"
        border="1px solid"
        borderColor="brand.medium"
        boxShadow="xl"
        gap={6}
      >
        <Flex align="center" gap={3}>
          <Heading
            size="md"
            color="white"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Practice Schedule
          </Heading>
        </Flex>
        <Box w="full">
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
                gap={{ base: 4, md: 8 }}
                mb={idx !== practices.length - 1 ? 6 : 0}
              >
                <Badge
                  colorScheme="yellow"
                  variant="solid"
                  px={6}
                  py={2}
                  fontSize="lg"
                  borderRadius="full"
                >
                  Tue & Thu @ {formatTime(practice.start_time)}
                </Badge>
                <Flex
                  direction="column"
                  align={{ base: 'center', md: 'flex-start' }}
                  gap={1}
                >
                  <Link
                    href={mapUrl}
                    isExternal
                    color="yellow.400"
                    fontSize="md"
                    display="flex"
                    alignItems="center"
                    fontWeight="semibold"
                    _hover={{
                      color: 'yellow.200',
                      textDecoration: 'none',
                    }}
                  >
                    <Icon as={FiMapPin} mr={2} />
                    {practice?.location?.name}
                  </Link>
                  <Text color="whiteAlpha.700" fontSize="sm">
                    {practice?.location?.city}
                  </Text>
                </Flex>
              </Flex>
            )
          })}
        </Box>
      </Flex>
    )
  )
}
