import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  heading: ReactNode
  eyebrowColor?: string
  headingColor?: string
  as?: 'h1' | 'h2' | 'h3'
  headingSize?: string | Record<string, string>
  mb?: string | number
}

const SectionHeading = ({
  eyebrow,
  heading,
  eyebrowColor = 'brand.meta',
  headingColor = 'brand.dark',
  as = 'h2',
  headingSize = { base: '36px', md: '44px' },
  mb,
}: SectionHeadingProps) => (
  <Box mb={mb}>
    <Box
      fontFamily="display"
      fontWeight={700}
      fontSize="sm"
      letterSpacing="0.3em"
      textTransform="uppercase"
      color={eyebrowColor}
      mb={2}
    >
      {eyebrow}
    </Box>
    <Box
      as={as}
      fontFamily="display"
      fontWeight={700}
      fontSize={headingSize}
      letterSpacing="0.02em"
      textTransform="uppercase"
      lineHeight={0.95}
      m={0}
      color={headingColor}
    >
      {heading}
    </Box>
  </Box>
)

export default SectionHeading
