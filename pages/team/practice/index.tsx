import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import Layout from '../../../src/common/Layout'
import SectionHeading from '../../../src/common/SectionHeading'
import SectionLabel from '../../../src/common/SectionLabel'
import { fetchAPI } from '../../../src/lib/api'
import { Practice } from '../../../src/components/Practice/Practice'

const PHOTOS = [
  { src: '/static/nationals17.jpg', alt: 'Team huddle at practice' },
  { src: '/static/STLvCHG00831.JPG', alt: 'Scrum during play' },
]

const Practices = ({ practices }) => {
  return (
    <Layout
      mainBg="brand.bg"
      seo={{
        metaTitle: 'Practice | St. Louis Bombers',
        metaDescription:
          'Join the St. Louis Bombers for practice. Tuesdays and Thursdays.',
      }}
    >
      {/* Page Header */}
      <Box
        bg="brand.black"
        color="white"
        pt={{ base: '4.5rem', md: '4.5rem' }}
        pb={{ base: '4rem', md: '4rem' }}
        px={{ base: 4, md: 8 }}
        position="relative"
        overflow="hidden"
      >
        <Box maxW="1100px" mx="auto" position="relative">
          <SectionHeading
            eyebrow="The Team"
            heading={<>Practice</>}
            eyebrowColor="brand.highlight"
            headingColor="white"
            as="h1"
            headingSize={{
              base: '2.5rem',
              md: 'clamp(2.5rem, 5.4vw, 4.375rem)',
            }}
            mb="1.25rem"
          />
        </Box>
      </Box>

      {/* Content */}
      <Box
        maxW="1100px"
        mx="auto"
        px={{ base: 4, md: 8 }}
        pt={{ base: 10, md: 14 }}
        pb={{ base: 14, md: 20 }}
      >
        {/* Schedule */}
        <SectionLabel>Practice Schedule</SectionLabel>
        <Practice practices={practices} />

        {/* Photo grid */}
        <Box mt={{ base: 14, md: 20 }}>
          <SectionLabel>On The Pitch</SectionLabel>
          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={{ base: '0.75rem', md: '0.875rem' }}
          >
            {PHOTOS.map(({ src, alt }) => (
              <Box
                key={src}
                position="relative"
                h={{ base: '200px', md: '260px' }}
                borderRadius="sm"
                overflow="hidden"
              >
                <NextImage
                  src={src}
                  alt={alt}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </Box>
            ))}
          </Grid>
        </Box>

        {/* Contact CTA card */}
        <Box mt={{ base: 14, md: 20 }}>
          <SectionLabel>Join Us</SectionLabel>
          <Box
            as={NextLink}
            href="/contact"
            display="block"
            bg="brand.dark"
            borderRadius="sm"
            overflow="hidden"
            role="group"
            cursor="pointer"
            transition="box-shadow 0.2s"
            _hover={{
              boxShadow: '0 0.5rem 2rem rgba(0,0,0,0.25)',
              textDecoration: 'none',
            }}
          >
            <Box h="3px" w="100%" bg="brand.highlight" />
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'flex-start', md: 'center' }}
              justify="space-between"
              px={{ base: 6, md: 10 }}
              py={{ base: 8, md: 10 }}
              gap={6}
            >
              <Box>
                <Text
                  fontFamily="display"
                  fontWeight={800}
                  fontSize={{
                    base: '1.875rem',
                    md: 'clamp(1.875rem, 3vw, 2.5rem)',
                  }}
                  textTransform="uppercase"
                  letterSpacing="0.04em"
                  lineHeight={0.95}
                  color="white"
                  mb={3}
                >
                  New to Rugby?
                </Text>
                <Text
                  fontFamily="body"
                  fontSize="sm"
                  color="whiteAlpha.600"
                  maxW="480px"
                  lineHeight={1.7}
                >
                  No experience needed — just show up. Come to a practice and
                  see what it&apos;s all about.
                </Text>
              </Box>
              <Flex
                align="center"
                gap={2}
                color="brand.highlight"
                fontFamily="display"
                fontWeight={700}
                fontSize="sm"
                letterSpacing="0.2em"
                textTransform="uppercase"
                flexShrink={0}
                transition="gap 0.2s"
                _groupHover={{ gap: 3 }}
              >
                Get In Touch
                <Icon as={FiArrowRight} boxSize={4} />
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const practices = await fetchAPI('/practices?populate=*')
  return {
    props: {
      practices: Array.isArray(practices) ? practices : [],
    },
    revalidate: 86400,
  }
}

export default Practices
