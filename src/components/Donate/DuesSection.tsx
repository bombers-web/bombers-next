import { Box, Flex, Link, SimpleGrid } from '@chakra-ui/react'
import Image from 'next/image'
import SectionHeading from '../../common/SectionHeading'

interface DuesSubscription {
  description: string
  planId: string
  cost: number
  type: 'monthly' | 'one-time'
  benefits: string
}

interface GroupedTier {
  monthly?: DuesSubscription
  annual?: DuesSubscription
}

const basePaypalUrl =
  'https://www.paypal.com/webapps/billing/plans/subscribe?plan_id='

const PayButton = ({ planId }: { planId: string }) => (
  <Link
    href={`${basePaypalUrl}${planId}`}
    isExternal
    _hover={{ textDecoration: 'none' }}
  >
    <Flex
      align="center"
      gap="0.5em"
      bg="brand.highlight"
      borderRadius="4px"
      px="1.25em"
      py="0.75em"
      cursor="pointer"
      whiteSpace="nowrap"
      transition="filter 0.15s"
      _hover={{ filter: 'brightness(0.92)' }}
    >
      <Image
        src="/icons/paypal_logo.png"
        alt="PayPal"
        width={80}
        height={20}
        style={{ objectFit: 'contain', height: 'auto' }}
      />
      <Box
        fontFamily="display"
        fontWeight={700}
        fontSize="0.75em"
        letterSpacing="0.2em"
        textTransform="uppercase"
        color="black"
      >
        Pay via PayPal
      </Box>
    </Flex>
  </Link>
)

interface DuesCardProps {
  tierName: string
  subtitle: string
  description: string
  accentColor: string
  monthly?: DuesSubscription
  annual?: DuesSubscription
}

const DuesCard = ({
  tierName,
  subtitle,
  description,
  accentColor,
  monthly,
  annual,
}: DuesCardProps) => (
  <Box
    bg="white"
    borderRadius="6px"
    overflow="hidden"
    border="1px solid"
    borderColor="brand.light"
    boxShadow="0 2px 12px rgba(0,0,0,0.06)"
    transition="box-shadow 0.18s, transform 0.15s"
    _hover={{
      boxShadow: '0 8px 28px rgba(0,0,0,0.13)',
      transform: 'translateY(-2px)',
    }}
  >
    <Box
      bg="brand.dark"
      px={{ base: '1.5em', md: '2em' }}
      py="1.75em"
      borderBottom="3px solid"
      borderColor={accentColor}
    >
      <SectionHeading
        eyebrow={subtitle}
        heading={tierName}
        eyebrowColor={accentColor}
        headingColor="white"
        headingSize={{ base: '1.75em', md: '2.25em' }}
      />
    </Box>

    <Box px={{ base: '1.5em', md: '2em' }} py="1.75em">
      <Box
        fontFamily="body"
        fontSize="0.875em"
        color="brand.meta"
        lineHeight={1.6}
        mb={6}
      >
        {description}
      </Box>

      {monthly && (
        <Flex
          align="center"
          justify="space-between"
          border="1px solid"
          borderColor="brand.light"
          borderRadius="4px"
          p="1.25em 1.375em"
          mb={4}
          flexWrap="wrap"
          gap={4}
        >
          <Box>
            <Box
              fontFamily="display"
              fontWeight={600}
              fontSize="0.6875em"
              letterSpacing="0.3em"
              textTransform="uppercase"
              color="brand.meta"
              mb={1}
            >
              Monthly
            </Box>
            <Flex align="baseline" gap={1}>
              <Box
                fontFamily="display"
                fontWeight={700}
                fontSize="2.375em"
                color="brand.dark"
                lineHeight={1}
              >
                ${monthly.cost}
              </Box>
              <Box fontFamily="body" fontSize="0.8125em" color="brand.meta">
                /mo
              </Box>
            </Flex>
          </Box>
          <PayButton planId={monthly.planId} />
        </Flex>
      )}

      {annual && (
        <Flex
          align="center"
          justify="space-between"
          border="1px solid"
          borderColor="brand.light"
          borderRadius="4px"
          p="1.25em 1.375em"
          flexWrap="wrap"
          gap={4}
        >
          <Box>
            <Box
              fontFamily="display"
              fontWeight={600}
              fontSize="0.6875em"
              letterSpacing="0.3em"
              textTransform="uppercase"
              color="brand.meta"
              mb={1}
            >
              Annual
            </Box>
            <Flex align="baseline" gap={1}>
              <Box
                fontFamily="display"
                fontWeight={700}
                fontSize="2.375em"
                color="brand.dark"
                lineHeight={1}
              >
                ${annual.cost}
              </Box>
              <Box fontFamily="body" fontSize="0.8125em" color="brand.meta">
                /yr
              </Box>
            </Flex>
          </Box>
          <PayButton planId={annual.planId} />
        </Flex>
      )}
    </Box>
  </Box>
)

