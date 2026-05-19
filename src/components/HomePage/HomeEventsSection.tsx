import { Box, Flex, Grid, Heading, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { format } from 'date-fns'
import { EventType } from '../../types/eventTypes'

type Props = {
  events: EventType[]
}

const btnBase = {
  fontFamily: 'display',
  fontWeight: 600,
  fontSize: '13px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase' as const,
  px: '24px',
  py: '14px',
  display: 'inline-block',
  textDecoration: 'none',
  transition: 'opacity 0.15s',
  _hover: { textDecoration: 'none', opacity: 0.8, color: 'brand.white' },
}

function FeaturedCard({ event }: { event: EventType }) {
  const d = new Date(event.date)
  const day = format(d, 'd')
  const monthShort = format(d, 'MMM').toUpperCase()
  const dayShort = format(d, 'EEE').toUpperCase()
  const year = format(d, 'yyyy')
  const time = format(d, 'p')

  const photoBg = event.image?.url
    ? `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%), url(${event.image.url})`
    : 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)'

  return (
    <Box
      display="flex"
      flexDirection="column"
      bg="brand.mediumSecondary"
      borderRadius="sm"
      overflow="hidden"
      color="white"
    >
      {/* Photo */}
      <Box
        position="relative"
        h={{ base: '260px', md: '340px' }}
        backgroundImage={photoBg}
        backgroundSize="cover"
        backgroundPosition="center"
        flexShrink={0}
      >
        <Box
          position="absolute"
          top={4}
          left={4}
          bg="brand.highlight"
          color="brand.black"
          fontFamily="display"
          fontWeight={700}
          fontSize="11px"
          letterSpacing="0.3em"
          textTransform="uppercase"
          px="12px"
          py="7px"
        >
          Featured Event
        </Box>

        <Flex
          position="absolute"
          bottom={5}
          left={5}
          align="flex-end"
          gap="14px"
        >
          <Text
            fontFamily="display"
            fontWeight={700}
            fontSize="clamp(72px, 8vw, 110px)"
            color="white"
            lineHeight={0.82}
            margin={0}
          >
            {day}
          </Text>
          <Box pb="8px">
            <Text
              fontFamily="display"
              fontWeight={700}
              fontSize="26px"
              letterSpacing="0.18em"
              color="brand.highlight"
              textTransform="uppercase"
              lineHeight={1}
              margin={0}
            >
              {monthShort}
            </Text>
            <Text
              fontFamily="body"
              fontSize="13px"
              color="white"
              mt="6px"
              letterSpacing="0.1em"
            >
              {dayShort} · {year}
            </Text>
          </Box>
        </Flex>
      </Box>

      {/* Content */}
      <Box p={{ base: 6, md: '32px 36px 36px' }} flex={1}>
        <Heading
          fontFamily="display"
          fontWeight={700}
          fontSize={{ base: '36px', md: '48px' }}
          letterSpacing="0.03em"
          textTransform="uppercase"
          lineHeight={0.95}
          color="white"
          margin={0}
        >
          {event.name}
        </Heading>
        <Text
          fontFamily="display"
          fontWeight={400}
          fontSize="14px"
          letterSpacing="0.25em"
          textTransform="uppercase"
          color="brand.highlight"
          mt={3}
        >
          {time}
        </Text>
        {event.location && (
          <Text fontFamily="body" fontSize="14px" color="#b8b8b8" mt={1}>
            {event.location}
          </Text>
        )}
        {event.description && (
          <Text
            fontFamily="body"
            fontSize="15px"
            color="#b8b8b8"
            lineHeight={1.6}
            mt={4}
            noOfLines={3}
          >
            {event.description}
          </Text>
        )}
        <Flex mt={6} gap={3} flexWrap="wrap">
          <NextLink href="/club/events" passHref legacyBehavior>
            <Link {...btnBase} bg="brand.highlight" color="brand.black">
              Event Details →
            </Link>
          </NextLink>
          {event.link && (
            <Link
              {...btnBase}
              href={event.link}
              isExternal
              border="1.5px solid"
              borderColor="brand.medium"
              color="white"
            >
              {event.link_text ?? 'Register'}
            </Link>
          )}
        </Flex>
      </Box>
    </Box>
  )
}

