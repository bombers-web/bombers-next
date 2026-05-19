import React from 'react'
import { Box, Flex, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import Layout from '../src/common/Layout'
import ContactForm from '../src/components/Contact/ContactForm'
import SectionHeading from '../src/common/SectionHeading'

const Contact = () => {
  return (
    <Layout
      seo={{ metaTitle: 'Contact Us', metaDescription: 'Contact the club' }}
      mainBg="brand.bg"
    >
      {/* Hero Strip */}
      <Box
        bg="brand.black"
        color="white"
        px={{ base: '1.75rem', md: '3.75rem' }}
        py={{ base: '3.25rem', md: '5rem' }}
        position="relative"
        overflow="hidden"
      >
        <Box maxW="1280px" mx="auto" position="relative">
          <SectionHeading
            eyebrow="Get in Touch"
            heading={<>Join the bombers community!</>}
            eyebrowColor="brand.highlight"
            headingColor="white"
            as="h1"
            headingSize="clamp(48px, 5.5vw, 72px)"
            mb="1rem"
          />
        </Box>
      </Box>

      {/* Main Body */}
      <Box
        px={{ base: '1.75rem', md: '3.75rem' }}
        pt={{ base: '3rem', md: '4rem' }}
        pb={{ base: '4rem', md: '5.5rem' }}
      >
        <Grid
          maxW="1280px"
          mx="auto"
          templateColumns={{ base: '1fr', lg: '1.3fr 1fr' }}
          gap="2.5rem"
        >
          {/* Left: Form */}
          <GridItem>
            <ContactForm />
          </GridItem>

          {/* Right: Sidebar */}
          <GridItem>
            <Stack spacing="1.25rem">
              {/* Practice Card */}
              <Box
                bg="brand.mediumSecondary"
                color="white"
                borderRadius="0.25rem"
                overflow="hidden"
              >
                <Box
                  px="1.75rem"
                  py="1.5rem"
                  borderBottom="2px solid"
                  borderColor="brand.highlight"
                >
                  <SectionHeading
                    eyebrow="Come to a Practice"
                    heading="No experience needed"
                    eyebrowColor="brand.highlight"
                    headingColor="white"
                    headingSize="1.625rem"
                  />
                </Box>
                <Box px="1.75rem" py="1.375rem">
                  <Stack spacing="1rem">
                    <Flex gap="0.875rem" align="flex-start">
                      <Flex
                        w="2.125rem"
                        h="2.125rem"
                        bg="#1a1a1a"
                        borderRadius="0.25rem"
                        align="center"
                        justify="center"
                        flexShrink={0}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="17"
                          height="17"
                          fill="none"
                          stroke="#D6C37F"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                      </Flex>
                      <Box>
                        <Text fontWeight="600" fontSize="0.875rem">
                          Tuesdays &amp; Thursdays · 6:30 PM
                        </Text>
                        <Text
                          fontSize="0.8125rem"
                          color="brand.meta"
                          mt="0.1875rem"
                        >
                          Year-round. All Skill Levels Welcome!
                        </Text>
                      </Box>
                    </Flex>
                    <Flex gap="0.875rem" align="flex-start">
                      <Flex
                        w="2.125rem"
                        h="2.125rem"
                        bg="#1a1a1a"
                        borderRadius="0.25rem"
                        align="center"
                        justify="center"
                        flexShrink={0}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="17"
                          height="17"
                          fill="none"
                          stroke="#D6C37F"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22s7-7 7-13a7 7 0 1 0-14 0c0 6 7 13 7 13z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </svg>
                      </Flex>
                      <Box>
                        <Text fontWeight="600" fontSize="0.875rem">
                          Emerson Central Fields
                        </Text>
                        <Text
                          fontSize="0.8125rem"
                          color="brand.meta"
                          mt="0.1875rem"
                        >
                          5265 Wells Dr, Forest Park, St. Louis
                        </Text>
                      </Box>
                    </Flex>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </GridItem>
        </Grid>
      </Box>
    </Layout>
  )
}

export default Contact
