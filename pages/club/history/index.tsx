import { AspectRatio, Box, Flex, Grid, Text } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import Layout from '../../../src/common/Layout'
import SectionHeading from '../../../src/common/SectionHeading'
import SectionLabel from '../../../src/common/SectionLabel'
import Pic from '../../../src/common/Pic'
import { fetchAPI } from '../../../src/lib/api'

type SectionLink = { display: string; url: string; card?: boolean }
type HistorySection = {
  title?: string
  subtitle?: string
  content?: string
  display?: boolean
  image?: { url: string; alternativeText?: string; name?: string }
  imagePosition?: string
  cards?: boolean
  links?: SectionLink[]
}

const STATS = [
  { num: '1962', label: 'Founded in\nSt. Louis' },
  { num: '60+', label: 'Years on\nthe pitch' },
  { num: '2024', label: 'USA Rugby\nNational Champion' },
  { num: '2001', label: 'USA Western Club\nChampionship' },
]

function PhotoSlot({ caption }: { caption?: string }) {
  return (
    <Box w="100%" overflow="hidden">
      <AspectRatio ratio={4 / 3}>
        <Box bg="#e6e3da" borderRadius="sm">
          <Text
            fontFamily="display"
            fontWeight={500}
            fontSize="0.6875rem"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="brand.meta"
            textAlign="center"
            px={4}
          >
            Photo
          </Text>
        </Box>
      </AspectRatio>
      {caption && (
        <Text
          fontFamily="display"
          fontWeight={500}
          fontSize="0.6875rem"
          letterSpacing="0.2em"
          textTransform="uppercase"
          color="brand.meta"
          mt={2}
        >
          {caption}
        </Text>
      )}
    </Box>
  )
}

const docMd = {
  p: ({ children }: any) => (
    <Text
      fontFamily="body"
      fontSize="0.9375rem"
      lineHeight={1.7}
      color="brand.light"
      mt={5}
    >
      {children}
    </Text>
  ),
  strong: ({ children }: any) => (
    <Text as="strong" fontWeight="bold" color="inherit">
      {children}
    </Text>
  ),
}

const eraMd = {
  p: ({ children }: any) => (
    <Text
      fontFamily="body"
      fontSize="0.96875rem"
      lineHeight={1.8}
      color="#3a3a3a"
      mt="1.125rem"
    >
      {children}
    </Text>
  ),
  blockquote: ({ children }: any) => (
    <Box
      mt="1.875rem"
      mb={2}
      pt={1}
      pb={1}
      pl="1.625rem"
      borderLeft="4px solid"
      borderColor="brand.highlight"
    >
      {children}
    </Box>
  ),
  strong: ({ children }: any) => (
    <Text as="strong" fontWeight="bold" color="inherit">
      {children}
    </Text>
  ),
}

