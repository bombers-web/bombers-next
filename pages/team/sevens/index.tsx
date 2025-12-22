import { ArrowForwardIcon, CheckCircleIcon, StarIcon } from '@chakra-ui/icons'
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import Layout from '../../../src/common/Layout'

const SevensRecruitment = () => {
  return (
    <Layout
      header="St. Louis Bombers 7s Program"
      seo={{
        metaTitle: 'Join the Bombers 7s | Recruitment & Information',
        metaDescription:
          'Elite summer 7s program for athletes looking to compete at the national level.',
      }}
    >
      <Box bg="white" pt={{ base: '30px', md: '50px' }} pb="30px">
        <Container maxW="850px">
          <VStack spacing={4} align="center" textAlign="center">
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="brand.highlight"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              National 7's
            </Text>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="900"
            >
              SPEED. SKILL. SACRIFICE.
            </Heading>
            <Text fontSize="lg" color="gray.500" maxW="600px">
              Join a legacy of national contenders. We are looking for elite
              athletes to represent the Bombers on the Summer 7s Circuit.
            </Text>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              bg="brand.gold"
              size="lg"
              mt={4}
              borderRadius="full"
              px={10}
            >
              Contact Us!
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* 2. PRIMARY ACTION PHOTO */}
      <Container maxW="1100px" mb="20">
        <AspectRatio ratio={16 / 7}>
          <Box
            borderRadius="xl"
            overflow="hidden"
            bg="gray.100"
            boxShadow="inner"
          >
            {/* Replace src with your high-action team photo */}
            <Image
              src="/images/7s-action-hero.jpg"
              fallbackSrc="https://via.placeholder.com/1200x600?text=High+Action+Team+Photo"
              objectFit="cover"
              w="100%"
            />
          </Box>
        </AspectRatio>
      </Container>

      {/* 3. PAST ACCOMPLISHMENTS (The Pedigree) */}
      <Box bg="gray.50" py={20}>
        <Container maxW="container.lg">
          <HStack mb={10} justify="center">
            <StarIcon color="brand.highlight" />
            <Heading size="lg" textTransform="uppercase">
              Past Accomplishments
            </Heading>
            <StarIcon color="brand.highlight" />
          </HStack>

          <SimpleGrid columns={[1, 1, 3]} spacing={10}>
            <VStack
              align="start"
              p={6}
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
            >
              <Heading size="md" color="brand.medium">
                2024 Nationals
              </Heading>
              <Divider
                borderColor="brand.highlight"
                borderBottomWidth="2px"
                w="50px"
              />
              <Text fontSize="sm" color="gray.600">
                Top 8 finish at the USA Rugby Club 7s National Championship in
                Cottage Grove, WI.
              </Text>
            </VStack>

            <VStack
              align="start"
              p={6}
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
            >
              <Heading size="md" color="brand.medium">
                Regional Dominance
              </Heading>
              <Divider
                borderColor="brand.highlight"
                borderBottomWidth="2px"
                w="50px"
              />
              <Text fontSize="sm" color="gray.600">
                Back-to-back Mid-America Union 7s Series Champions (2023, 2024).
              </Text>
            </VStack>

            <VStack
              align="start"
              p={6}
              bg="white"
              borderRadius="lg"
              boxShadow="sm"
            >
              <Heading size="md" color="brand.medium">
                Player Pathway
              </Heading>
              <Divider
                borderColor="brand.highlight"
                borderBottomWidth="2px"
                w="50px"
              />
              <Text fontSize="sm" color="gray.600">
                Developed 4 players currently competing in Major League Rugby
                (MLR).
              </Text>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* 4. PROGRAM DETAILS & SECONDARY PHOTO */}
      <Container maxW="container.lg" py={20}>
        <SimpleGrid columns={[1, 2]} spacing={16}>
          <VStack align="start" spacing={6}>
            <Heading size="lg">The 7s Program</Heading>
            <Text color="gray.600">
              Our 7s program is designed for the modern rugby athlete. We focus
              on high-speed tactical awareness, individual skill precision, and
              peak aerobic capacity.
            </Text>
            <List spacing={3}>
              <ListItem fontWeight="bold">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Training: Tues/Thurs @ 6:30 PM
              </ListItem>
              <ListItem fontWeight="bold">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Dedicated Strength & Speed Coach
              </ListItem>
              <ListItem fontWeight="bold">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                Travel to 4+ Regional Qualifiers
              </ListItem>
            </List>
          </VStack>

          {/* SECONDARY PHOTO: TRAINING OR CELEBRATION */}
          <Box borderRadius="2xl" overflow="hidden" boxShadow="2xl">
            <AspectRatio ratio={1}>
              <Image
                src="/images/7s-training.jpg"
                fallbackSrc="https://via.placeholder.com/600x600?text=Training+or+Team+Photo"
                objectFit="cover"
              />
            </AspectRatio>
          </Box>
        </SimpleGrid>
      </Container>

      {/* 5. FINAL RECRUIT CALL-TO-ACTION */}
      <Box bg="brand.medium" py={16} color="white">
        <Container maxW="800px" textAlign="center">
          <Heading size="xl" mb={4}>
            Ready to make the roster?
          </Heading>
          <Text fontSize="lg" mb={8} opacity={0.9}>
            Trialists are welcome throughout May. Final travel squads are
            selected based on performance and commitment.
          </Text>
          <Button
            size="lg"
            variant="outline"
            color="white"
            _hover={{ bg: 'white', color: 'brand.medium' }}
            borderRadius="full"
          >
            FILL OUT PLAYER INTEREST FORM
          </Button>
        </Container>
      </Box>
    </Layout>
  )
}

export default SevensRecruitment
