import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import SectionHeader from 'common/SectionHeader'
import Layout from '../../../src/common/Layout'
import CoachCard from '../../../src/components/Coach/CoachCard'
import { fetchAPI } from '../../../src/lib/api'

const Coaches = ({ coaches }) => {
  return (
    <Layout
      header={'Bombers Coaches & Staff'}
      seo={{
        metaTitle: 'Bombers Coaches & Staff',
        metaDescription: 'Meet the Bombers coaches and staff',
      }}
    >
      <Container maxW="container.xl" py={12}>
        <SectionHeader title="Coaches & Staff" />

        {/* CENTERED GRID */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing={10}
          justifyItems="center" // Ensures cards are centered in their grid cells
        >
          {coaches?.length > 0 ? (
            coaches.map((coach) => <CoachCard key={coach.id} coach={coach} />)
          ) : (
            <Heading size="md" color="gray.500" gridColumn="1/-1">
              No staff members found.
            </Heading>
          )}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const coaches = await fetchAPI('/coaches?populate=picture')

  return {
    props: { coaches },
  }
}

export default Coaches
