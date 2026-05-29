import { Divider, Flex, Text } from '@chakra-ui/react'

interface SectionLabelProps {
  children: string
  mt?: number | string | Record<string, number | string>
  mb?: number | string | Record<string, number | string>
}

const SectionLabel = ({ children, mt, mb = 6 }: SectionLabelProps) => (
  <Flex align="center" gap={3} mt={mt} mb={mb}>
    <Divider borderColor="brand.dark" my={0} />
    <Text
      fontFamily="display"
      fontWeight={900}
      fontSize="sm"
      letterSpacing="0.42em"
      textTransform="uppercase"
      color="brand.dark"
      whiteSpace="nowrap"
      flexShrink={0}
    >
      {children}
    </Text>
    <Divider borderColor="brand.dark" my={0} />
  </Flex>
)

export default SectionLabel
