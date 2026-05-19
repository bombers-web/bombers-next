import { Box, Grid, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'

type Practice = {
  start_time?: string
  location?: {
    name?: string
    address?: string
    city?: string
  }
}

type Props = {
  practice?: Practice | null
}

const formatTime = (timeString?: string) => {
  if (!timeString) return ''
  const [hour, minute] = timeString.split(':')
  const h = parseInt(hour, 10)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${minute} ${ampm}`
}

export const ClubIdentity = ({ practice }: Props) => {
  const practiceTime = practice?.start_time
    ? `Tue & Thu · ${formatTime(practice.start_time)}`
    : 'Tue & Thu · 6:30 PM'

  const practiceMapUrl = practice?.location?.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        practice.location.address,
      )}`
    : 'https://www.google.com/maps/search/?api=1&query=Emerson+Field+Forest+Park+St+Louis+MO'

  const practiceLocationName =
    practice?.location?.name ?? 'Emerson Central Fields'
  const practiceLocationCity = practice?.location?.city ?? 'St. Louis, Missouri'

  return (
    <Grid
      templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
      gap={5}
      maxW="880px"
      mx="auto"
      w="full"
      my={4}
    >
      {/* Donate & Sponsor */}
      <Box
        bg="brand.mediumSecondary"
        color="white"
        p={{ base: 7, md: 8 }}
        display="flex"
        flexDirection="column"
        borderTop="3px solid"
        borderColor="brand.highlight"
        borderRadius="sm"
      >
        <Text
          fontFamily="display"
          fontWeight="bold"
          fontSize="lg"
          letterSpacing="widest"
          textTransform="uppercase"
          color="white"
        >
          Donate &amp; Sponsor
        </Text>
        <Text
          fontFamily="body"
          fontSize="sm"
          color="whiteAlpha.600"
          mt={3}
          lineHeight="tall"
          flex={1}
        >
          Support the Bombers through donations or a corporate sponsorship.
        </Text>
        <NextLink href="/pay" passHref legacyBehavior>
          <Link
            fontFamily="display"
            fontWeight="bold"
            fontSize="sm"
            letterSpacing="widest"
            textTransform="uppercase"
            color="brand.highlight"
            mt={5}
            display="inline-flex"
            alignItems="center"
            gap={2}
            textDecoration="none"
            _hover={{ textDecoration: 'none', opacity: 0.8 }}
          >
            Support the Club →
          </Link>
        </NextLink>
      </Box>

      {/* Practice Schedule */}
      <Box
        bg="brand.mediumSecondary"
        color="white"
        p={{ base: 7, md: 8 }}
        display="flex"
        flexDirection="column"
        borderTop="3px solid"
        borderColor="brand.highlight"
        borderRadius="sm"
      >
        <Text
          fontFamily="display"
          fontWeight="bold"
          fontSize="lg"
          letterSpacing="widest"
          textTransform="uppercase"
          color="white"
        >
          Practice Schedule
        </Text>
        <Text
          fontFamily="body"
          fontSize="sm"
          color="whiteAlpha.600"
          mt={3}
          lineHeight="tall"
          flex={1}
        >
          {practiceTime}
        </Text>
        <Link
          href={practiceMapUrl}
          isExternal
          fontFamily="display"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="widest"
          textTransform="uppercase"
          color="brand.highlight"
          mt={5}
          display="inline-flex"
          alignItems="center"
          gap={2}
          textDecoration="none"
          _hover={{ textDecoration: 'none', opacity: 0.8 }}
        >
          {practiceLocationName} →
        </Link>
        <Text
          fontFamily="body"
          fontSize="xs"
          color="whiteAlpha.400"
          mt={2}
          letterSpacing="wide"
        >
          {practiceLocationCity}
        </Text>
      </Box>
    </Grid>
  )
}
