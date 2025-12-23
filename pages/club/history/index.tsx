import { Box, Container, Divider, Heading, VStack } from '@chakra-ui/react'
import SectionHeader from 'common/SectionHeader'
import Layout from '../../../src/common/Layout'
import Mdx from '../../../src/common/Mdx'
import PageContent from '../../../src/common/PageContent'
import { fetchAPI } from '../../../src/lib/api'

const ClubHistory = ({ history }) => {
  return (
    <Layout
      header="Club History"
      cover={{
        url: '/static/legends_3.jpeg',
        alternativeText: 'Bombers legends',
      }}
      seo={{
        metaTitle: 'Our History',
        shareImage: '/static/legends_3.jpeg',
        metaDescription: 'In the St. Louis Rugby Scene since 1962',
      }}
    >
      <Box bg="brand.light" minH="100vh" py={12}>
        <Container maxW="container.lg">
          {/* Reusable Header Component */}
          <SectionHeader title="Club History" color="brand.black" />

          <PageContent>
            <VStack spacing={10} align="stretch" mt={8}>
              {history?.section?.map((section, idx) => {
                return (
                  <Box
                    key={idx}
                    p={{ base: 8, md: 12 }} // Larger padding for "Bigger" feel
                    bg="brand.white"
                    borderRadius="xl"
                    boxShadow="xl"
                    border="1px solid"
                    borderColor="gray.100"
                  >
                    <Box mb={8} textAlign={{ base: 'center', md: 'left' }}>
                      <Heading
                        size="2xl"
                        color="brand.black"
                        mb={2}
                        textTransform="uppercase"
                        letterSpacing="tight"
                      >
                        {section.title}
                      </Heading>
                      {section.subtitle && (
                        <Heading
                          size="md"
                          color="brand.medium"
                          fontWeight="semibold"
                          letterSpacing="wide"
                        >
                          {section.subtitle}
                        </Heading>
                      )}
                      <Divider
                        mt={4}
                        borderColor="yellow.400"
                        borderBottomWidth="3px"
                        w="60px"
                      />
                    </Box>

                    <Box
                      color="brand.black"
                      fontSize="lg"
                      lineHeight="1.8"
                      sx={{
                        p: { marginBottom: '1.5rem' },
                        'p:last-child': { marginBottom: 0 },
                        'ul, ol': {
                          marginLeft: '1.5rem',
                          marginBottom: '1.5rem',
                        },
                        li: { marginBottom: '0.5rem' },
                        strong: { color: 'brand.black', fontWeight: 'bold' },
                      }}
                    >
                      <Mdx>{section.content}</Mdx>
                    </Box>
                  </Box>
                )
              })}
            </VStack>
          </PageContent>
        </Container>
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const [history] = await Promise.all([fetchAPI('/history?populate=*')])

  return {
    props: {
      history,
    },
    revalidate: 86400,
  }
}

export default ClubHistory
