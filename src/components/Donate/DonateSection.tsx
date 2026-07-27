import { Box, Flex, Link } from '@chakra-ui/react'
import Image from 'next/image'
import SectionHeading from '../../common/SectionHeading'

const DonateSection = () => {
  return (
    <Box maxW="640px" mx="auto">
      <SectionHeading
        eyebrow="One-time or recurring"
        heading="Make a donation"
        mb={8}
      />

      <Box
        bg="brand.dark"
        color="white"
        borderRadius="6px"
        overflow="hidden"
        boxShadow="0 12px 40px rgba(0,0,0,0.14)"
      >
        {/* Card header */}
        <Box
          px={{ base: '28px', md: '40px' }}
          py="36px"
          borderBottom="2px solid"
          borderColor="brand.highlight"
        >
          <Box
            fontFamily="display"
            fontWeight={600}
            fontSize="12px"
            letterSpacing="0.4em"
            textTransform="uppercase"
            color="brand.highlight"
            mb={2}
          >
            Support the Bombers
          </Box>
        </Box>

        {/* Buttons */}
        <Box
          px={{ base: '28px', md: '40px' }}
          py="32px"
          display="grid"
          gap="14px"
          background="brand.white"
        >
          <Link
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5JQ4TPW3RQ9UA"
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            <Flex
              w="100%"
              bg="brand.highlight"
              borderRadius="4px"
              py="16px"
              px="20px"
              align="center"
              justify="center"
              gap="12px"
              cursor="pointer"
              transition="filter 0.15s"
              _hover={{ filter: 'brightness(0.92)' }}
              _active={{ transform: 'scale(0.98)' }}
            >
              <Image
                src="/icons/paypal_logo.png"
                alt="PayPal"
                width={100}
                height={26}
                style={{ objectFit: 'contain', height: 'auto' }}
              />
              <Box
                fontFamily="display"
                fontWeight={700}
                fontSize="15px"
                letterSpacing="0.25em"
                textTransform="uppercase"
                color="black"
              >
                Donate via PayPal
              </Box>
            </Flex>
          </Link>

          <Link
            href="https://account.venmo.com/u/stlbombersrfc"
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            <Flex
              w="100%"
              bg="#3D95CE"
              borderRadius="4px"
              py="16px"
              px="20px"
              align="center"
              justify="center"
              gap="12px"
              cursor="pointer"
              transition="filter 0.15s"
              _hover={{ filter: 'brightness(0.88)' }}
              _active={{ transform: 'scale(0.98)' }}
            >
              <Image
                src="/icons/venmo_logo.png"
                alt="Venmo"
                width={100}
                height={26}
                style={{ objectFit: 'contain', height: 'auto' }}
              />
              <Box
                fontFamily="display"
                fontWeight={700}
                fontSize="15px"
                letterSpacing="0.25em"
                textTransform="uppercase"
                color="white"
              >
                Donate via Venmo
              </Box>
            </Flex>
          </Link>

          <Box
            textAlign="center"
            fontFamily="body"
            fontSize="12px"
            color="brand.meta"
            pt="2px"
          >
            {'Venmo: '}
            <Box as="strong" color="brand.meta">
              @stlbombers
            </Box>
          </Box>
        </Box>

        {/* 501(c)(7) note */}
        <Box
          bg="brand.nearBlack"
          px={{ base: '28px', md: '40px' }}
          py="18px"
          fontFamily="body"
          fontSize="13px"
          color="brand.metaDark"
          lineHeight={1.55}
        >
          The St. Louis Bombers RFC is a 501(c)(7) nonprofit. Donations support
          club operations. Questions?{' '}
          <Link
            href="mailto:info@stlbombers.com"
            color="brand.highlight"
            textDecoration="none"
          >
            president@stlouisbombers.com
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default DonateSection
