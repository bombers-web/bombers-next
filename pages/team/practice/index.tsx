import { Box, VStack } from '@chakra-ui/react'
import Layout from '../../../src/common/Layout'
import { fetchAPI } from '../../../src/lib/api'
import { Practice } from '../../../src/components/Practice/Practice'
import Section from 'components/Section'

const Practices = ({ practice }) => {
  return (
    <Layout
      header="Practice Schedule"
      seo={{
        metaTitle: 'Practice Locations',
        shareImage: '/static/willmore_park.jpg',
        metaDescription: 'Join us Tuesdays and Thursdays for practice.',
      }}
    >
      <Box bg="gray.50" minH="100vh" py={12}>
        <Section
          bg={'brand.light'}
          padding="0px"
          style={{ display: 'flex', justifyContent: 'center' }}
          align="center"
        >
          <VStack spacing={6} w="full" maxW="800px" mx="auto" px={4}>
            <Practice practices={practice} />
          </VStack>
        </Section>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const practice = await fetchAPI('/practices?populate=*')
  return {
    props: {
      practice: Array.isArray(practice) ? practice : [],
    },
    revalidate: 86400,
  }
}

export default Practices
