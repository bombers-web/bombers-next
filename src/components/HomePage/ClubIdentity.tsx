import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import LocationWithCopy from 'common/LocationWithCopy'

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
  const router = useRouter()

  const practiceTime = practice?.start_time
    ? `Tue & Thu · ${formatTime(practice.start_time)}`
    : 'Tue & Thu · 6:30 PM'

  const practiceMapUrl = practice?.location?.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        practice.location.address,
      )}`
    : 'https://www.google.com/maps/search/?api=1&query=Emerson+Field+Forest+Park+St+Louis+MO'

  const practiceLocationName = practice?.location?.name ?? 'Emerson Field'
  const practiceLocationCity = practice?.location?.city ?? 'Forest Park'

  const links = [
    {
      title: 'Join the Squad',
      body: 'New to rugby or returning? We welcome all skill levels.',
      href: '/contact',
      cta: 'Contact Us →',
    },
    {
      title: 'Donate & Sponsor',
      body: 'Support the Bombers through donations or a corporate sponsorship.',
      href: '/pay',
      cta: 'Support the Club →',
    },
    {
      title: 'Practice Schedule',
      body: practiceTime,
      href: '/team/practice',
      cta: '',
      address: {
        name: practiceLocationName,
        city: practiceLocationCity,
        url: practiceMapUrl,
      },
    },
  ]

  return (
    <Box
      bg="brand.medium"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="xl"
      w="full"
      my={4}
    >
      {/* Link boxes */}
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={0}
      >
        {links.map((link, i) => (
          <GridItem
            key={link.href}
            gridColumn={{ base: i === 0 ? '1 / -1' : 'auto', md: 'auto' }}
            p={{ base: 4, md: 6 }}
            borderLeft={
              i === 1
                ? { md: '1px solid' }
                : i === 2
                ? { base: '1px solid', md: '1px solid' }
                : undefined
            }
            borderTop={i === 0 ? undefined : { base: '1px solid', md: 'none' }}
            borderColor="whiteAlpha.100"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            textAlign="center"
          >
            <Heading
              size="sm"
              color="brand.light"
              textTransform="uppercase"
              letterSpacing="wider"
              margin={0}
            >
              {link.title}
            </Heading>
            <Text
              color="whiteAlpha.600"
              fontSize="xs"
              lineHeight="tall"
              flex={1}
            >
              {link.body}
            </Text>
            {'address' in link && link.address && (
              <>
                <LocationWithCopy
                  name={link.address.name}
                  mapUrl={link.address.url}
                  copyText={link.address.name}
                />
                <Text
                  color="white"
                  opacity={0.4}
                  fontSize="xs"
                  fontWeight="600"
                  letterSpacing="widest"
                  textTransform="uppercase"
                  margin={0}
                >
                  {link.address.city}
                </Text>
              </>
            )}
            {link.cta && (
              <Box
                as="button"
                onClick={() => router.push(link.href)}
                mt={2}
                px={4}
                py={2}
                bg="transparent"
                border="1px solid"
                borderColor="brand.highlight"
                color="brand.highlight"
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wide"
                borderRadius="md"
                transition="all 0.15s"
                _hover={{ bg: 'brand.highlight', color: 'brand.dark' }}
              >
                {link.cta}
              </Box>
            )}
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}
