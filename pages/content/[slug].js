/* eslint-disable no-unused-vars */
import {
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  Avatar,
  HStack,
  VStack,
  Container,
  Center,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'
import Mdx from 'src/common/Mdx'
import Layout from '../../src/common/Layout'
import Pic from '../../src/common/Pic'
import { fetchAPI } from '../../src/lib/api'

const Content = ({ content }) => {
  const router = useRouter()
  const imageUrl = content?.image

  if (router.isFallback) {
    return <Center p={20}>Loading...</Center>
  }

  const shareUrl = `${process.env.HOST_URL || 'http://localhost:3000'}${
    router.asPath
  }`

  return (
    <Layout
      cover={{ url: imageUrl, alternativeText: content?.description }}
      seo={{ metaTitle: content?.title, content: true }}
      mainBg="white"
    >
      <Box bg="white" pt={{ base: '30px', md: '50px' }} pb="30px">
        <Container maxW="850px">
          <VStack align="center" textAlign="center">
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="blue.500"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              {content?.category?.name || 'Article'}
            </Text>

            <Heading
              as="h1"
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="700"
              lineHeight="tight"
              maxW="700px"
            >
              {content?.title}
            </Heading>

            <Text fontSize="md" color="gray.500" maxW="600px" lineHeight="base">
              {content?.description}
            </Text>

            <HStack
              spacing={6}
              py={2}
              w="100%"
              justify="center"
              divider={
                <Box borderLeft="1px solid" borderColor="gray.200" h="20px" />
              }
            >
              {/* Author Info */}
              <HStack spacing={2}>
                <Avatar size="xs" src={content?.writer?.picture?.url} />
                <Text fontSize="sm" fontWeight="medium">
                  {content?.writer?.name || 'Anonymous'}
                </Text>
              </HStack>

              {/* Date */}
              <Text fontSize="sm" color="gray.400">
                {content?.publishedAt &&
                  format(new Date(content.publishedAt), 'MMM dd, yyyy')}
              </Text>

              {/* Compact Socials */}
              <HStack spacing={3}>
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon size={24} round />
                </WhatsappShareButton>
              </HStack>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Main Image - Now fits more tightly to the header */}
      <Container maxW="1000px" mb="10">
        {content?.image && (
          <Box borderRadius="lg" overflow="hidden">
            <Pic
              image={content.image}
              objectFit="cover"
              style={{ width: '100%', height: 'auto', maxHeight: '500px' }}
            />
          </Box>
        )}
      </Container>

      {/* Article Content */}
      <Box bg="white" pb="80px">
        <Container maxW="750px">
          <Box
            className="article-body"
            fontSize="18px"
            lineHeight="1.75"
            color="gray.800"
            sx={{
              p: { marginBottom: '1.25rem' },
              h2: {
                marginTop: '2rem',
                marginBottom: '0.75rem',
                fontWeight: 'bold',
                fontSize: 'xl',
              },
            }}
          >
            <Mdx>{content?.content}</Mdx>
          </Box>
        </Container>
      </Box>
    </Layout>
  )
}

export async function getStaticPaths() {
  const contents = (await fetchAPI('/contents?populate=*')) || []
  return {
    paths: contents.map((content) => ({
      params: {
        slug: content?.slug || '2024-champs',
      },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const [content] =
    (await fetchAPI(
      `/contents?populate[0]=writer.picture&populate[1]=image&sort[0]=published:desc&filters[slug][$eq]=${encodeURIComponent(
        params.slug,
      )}`,
    )) || {}
  return {
    props: { content },
    // refetch every 2 weeks
    revalidate: 1209600,
  }
}

export default Content
