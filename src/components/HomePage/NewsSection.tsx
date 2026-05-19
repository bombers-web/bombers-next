import { Box, Flex, Grid, Heading, Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { formatDistance } from 'date-fns'
import { Content } from '../../types/newsTypes'

type Props = {
  posts: Content[]
}

const NewsSection = ({ posts }: Props) => {
  if (!posts || posts.length === 0) return null

  return (
    <Box
      bg="brand.dark"
      w="full"
      py={{ base: 14, md: 20 }}
      px={{ base: 4, md: 8 }}
      color="white"
    >
      <Box maxW="1280px" mx="auto">
        <Flex
          align="baseline"
          justify="space-between"
          mb={10}
          flexWrap="wrap"
          gap={4}
        >
          <Box>
            <Text
              fontFamily="display"
              fontWeight="bold"
              fontSize="sm"
              letterSpacing="widest"
              color="brand.highlight"
              textTransform="uppercase"
              mb={1}
            >
              The Latest
            </Text>
            <Heading
              fontFamily="display"
              fontWeight="extrabold"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              letterSpacing="tight"
              textTransform="uppercase"
              lineHeight="none"
              color="white"
              margin={0}
            >
              Recent News
            </Heading>
          </Box>
          <NextLink href="/contents" passHref legacyBehavior>
            <Link
              fontFamily="display"
              fontWeight="bold"
              fontSize="sm"
              letterSpacing="widest"
              textTransform="uppercase"
              color="brand.highlight"
              textDecoration="none"
              _hover={{ textDecoration: 'none', opacity: 0.7 }}
            >
              All Stories →
            </Link>
          </NextLink>
        </Flex>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={5}>
          {posts.slice(0, 3).map((post) => (
            <NextLink
              key={post.uid}
              href={`/contents/${post.category?.name}/${post.uid}`}
              passHref
              legacyBehavior
            >
              <Link
                display="flex"
                flexDirection="column"
                bg="brand.mediumSecondary"
                borderRadius="sm"
                overflow="hidden"
                textDecoration="none"
                color="white"
                _hover={{ textDecoration: 'none', opacity: 0.9 }}
                transition="opacity 0.2s"
              >
                {/* Image */}
                <Box
                  h="220px"
                  background={
                    post.image?.url
                      ? undefined
                      : 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)'
                  }
                  backgroundImage={
                    post.image?.url ? `url(${post.image.url})` : undefined
                  }
                  backgroundSize="cover"
                  backgroundPosition="center"
                  position="relative"
                  flexShrink={0}
                >
                  {!post.image?.url && (
                    <Text
                      position="absolute"
                      bottom={3}
                      left={4}
                      fontFamily="display"
                      fontSize="xs"
                      letterSpacing="widest"
                      color="whiteAlpha.400"
                      textTransform="uppercase"
                    >
                      [ {post.category?.name ?? 'News'} ]
                    </Text>
                  )}
                </Box>

                {/* Content */}
                <Flex direction="column" p={6} flex={1} gap={3}>
                  <Flex align="center" gap={3}>
                    <Text
                      fontFamily="display"
                      fontWeight="bold"
                      fontSize="xs"
                      letterSpacing="widest"
                      textTransform="uppercase"
                      color="brand.highlight"
                      border="1px solid"
                      borderColor="brand.highlight"
                      px={2}
                      py="2px"
                    >
                      {post.category?.name ?? 'News'}
                    </Text>
                    <Text
                      fontFamily="body"
                      fontSize="xs"
                      color="whiteAlpha.400"
                    >
                      {formatDistance(new Date(post.publishedAt), new Date(), {
                        addSuffix: true,
                      })}
                    </Text>
                  </Flex>
                  <Heading
                    fontFamily="display"
                    fontWeight="extrabold"
                    fontSize="xl"
                    letterSpacing="tight"
                    textTransform="uppercase"
                    lineHeight="short"
                    color="white"
                    margin={0}
                  >
                    {post.title}
                  </Heading>
                  <Text
                    fontFamily="body"
                    fontSize="sm"
                    color="whiteAlpha.500"
                    lineHeight="tall"
                    flex={1}
                    margin={0}
                  >
                    {post.description}
                  </Text>
                  <Text
                    fontFamily="display"
                    fontWeight="bold"
                    fontSize="xs"
                    letterSpacing="widest"
                    textTransform="uppercase"
                    color="white"
                    borderBottom="1px solid"
                    borderColor="brand.highlight"
                    pb="2px"
                    alignSelf="flex-start"
                    mt={1}
                  >
                    Read story →
                  </Text>
                </Flex>
              </Link>
            </NextLink>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default NewsSection
