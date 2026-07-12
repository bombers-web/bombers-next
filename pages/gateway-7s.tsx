import React from 'react'
import Image from 'next/image'
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import Layout from '../src/common/Layout'

const SIGNUP_URL =
  'https://l.facebook.com/l.php?u=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2F1MCJCytB8SsPTHCqUr6LqPOCpobKH0pZfbi368i0isyU%2Fviewform%3Fedit_requested%3Dtrue&h=AUATtcH_2vm7187C4UDfhW4D4gQx85vH2hqJgcFeQ20y_eLikytiR7ywD5_3PIDP9XtlU4Fqh6quj2E4PDmTR0rOe3G6_MEBlbfLCObWLUe6dRwX-QLjNl0R6nFvFDe0Ykk'

const STATS: [string, string][] = [
  ['3', 'pitches'],
  ['3', 'divisions'],
  ['$500', 'per side'],
]

function Bombers7sLogo({
  size = 50,
  style,
}: {
  size?: number
  style?: React.CSSProperties
}) {
  return (
    <Image
      src="/static/logos/Bombers7s-black.png"
      alt="Bombers 7s"
      width={size}
      height={size}
      style={{ objectFit: 'contain', ...style }}
    />
  )
}

function Photo({
  h = 220,
  patternId,
  src,
}: {
  h?: number
  patternId: string
  src?: string
}) {
  const c = 'var(--chakra-colors-brand-medium)'
  return (
    <Box
      w="full"
      h={`${h}px`}
      position="relative"
      border="1.5px solid"
      borderColor="brand.mediumSecondary"
      bg="brand.light"
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={patternId}
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-30)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke={c}
              strokeWidth="1"
              opacity="0.28"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      {src && (
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 48em) 100vw, 540px"
          style={{ objectFit: 'cover' }}
        />
      )}
    </Box>
  )
}

export async function getStaticProps() {
  return { props: {}, revalidate: 86400 }
}

export default function Gateway7s() {
  return (
    <Layout
      seo={{
        metaTitle: 'Gateway 7s · St. Louis Bombers Rugby',
        metaDescription:
          "Gateway 7s — St. Louis Bombers' flagship summer rugby sevens tournament. July 11, 2026, Forest Park.",
      }}
      mainBg="brand.light"
    >
      <Box color="brand.dark">
        {/* Hero */}
        <Box maxW="880px" mx="auto" px={10} pt={20} pb={16} textAlign="center">
          <Text
            fontSize="sm"
            letterSpacing="0.4em"
            color="brand.meta"
            textTransform="uppercase"
          >
            JULY 11 · FOREST PARK
          </Text>
          <Text
            as="h1"
            fontFamily="display"
            sx={{ fontSize: 'clamp(80px, 14vw, 160px)' }}
            lineHeight={0.9}
            mt={5}
            mb={2}
            letterSpacing="-0.01em"
            color="brand.dark"
          >
            Gateway 7s
          </Text>
          <Text fontSize="lg" color="brand.mediumSecondary" fontStyle="italic">
            One day. One champion.
          </Text>
          <Box mt={8}>
            <Button
              as="a"
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
              size="md"
            >
              Register your side
            </Button>
          </Box>
        </Box>

        {/* Single wide photo */}
        <Box maxW="1080px" mx="auto" px={10}>
          <Box
            position="relative"
            h="420px"
            w="full"
            overflow="hidden"
            border="1px solid black"
          >
            <Image
              src="/static/sevens_huddle.JPG"
              alt="Gateway 7s action"
              fill
              priority
              sizes="(max-width: 68em) 100vw, 1080px"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </Box>

        {/* Description */}
        <Box maxW="640px" mx="auto" px={10} py={20} textAlign="center">
          <Bombers7sLogo
            size={80}
            style={{ display: 'block', margin: '0 auto 18px' }}
          />
          <Text fontSize="xl" color="brand.mediumSecondary" lineHeight={1.7}>
            The Bombers&apos; flagship summer tournament, on three pitches in
            the heart of Forest Park. Three divisions — Men&apos;s Qualifier,
            Women&apos;s Qualifier, and Men&apos;s Social.
          </Text>
        </Box>

        {/* Stats strip */}
        <Box maxW="880px" mx="auto" px={10} pb={20}>
          <Grid
            templateColumns="repeat(3, 1fr)"
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="brand.mediumSecondary"
          >
            {STATS.map(([n, l], i) => (
              <GridItem
                key={l}
                py={6}
                px={3}
                textAlign="center"
                borderLeft={i === 0 ? 'none' : '1px dashed'}
                borderColor="brand.dark"
              >
                <Text
                  fontFamily="display"
                  fontSize="4xl"
                  lineHeight={1}
                  color="brand.highlight"
                  sx={{
                    WebkitTextStroke:
                      '1px var(--chakra-colors-brand-mediumSecondary)',
                  }}
                >
                  {n}
                </Text>
                <Text
                  fontSize="xs"
                  letterSpacing="0.25em"
                  color="brand.mediumSecondary"
                  mt={1.5}
                  textTransform="uppercase"
                >
                  {l}
                </Text>
              </GridItem>
            ))}
          </Grid>
        </Box>

        {/* Two photos */}
        <Box maxW="1080px" mx="auto" px={10}>
          <Grid templateColumns="1fr 1fr" gap={4}>
            <Photo
              h={300}
              patternId="hatch-left"
              src="/static/feakes_action.JPG"
            />
            <Photo h={300} patternId="hatch-right" src="/static/calvin.JPG" />
          </Grid>
        </Box>

        {/* Sign up */}
        <Box maxW="640px" mx="auto" px={10} pt={20} pb={24} textAlign="center">
          <Text
            fontSize="xs"
            letterSpacing="0.4em"
            color="brand.meta"
            textTransform="uppercase"
          >
            Official Midwest Qualifier
          </Text>
          <Text
            fontFamily="display"
            fontSize="5xl"
            lineHeight={1}
            mt={2}
            color="brand.dark"
          >
            Gateway 7s
          </Text>
          <Text
            fontSize="md"
            color="brand.mediumSecondary"
            mt={3.5}
            lineHeight={1.6}
          >
            $500 per team. Sign up today!
          </Text>
          <Flex mt={7} gap={3} justify="center" flexWrap="wrap">
            <Button
              as="a"
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="solid"
              size="md"
            >
              Sign up →
            </Button>
            <Button as="a" href="/contact" variant="solid" size="md">
              Contact Us
            </Button>
          </Flex>
        </Box>
      </Box>
    </Layout>
  )
}