function groupByTier(subs: DuesSubscription[]): Record<string, GroupedTier> {
  const tiers: Record<string, GroupedTier> = {}
  subs.forEach((sub) => {
    const d = sub.description.toLowerCase()
    let key = 'other'
    if (d.includes('rookie')) key = 'rookie'
    else if (d.includes('senior')) key = 'senior'
    if (!tiers[key]) tiers[key] = {}
    if (sub.type === 'monthly') tiers[key].monthly = sub
    else tiers[key].annual = sub
  })
  return tiers
}

const tierMeta: Record<
  string,
  { label: string; subtitle: string; description: string; accentColor: string }
> = {
  rookie: {
    label: 'Rookie Dues',
    subtitle: 'First-year players',
    description: 'For players in their first year with the Bombers.',
    accentColor: 'brand.highlight',
  },
  senior: {
    label: 'Senior Dues',
    subtitle: 'Returning players',
    description: 'For all returning players.',
    accentColor: 'brand.highlightSecondary',
  },
}

const DuesSection = ({ subscriptions, subtabIndex, onSubtabChange }) => {
  const playerDues: DuesSubscription[] = subscriptions
    .filter((sub) => sub.description.toLowerCase().includes('dues'))
    .sort((a, b) => a.cost - b.cost)

  const supporterDues: DuesSubscription[] = subscriptions
    .filter((sub) => !sub.description.toLowerCase().includes('dues'))
    .sort((a, b) => a.cost - b.cost)

  const groupedTiers = groupByTier(playerDues)
  const tierKeys = ['rookie', 'senior', 'other'].filter((k) => groupedTiers[k])

  return (
    <Box maxW="1280px" mx="auto">
      {/* Section header */}
      <Box mb="2.25em">
        <SectionHeading eyebrow="Season 2026" heading="Club Dues" mb="1.75em" />

        {/* Player / Supporter toggle */}
        <Flex
          display="inline-flex"
          bg="brand.light"
          borderRadius="4px"
          p="0.1875em"
          gap="0.1875em"
        >
          <Box
            as="button"
            onClick={() => onSubtabChange(0)}
            bg={subtabIndex === 0 ? 'brand.dark' : 'transparent'}
            color={subtabIndex === 0 ? 'white' : 'brand.meta'}
            border="none"
            px="1.75em"
            py="0.625em"
            fontFamily="display"
            fontWeight={600}
            fontSize="0.8125em"
            letterSpacing="0.25em"
            textTransform="uppercase"
            borderRadius="3px"
            cursor="pointer"
            transition="background 0.15s, color 0.15s"
            _hover={subtabIndex !== 0 ? { bg: 'brand.surfaceHover' } : {}}
          >
            Player Dues
          </Box>
          <Box
            as="button"
            onClick={() => onSubtabChange(1)}
            bg={subtabIndex === 1 ? 'brand.dark' : 'transparent'}
            color={subtabIndex === 1 ? 'white' : 'brand.meta'}
            border="none"
            px="1.75em"
            py="0.625em"
            fontFamily="display"
            fontWeight={600}
            fontSize="0.8125em"
            letterSpacing="0.25em"
            textTransform="uppercase"
            borderRadius="3px"
            cursor="pointer"
            transition="background 0.15s, color 0.15s"
            _hover={subtabIndex !== 1 ? { bg: 'brand.surfaceHover' } : {}}
          >
            Supporter Dues
          </Box>
        </Flex>
      </Box>

      {/* Player dues panel */}
      {subtabIndex === 0 && (
        <Box>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="1.25em">
            {tierKeys.map((key) => {
              const meta = tierMeta[key] || {
                label: 'Player Dues',
                subtitle: 'Active players',
                description: 'For all returning players.',
                accentColor: 'brand.highlight',
              }
              return (
                <DuesCard
                  key={key}
                  tierName={meta.label}
                  subtitle={meta.subtitle}
                  description={meta.description}
                  accentColor={meta.accentColor}
                  monthly={groupedTiers[key].monthly}
                  annual={groupedTiers[key].annual}
                />
              )
            })}
          </SimpleGrid>
          <Box
            mt="1.25em"
            fontFamily="body"
            fontSize="0.8125em"
            color="brand.meta"
            textAlign="center"
          >
            Questions about dues?{' '}
            <Link
              href="/contact"
              color="brand.dark"
              borderBottom="1px solid"
              borderColor="brand.highlight"
              textDecoration="none"
              pb="0.0625em"
            >
              Contact the treasurer
            </Link>
          </Box>
        </Box>
      )}

      {/* Supporter dues panel */}
      {subtabIndex === 1 && (
        <Box maxW="680px">
          <Box
            bg="white"
            borderRadius="6px"
            overflow="hidden"
            border="1px solid"
            borderColor="brand.light"
            boxShadow="0 2px 12px rgba(0,0,0,0.06)"
            transition="box-shadow 0.18s, transform 0.15s"
            _hover={{
              boxShadow: '0 8px 28px rgba(0,0,0,0.13)',
              transform: 'translateY(-2px)',
            }}
          >
            <Box
              bg="brand.dark"
              px={{ base: '1.5em', md: '2em' }}
              py="1.75em"
              borderBottom="3px solid"
              borderColor="brand.highlight"
            >
              <SectionHeading
                eyebrow="Friends of the club"
                heading="Supporter Dues"
                eyebrowColor="brand.highlight"
                headingColor="white"
                headingSize={{ base: '1.75em', md: '2.25em' }}
              />
            </Box>
            <Box px={{ base: '1.5em', md: '2em' }} py="1.75em">
              <Box
                fontFamily="body"
                fontSize="0.9375em"
                color="brand.meta"
                lineHeight={1.6}
                mb={6}
              >
                Support the club as a non-playing member. Access to all club
                socials, match day events, and the annual banquet.
              </Box>

              {supporterDues.length > 0 ? (
                supporterDues.map((sub) => (
                  <Flex
                    key={sub.planId}
                    align="center"
                    justify="space-between"
                    border="1px solid"
                    borderColor="brand.light"
                    borderRadius="4px"
                    p="1.25em 1.375em"
                    mb={4}
                    flexWrap="wrap"
                    gap={4}
                  >
                    <Box>
                      <Box
                        fontFamily="display"
                        fontWeight={600}
                        fontSize="0.6875em"
                        letterSpacing="0.3em"
                        textTransform="uppercase"
                        color="brand.meta"
                        mb={1}
                      >
                        {sub.type === 'monthly' ? 'Monthly' : 'Annual'}
                      </Box>
                      <Flex align="baseline" gap={1}>
                        <Box
                          fontFamily="display"
                          fontWeight={700}
                          fontSize="2.375em"
                          color="brand.dark"
                          lineHeight={1}
                        >
                          ${sub.cost}
                        </Box>
                        <Box
                          fontFamily="body"
                          fontSize="0.8125em"
                          color="brand.meta"
                        >
                          {sub.type === 'monthly' ? '/mo' : '/yr'}
                        </Box>
                      </Flex>
                    </Box>
                    <PayButton planId={sub.planId} />
                  </Flex>
                ))
              ) : (
                <Flex
                  align="center"
                  justify="space-between"
                  border="1px solid"
                  borderColor="brand.light"
                  borderRadius="4px"
                  p="1.25em 1.375em"
                  flexWrap="wrap"
                  gap={4}
                >
                  <Box>
                    <Box
                      fontFamily="display"
                      fontWeight={600}
                      fontSize="0.6875em"
                      letterSpacing="0.3em"
                      textTransform="uppercase"
                      color="brand.meta"
                      mb={1}
                    >
                      Annual
                    </Box>
                    <Box
                      fontFamily="display"
                      fontWeight={700}
                      fontSize="2.375em"
                      color="brand.dark"
                      lineHeight={1}
                    >
                      Contact us
                    </Box>
                    <Box
                      fontFamily="body"
                      fontSize="0.8125em"
                      color="brand.meta"
                      mt={1}
                    >
                      Reach out for current supporter rates
                    </Box>
                  </Box>
                  <Link
                    href="mailto:info@stlbombers.com"
                    bg="brand.highlight"
                    borderRadius="4px"
                    px="1.5em"
                    py="0.875em"
                    fontFamily="display"
                    fontWeight={700}
                    fontSize="0.8125em"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                    color="black"
                    textDecoration="none"
                    whiteSpace="nowrap"
                    _hover={{
                      textDecoration: 'none',
                      filter: 'brightness(0.92)',
                    }}
                  >
                    Email Us →
                  </Link>
                </Flex>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default DuesSection