function DocCard({ section }: { section: HistorySection }) {
  const link = section.links?.[0]

  return (
    <Grid
      templateColumns={{ base: '1fr', md: '1fr 1.05fr' }}
      bg="brand.mediumSecondary"
      borderRadius="sm"
      overflow="hidden"
    >
      {/* Poster */}
      <Box
        position="relative"
        bg="#1a1a1a"
        minH={{ base: '16.25rem', md: '23.75rem' }}
      >
        {section.image?.url && (
          <Box position="absolute" inset={0} overflow="hidden">
            <Pic
              image={section.image}
              fit="cover"
              style={{ width: '100%', height: '100%' }}
            />
          </Box>
        )}
        {/* Play badge */}
        <Flex
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          w="4.75rem"
          h="4.75rem"
          borderRadius="full"
          bg="rgba(214,195,127,0.92)"
          align="center"
          justify="center"
          zIndex={1}
        >
          <Box
            as="svg"
            // @ts-ignore
            viewBox="0 0 24 24"
            w={6}
            h={6}
            fill="#1a1a1a"
          >
            <path d="M8 5v14l11-7z" />
          </Box>
        </Flex>
        {/* Tag */}
        <Box
          position="absolute"
          top={4}
          left={4}
          bg="brand.highlight"
          color="brand.black"
          fontFamily="display"
          fontWeight={700}
          fontSize="0.6875rem"
          letterSpacing="0.28em"
          textTransform="uppercase"
          px={3}
          py="0.375rem"
          zIndex={1}
        >
          Documentary
        </Box>
      </Box>

      {/* Body */}
      <Flex direction="column" p={{ base: 8, md: 11 }}>
        <Text
          fontFamily="display"
          fontWeight={600}
          fontSize="0.75rem"
          letterSpacing="0.4em"
          textTransform="uppercase"
          color="brand.highlight"
        >
          St. Louis Bombers Documentary
        </Text>
        {section.title && (
          <Text
            fontFamily="display"
            fontWeight={700}
            fontSize={{ base: '2.5rem', md: '2.75rem' }}
            letterSpacing="0.02em"
            textTransform="uppercase"
            color="white"
            lineHeight={0.95}
            mt="0.625rem"
          >
            {section.title}
          </Text>
        )}
        {section.subtitle && (
          <Text
            fontFamily="display"
            fontWeight={500}
            fontSize="0.8125rem"
            letterSpacing="0.18em"
            textTransform="uppercase"
            color="brand.meta"
            mt="0.875rem"
          >
            {section.subtitle}
          </Text>
        )}
        {section.content && (
          <Box>
            <ReactMarkdown components={docMd}>{section.content}</ReactMarkdown>
          </Box>
        )}
        {link && (
          <Box mt="auto" pt={7}>
            <Box
              as="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              display="inline-flex"
              alignItems="center"
              gap="0.625rem"
              bg="brand.highlight"
              color="brand.black"
              fontFamily="display"
              fontWeight={700}
              fontSize="0.8125rem"
              letterSpacing="0.22em"
              textTransform="uppercase"
              px="1.625rem"
              py="0.875rem"
              _hover={{ filter: 'brightness(0.93)' }}
            >
              {link.display}
              <Box
                as="svg"
                // @ts-ignore
                viewBox="0 0 24 24"
                w="0.875rem"
                h="0.875rem"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M8 7h9v9" />
              </Box>
            </Box>
          </Box>
        )}
      </Flex>
    </Grid>
  )
}

function EraSection({
  section,
  mt,
  showChampionCallout,
}: {
  section: HistorySection
  mt?: number | string
  showChampionCallout?: boolean
  showEagles?: boolean
}) {
  const imageLeft =
    section.imagePosition === 'left' || section.imagePosition === 'start'

  const textCol = (
    <Box minW={0}>
      {section.subtitle && (
        <Text
          fontFamily="display"
          fontWeight={700}
          fontSize={{ base: '2.5rem', md: '3.625rem' }}
          letterSpacing="0.01em"
          textTransform="uppercase"
          lineHeight={0.95}
          color="brand.dark"
        >
          {section.subtitle}
        </Text>
      )}
      {section.content && (
        <Box mt={section.subtitle ? '1.375rem' : 0}>
          <ReactMarkdown components={eraMd}>{section.content}</ReactMarkdown>
        </Box>
      )}
    </Box>
  )

  const mediaCol = (
    <Box
      position={{ md: 'sticky' }}
      top={{ md: '5.25rem' }}
      minW={0}
      overflow="hidden"
    >
      {section.image?.url ? (
        <AspectRatio ratio={4 / 3}>
          <Pic image={section.image} fit="cover" />
        </AspectRatio>
      ) : (
        <PhotoSlot />
      )}
      {showChampionCallout && (
        <Box
          bg="brand.mediumSecondary"
          borderRadius="sm"
          p={{ base: 6, md: 7 }}
          borderLeft="4px solid"
          borderColor="brand.highlight"
          mt={4}
        >
          <Text
            fontFamily="display"
            fontWeight={600}
            fontSize="0.6875rem"
            letterSpacing="0.32em"
            textTransform="uppercase"
            color="brand.highlight"
          >
            National Champions
          </Text>
          <Text
            fontFamily="display"
            fontWeight={700}
            fontSize="1.375rem"
            letterSpacing="0.03em"
            textTransform="uppercase"
            color="white"
            mt={2}
            lineHeight={1.05}
          >
            2024 USA Rugby
            <br />
            National Title
          </Text>
          <Text
            fontFamily="body"
            fontSize="0.84375rem"
            lineHeight={1.6}
            color="brand.light"
            mt="0.625rem"
          >
            The crowning achievement of a winning culture built over sixty years
            — now one of the country&apos;s premier Division I clubs.
          </Text>
        </Box>
      )}
    </Box>
  )

  return (
    <>
      {section.title && <SectionLabel mt={mt}>{section.title}</SectionLabel>}
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={{ base: 6, md: 11 }}
        alignItems="start"
      >
        {imageLeft ? (
          <>
            <Box order={{ base: 2, md: 1 }} minW={0}>
              {mediaCol}
            </Box>
            <Box order={{ base: 1, md: 2 }} minW={0}>
              {textCol}
            </Box>
          </>
        ) : (
          <>
            {textCol}
            {mediaCol}
          </>
        )}
      </Grid>
    </>
  )
}

