import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import Layout from '../../../src/common/Layout'
import SectionHeading from '../../../src/common/SectionHeading'
import SectionLabel from '../../../src/common/SectionLabel'
import PersonCard from '../../../src/common/PersonCard'
import { fetchAPI } from '../../../src/lib/api'

type BoardMember = {
  id: string
  first_name: string
  last_name: string
  position: string
  email?: string
  photo?: { url: string; alternativeText?: string; name?: string }
}

const Board = ({ members }: { members: BoardMember[] }) => {
  return (
    <Layout
      mainBg="brand.bg"
      seo={{
        metaTitle: 'Executive Board | St. Louis Bombers',
        metaDescription:
          'Meet the leadership team behind the St. Louis Bombers Rugby Football Club.',
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
            eyebrow="Club Leadership"
            heading={<>Executive Board</>}
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
        <SectionLabel>Board Members</SectionLabel>

        {members?.length > 0 ? (
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            }}
            gap={{ base: '0.875rem', md: '1rem' }}
          >
            {members.map((member) => (
              <PersonCard
                key={member.id}
                name={`${member.first_name} ${member.last_name || ''}`.trim()}
                role={member.position}
                email={member.email}
                image={member.photo}
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
              No board members listed
            </Text>
          </Flex>
        )}
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const members = (await fetchAPI('/board-members?populate=photo')) || []
  return {
    props: { members },
    revalidate: 86400,
  }
}

export default Board
