import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import Layout from '../../../src/common/Layout'
import SectionHeading from '../../../src/common/SectionHeading'
import SectionLabel from '../../../src/common/SectionLabel'
import PersonCard from '../../../src/common/PersonCard'
import { fetchAPI } from '../../../src/lib/api'

type Coach = {
  id: string
  first_name: string
  last_name?: string
  position: string
  email?: string
  picture?: { url: string; alternativeText?: string; name?: string }
  photo?: { url: string; alternativeText?: string; name?: string }
}

const Coaches = ({ coaches }: { coaches: Coach[] }) => {
  return (
    <Layout
      mainBg="brand.bg"
      seo={{
        metaTitle: 'Coaches & Staff | St. Louis Bombers',
        metaDescription:
          'Meet the coaches and staff of the St. Louis Bombers Rugby Football Club.',
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
            eyebrow="The Staff"
            heading={<>Coaches</>}
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
        <SectionLabel>Coaching Staff</SectionLabel>

        {coaches?.length > 0 ? (
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={{ base: '0.875rem', md: '1rem' }}
          >
            {coaches.map((coach) => (
              <PersonCard
                key={coach.id}
                name={`${coach.first_name} ${coach.last_name || ''}`.trim()}
                role={coach.position}
                email={coach.email}
                image={coach.picture ?? coach.photo}
              />
            ))}
          </Grid>
        ) : (
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
              No staff members listed
            </Text>
          </Flex>
        )}
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const coaches = await fetchAPI('/coaches?populate=picture')

  return {
    props: { coaches: Array.isArray(coaches) ? coaches : [] },
    revalidate: 86400,
  }
}

export default Coaches
