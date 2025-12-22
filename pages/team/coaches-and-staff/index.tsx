import { Container, SimpleGrid } from '@chakra-ui/react'
import Layout from '../../../src/common/Layout'
import CoachCard from '../../../src/components/Coach/CoachCard'
import { fetchAPI } from '../../../src/lib/api'

const Coaches = ({ coaches }) => {
  console.log(coaches)
  return (
    <Layout
      header={'Bombers Coaches & Staff'}
      seo={{
        metaTitle: 'Bombers Coaches & Staff',
        metaDescription: 'Meet the Bombers coaches and staff',
      }}
    >
      <Container maxW="container.xl" py={10}>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
          {coaches?.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
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
