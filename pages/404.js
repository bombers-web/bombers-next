import { Box, Button, Container, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FiHome } from 'react-icons/fi'
import Layout from '../src/common/Layout'

const Fof = () => {
  return (
    <Layout
      seo={{
        metaTitle: 'Oops! 404 Error',
      }}
      header="Page Not Found"
    >
      <Box bg="brand.light" minH="80vh" py={20}>
        <Container maxW="container.md">
          <VStack spacing={8} textAlign="center">
            <VStack spacing={2}>
              <Text
                color="brand.dark"
                fontWeight="900"
                fontSize="6xl"
                lineHeight="1"
                textTransform="uppercase"
              >
                404
              </Text>
              <Text
                color="brand.dark"
                fontWeight="bold"
                fontSize="2xl"
                textTransform="uppercase"
                letterSpacing="widest"
              >
                This page doesn't exist.
              </Text>
            </VStack>

            <Box
              borderRadius="2xl"
              overflow="hidden"
              border="4px solid"
              borderColor="whiteAlpha.200"
              boxShadow="2xl"
              position="relative"
            >
              <Image
                alt="404 error"
                src="/static/hinson_404.JPG"
                quality={90}
                width={600}
                height={600}
                style={{ objectFit: 'cover' }}
              />
              <Box />
            </Box>
            <VStack spacing={6}>
              <Link href="/" passHref>
                <Button
                  size="lg"
                  colorScheme="yellow"
                  bg="yellow.400"
                  color="brand.dark"
                  leftIcon={<FiHome />}
                  _hover={{ transform: 'scale(1.05)', bg: 'yellow.300' }}
                  transition="all 0.2s"
                  px={10}
                >
                  Back to Home
                </Button>
              </Link>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </Layout>
  )
}

export default Fof
