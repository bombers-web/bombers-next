import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'

export const RecruitBand = () => {
  return (
    <Box
      bg="brand.dark"
      borderRadius="2xl"
      p={{ base: 8, md: 10 }}
      my={6}
      boxShadow="xl"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        gap={6}
      >
        <VStack align="flex-start" spacing={2}>
          <Text
            fontSize="xs"
            letterSpacing="widest"
            textTransform="uppercase"
            color="whiteAlpha.400"
          >
            New to the game · Returning · Curious
          </Text>
          <Heading
            size={{ base: '2xl', md: '3xl' }}
            color="brand.light"
            fontFamily="'Big Shoulders Display', sans-serif"
            lineHeight={1}
            fontWeight="black"
          >
            Lace up. We'll teach the rest.
          </Heading>
          <Text color="whiteAlpha.500" fontSize="sm" pt={1}>
            Practice is Tue & Thu · 6:30 PM · Emerson Field, Forest Park
          </Text>
        </VStack>

        <VStack
          spacing={3}
          align={{ base: 'stretch', md: 'flex-end' }}
          minW={{ md: '200px' }}
          flexShrink={0}
        >
          <NextLink href="/contact" passHref legacyBehavior>
            <Button
              as="a"
              size="lg"
              bg="brand.highlight"
              color="brand.dark"
              fontWeight="black"
              textTransform="uppercase"
              letterSpacing="wide"
              fontSize="md"
              _hover={{ bg: 'yellow.200' }}
              w={{ base: 'full', md: 'auto' }}
            >
              Join the Squad →
            </Button>
          </NextLink>
          <NextLink href="/pay?tab=donations" passHref legacyBehavior>
            <Link
              as="a"
              color="whiteAlpha.400"
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
              textAlign={{ base: 'center', md: 'right' }}
              _hover={{ color: 'brand.highlight', textDecoration: 'none' }}
            >
              Support the Club →
            </Link>
          </NextLink>
        </VStack>
      </Flex>
    </Box>
  )
}
