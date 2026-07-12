import {
  Badge,
  Box,
  Flex,
  LinkBox,
  Text,
  VStack,
  HStack,
  Avatar,
} from '@chakra-ui/react'
import { toLower } from 'lodash'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

const ContentCard = ({ content }) => {
  const contentId = content?.uid ? toLower(content.uid) : toLower(content?.id)
  const link = `/content/${contentId}`
  const imageUrl = content?.image?.url
  const title = content?.title || 'Story'

  return (
    <Link href={link} style={{ textDecoration: 'none' }}>
      <LinkBox
        as="article"
        role="group"
        transition="all 0.3s cubic-bezier(.25,.8,.25,1)"
        m={4}
        maxW="1000px"
        bg="white"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="sm"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: 'xl',
        }}
      >
        <Flex direction={['column', 'row']} minH="280px">
          {/* IMAGE SECTION */}
          <Box
            position="relative"
            flexShrink={0}
            w={['100%', '350px']}
            minH={['200px', 'auto']}
            bg="brand.dark"
            overflow="hidden"
          >
            <Box
              position="absolute"
              inset={0}
              transition="transform 0.5s ease"
              _groupHover={{ transform: 'scale(1.02)' }}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 30em) 100vw, 350px"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <Flex align="center" justify="center" w="full" h="full">
                  <Image
                    src="/static/logos/white_logo.png"
                    alt=""
                    width={110}
                    height={110}
                    style={{ objectFit: 'contain', opacity: 0.4 }}
                  />
                </Flex>
              )}
            </Box>
          </Box>

          {/* CONTENT SECTION */}
          <Flex direction="column" p={6} flex="1" justify="space-between">
            <VStack align="start" spacing={3}>
              <HStack w="100%" justify="space-between">
                <Badge
                  px={2}
                  py={1}
                  borderRadius="full"
                  colorScheme="messenger"
                  variant="subtle"
                  fontSize="xs"
                >
                  {content?.category?.name || 'Story'}
                </Badge>
                <Text fontSize="xs" color="gray.400" fontWeight="bold">
                  {content?.published &&
                    format(new Date(content.published), 'MMM dd, yyyy')}
                </Text>
              </HStack>

              <Text
                fontSize="2xl"
                fontWeight="bold"
                color="gray.800"
                lineHeight="1.2"
                _groupHover={{ color: 'blue.600' }}
                noOfLines={2}
              >
                {content?.title}
              </Text>

              {content?.category?.name === 'Events' && (
                <Box
                  color="gray.600"
                  fontSize="sm"
                  noOfLines={3}
                  lineHeight="relaxed"
                >
                  <ReactMarkdown>{content?.description}</ReactMarkdown>
                </Box>
              )}
            </VStack>

            {/* AUTHOR FOOTER */}
            <HStack mt={6} spacing={3}>
              <Avatar
                size="xs"
                name={content?.writer?.name}
                src={content?.writer?.picture?.url}
              />
              <VStack align="start" spacing={0}>
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  {content?.writer?.name || 'Anonymous'}
                </Text>
              </VStack>
            </HStack>
          </Flex>
        </Flex>
      </LinkBox>
    </Link>
  )
}

export default ContentCard