const ClubHistory = ({
  history,
}: {
  history: { section?: HistorySection[] }
}) => {
  const allSections = (history?.section ?? []).filter(
    (s) => s.display !== false,
  )
  const docSection = allSections.find((s) => s.cards === true)
  const eraSections = allSections.filter((s) => !s.cards)

  return (
    <Layout
      mainBg="brand.bg"
      seo={{
        metaTitle: 'Our History',
        shareImage: '/static/legends_3.jpeg',
        metaDescription: 'In the St. Louis Rugby Scene since 1962',
      }}
    >
      {/* ── PAGE HEADER ── */}
      <Box
        bg="brand.black"
        color="white"
        pt={{ base: '4.5rem', md: '4.5rem' }}
        pb={{ base: '4rem', md: '4rem' }}
        px={{ base: 4, md: 8 }}
        position="relative"
        overflow="hidden"
      >
        <Box maxW="1100px" mx="auto" position="relative">
          <SectionHeading
            eyebrow="Established 1962"
            heading={<>Club History</>}
            eyebrowColor="brand.highlight"
            headingColor="white"
            as="h1"
            headingSize={{ base: '3rem', md: '4.875rem' }}
            mb="1.25rem"
          />
        </Box>
      </Box>

      {/* ── STAT BAND ── */}
      <Box
        bg="brand.darkSecondary"
        borderTop="2px solid"
        borderColor="brand.highlight"
      >
        <Grid
          maxW="1100px"
          mx="auto"
          templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        >
          {STATS.map((stat, i) => (
            <Box
              key={stat.num}
              p={7}
              borderRight={{
                base: i % 2 === 0 ? '1px solid' : 'none',
                md: i < STATS.length - 1 ? '1px solid' : 'none',
              }}
              borderBottom={{ base: i < 2 ? '1px solid' : 'none', md: 'none' }}
              borderColor="#383838"
            >
              <Text
                fontFamily="display"
                fontWeight={700}
                fontSize="2.125rem"
                letterSpacing="0.02em"
                color="brand.highlight"
                lineHeight={1}
              >
                {stat.num}
              </Text>
              <Text
                fontFamily="display"
                fontWeight={500}
                fontSize="0.6875rem"
                letterSpacing="0.2em"
                textTransform="uppercase"
                color="brand.meta"
                mt="0.625rem"
                lineHeight={1.4}
                whiteSpace="pre-line"
              >
                {stat.label}
              </Text>
            </Box>
          ))}
        </Grid>
      </Box>

      {/* ── CONTENT ── */}
      <Box maxW="1100px" mx="auto" px={{ base: 4, md: 8 }} pt={16} pb={20}>
        {/* Documentary */}
        {docSection && (
          <>
            <SectionLabel>The Film</SectionLabel>
            <DocCard section={docSection} />
          </>
        )}

        {/* Era sections */}
        {eraSections.map((section, i) => (
          <EraSection
            key={i}
            section={section}
            mt={docSection || i > 0 ? 20 : undefined}
            showChampionCallout={i === eraSections.length - 1}
            showEagles={i === eraSections.length - 1}
          />
        ))}
      </Box>
    </Layout>
  )
}

export async function getStaticProps() {
  const history = await fetchAPI(
    '/history?populate[section][populate][0]=image&populate[section][populate][1]=links',
  )

  return {
    props: { history: history ?? null },
    revalidate: 86400,
  }
}

export default ClubHistory