function StackedCard({ event }: { event: EventType }) {
  const d = new Date(event.date)
  const day = format(d, 'd')
  const monthShort = format(d, 'MMM').toUpperCase()
  const dayShort = format(d, 'EEE').toUpperCase()
  const time = format(d, 'p')

  return (
    <Box
      display="grid"
      gridTemplateColumns="130px 1fr"
      bg="brand.mediumSecondary"
      borderRadius="sm"
      overflow="hidden"
      color="white"
    >
      {/* Date block */}
      <Flex
        bg="brand.darkSecondary"
        direction="column"
        align="center"
        justify="center"
        borderRight="3px solid"
        borderColor="brand.highlight"
        py={6}
        px={0}
        flexShrink={0}
      >
        <Text
          fontFamily="display"
          fontWeight={600}
          fontSize="14px"
          letterSpacing="0.3em"
          color="brand.highlight"
          textTransform="uppercase"
        >
          {monthShort}
        </Text>
        <Text
          fontFamily="display"
          fontWeight={700}
          fontSize="66px"
          color="white"
          lineHeight={0.9}
          mt={1}
        >
          {day}
        </Text>
        <Text
          fontFamily="body"
          fontSize="11px"
          color="#b8b8b8"
          letterSpacing="0.25em"
          textTransform="uppercase"
          mt="10px"
        >
          {dayShort}
        </Text>
      </Flex>

      {/* Content */}
      <Flex
        direction="column"
        justify="center"
        p={{ base: 5, md: '24px 28px' }}
        gap={2}
      >
        <Text
          fontFamily="body"
          fontSize="12px"
          color="#8a8a8a"
          letterSpacing="0.1em"
        >
          {time}
        </Text>
        <Heading
          fontFamily="display"
          fontWeight={700}
          fontSize={{ base: '22px', md: '30px' }}
          letterSpacing="0.04em"
          textTransform="uppercase"
          lineHeight={1}
          color="white"
          margin={0}
        >
          {event.name}
        </Heading>
        {event.location && (
          <Text fontFamily="body" fontSize="13px" color="#b8b8b8">
            {event.location}
          </Text>
        )}
        <Box mt={2}>
          <NextLink href="/club/events" passHref legacyBehavior>
            <Link
              fontFamily="display"
              fontWeight={600}
              fontSize="12px"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="brand.highlight"
              textDecoration="none"
              _hover={{ textDecoration: 'none', opacity: 0.75 }}
            >
              Details →
            </Link>
          </NextLink>
          {event.link && (
            <Link
              href={event.link}
              isExternal
              fontFamily="display"
              fontWeight={600}
              fontSize="12px"
              letterSpacing="0.2em"
              textTransform="uppercase"
              color="white"
              textDecoration="none"
              ml={4}
              _hover={{ textDecoration: 'none', opacity: 0.75 }}
            >
              {event.link_text ?? 'Register'}
            </Link>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

const HomeEventsSection = ({ events }: Props) => {
  if (!events || events.length === 0) return null

  const [hero, ...rest] = events

  return (
    <Box
      bg="brand.light"
      w="full"
      py={{ base: 14, md: 20 }}
      px={{ base: 4, md: 8 }}
    >
      <Box maxW="1280px" mx="auto">
        <Flex
          align="baseline"
          justify="space-between"
          mb={7}
          flexWrap="wrap"
          gap={3}
        >
          <Box>
            <Text
              fontFamily="display"
              fontWeight={600}
              fontSize="md"
              letterSpacing="0.4em"
              color="gray.500"
              textTransform="uppercase"
              mb={1}
            >
              On the Calendar
            </Text>
            <Heading
              fontFamily="display"
              fontWeight={700}
              fontSize="clamp(36px, 4vw, 56px)"
              letterSpacing="0.02em"
              textTransform="uppercase"
              lineHeight="none"
              color="brand.dark"
              margin={0}
            >
              Upcoming Events
            </Heading>
          </Box>
          <NextLink href="/club/events" passHref legacyBehavior>
            <Link
              fontFamily="display"
              fontWeight={600}
              fontSize="13px"
              letterSpacing="0.25em"
              textTransform="uppercase"
              color="brand.dark"
              textDecoration="none"
              sx={{
                borderBottom: '2px solid',
                borderBottomColor: 'brand.highlight',
              }}
              pb="3px"
              _hover={{ textDecoration: 'none', opacity: 0.75 }}
            >
              View All →
            </Link>
          </NextLink>
        </Flex>

        <Grid
          templateColumns={{ base: '1fr', lg: '1.4fr 1fr' }}
          gap={5}
          alignItems="start"
        >
          <FeaturedCard event={hero} />

          {rest.length > 0 && (
            <Grid gap={5}>
              {rest.map((e) => (
                <StackedCard key={e.id} event={e} />
              ))}
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  )
}

export default HomeEventsSection
