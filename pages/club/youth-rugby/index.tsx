import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import { FiExternalLink, FiMail } from 'react-icons/fi'
import Layout from '../../../src/common/Layout'
import SectionHeading from '../../../src/common/SectionHeading'
import SectionLabel from '../../../src/common/SectionLabel'
import Pic from '../../../src/common/Pic'
import { fetchAPI } from '../../../src/lib/api'

type YouthTeam = {
  id: string
  name: string
  description?: string
  website?: string
  email?: string
  tags?: string[]
  image?: { url: string; alternativeText?: string; name?: string }
}

function ClubCard({ team }: { team: YouthTeam }) {
  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '0.92fr 1.08fr' }}
      bg="brand.mediumSecondary"
      borderRadius="sm"
      overflow="hidden"
    >
      {/* Image Panel */}
      <Box
        bg="#1a1a1a"
        minH={{ base: '17.5rem', lg: '17.5rem' }}
        borderRight={{ base: 'none', lg: '2px solid' }}
        borderBottom={{ base: '2px solid', lg: 'none' }}
        borderColor="brand.highlight"
        position="relative"
      >
        {team.image?.url && (
          <Box position="absolute" inset={0} overflow="hidden">
            <Pic
              image={team.image}
              fit="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        )}
      </Box>

      {/* Content Panel */}
      <Flex
        direction="column"
        p={{ base: '1.75rem 1.625rem', lg: '2.25rem 2.5rem' }}
        gap={4}
      >
        {/* Badge */}
        <Box
          display="inline-block"
          alignSelf="flex-start"
          bg="brand.highlight"
          color="brand.black"
          fontFamily="display"
          fontWeight={700}
          fontSize="0.625rem"
          letterSpacing="0.28em"
          textTransform="uppercase"
          px={3}
          py="0.25rem"
          borderRadius="sm"
        >
          Youth Club
        </Box>

        {/* Club Name */}
        <Text
          fontFamily="display"
          fontWeight={700}
          fontSize={{ base: '1.75rem', lg: '2.125rem' }}
          letterSpacing="0.02em"
          textTransform="uppercase"
          color="white"
          lineHeight={0.95}
        >
          {team.name}
        </Text>

        {/* Meta Pills */}
        {team.tags && team.tags.length > 0 && (
          <Flex gap={2} wrap="wrap">
            {team.tags.map((tag, i) => (
              <Box
                key={i}
                border="1px solid"
                borderColor="brand.highlight"
                color="brand.highlight"
                fontFamily="display"
                fontWeight={600}
                fontSize="0.6875rem"
                letterSpacing="0.2em"
                textTransform="uppercase"
                px={3}
                py="0.25rem"
                borderRadius="full"
              >
                {tag}
              </Box>
            ))}
          </Flex>
        )}

        {/* Description */}
        <Text
          fontFamily="body"
          fontSize="0.9375rem"
          lineHeight={1.7}
          color="brand.light"
          flex="1"
        >
          {team.description ||
            'Learn more about youth rugby opportunities with this club.'}
        </Text>

        {/* Buttons */}
        <Flex gap={3} mt="auto" pt={2} wrap="wrap">
          {team.website && (
            <Box
              as="a"
              href={team.website}
              target="_blank"
              rel="noopener noreferrer"
              display="inline-flex"
              alignItems="center"
              gap="0.375rem"
              bg="brand.highlight"
              color="brand.black"
              fontFamily="display"
              fontWeight={700}
              fontSize="0.8125rem"
              letterSpacing="0.22em"
              textTransform="uppercase"
              px="1.25rem"
              py="0.75rem"
              _hover={{ filter: 'brightness(0.93)' }}
              transition="filter 0.2s"
            >
              Visit Website
              <FiExternalLink size="0.875rem" />
            </Box>
          )}
          {team.email && (
            <Box
              as="a"
              href={`mailto:${team.email}`}
              display="inline-flex"
              alignItems="center"
              gap="0.375rem"
              border="1px solid"
              borderColor="brand.highlight"
              color="brand.highlight"
              fontFamily="display"
              fontWeight={700}
              fontSize="0.8125rem"
              letterSpacing="0.22em"
              textTransform="uppercase"
              px="1.25rem"
              py="0.75rem"
              _hover={{ bg: 'brand.highlight', color: 'brand.black' }}
              transition="all 0.2s"
            >
              <FiMail size="0.875rem" />
              Email Club
            </Box>
          )}
        </Flex>
      </Flex>
    </Grid>
  )
}

const YouthRugby = ({ youthTeams }: { youthTeams: YouthTeam[] }) => {
  return (
    <Layout
      mainBg="brand.bg"
      seo={{
        metaTitle: 'Youth Rugby | St. Louis Bombers',
        shareImage: '/static/jets_mark.jpg',
        metaDescription:
          'Discover youth rugby opportunities in the St. Louis area.',
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
            eyebrow="Grow the Game"
            heading={<>Youth Rugby in St. Louis</>}
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
        <SectionLabel>Youth Clubs</SectionLabel>

        <Flex direction="column" gap="0.875rem">
          {youthTeams?.map((team) => (
            <ClubCard key={team.id} team={team} />
          ))}
        </Flex>

        {/* CTA Strip */}
        <Box
          mt={{ base: 12, md: 16 }}
          bg="brand.darkSecondary"
          borderLeft="4px solid"
          borderColor="brand.highlight"
          borderRadius="sm"
          p={{ base: '2rem 1.625rem', md: '2.125rem 2.5rem' }}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'flex-start', md: 'center' }}
            justify="space-between"
            gap={6}
          >
            <Box>
              <Text
                fontFamily="display"
                fontWeight={700}
                fontSize={{ base: '1.375rem', md: '1.625rem' }}
                letterSpacing="0.02em"
                textTransform="uppercase"
                color="white"
                lineHeight={1.1}
              >
                Coaching or starting a side?
              </Text>
              <Text
                fontFamily="body"
                fontSize="0.875rem"
                color="brand.light"
                mt={2}
                maxW="28.75rem"
                lineHeight={1.6}
              >
                The Bombers actively support youth rugby across the region.
                Reach out and we&apos;ll point you to the right program for your
                age group.
              </Text>
            </Box>
            <Box
              as="a"
              href="/contact"
              display="inline-flex"
              alignItems="center"
              gap="0.375rem"
              bg="brand.highlight"
              color="brand.black"
              fontFamily="display"
              fontWeight={700}
              fontSize="0.8125rem"
              letterSpacing="0.22em"
              textTransform="uppercase"
              px="1.625rem"
              py="0.875rem"
              flexShrink={0}
              _hover={{ filter: 'brightness(0.93)' }}
              transition="filter 0.2s"
              whiteSpace="nowrap"
            >
              Get in Touch →
            </Box>
          </Flex>
        </Box>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const youthTeams = await fetchAPI('/youths?populate=image')

  return {
    props: {
      youthTeams: Array.isArray(youthTeams) ? youthTeams : [],
    },
  }
}

export default YouthRugby
