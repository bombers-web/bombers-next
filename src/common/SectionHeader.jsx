import { Box, Heading } from '@chakra-ui/react'

const SectionHeader = ({
  title,
  color = 'brand.black',
  underlineColor = 'yellow.400',
}) => {
  return (
    <Box textAlign="center" mb={12}>
      <Heading
        size="2xl"
        textTransform="uppercase"
        letterSpacing="wider"
        color={color}
      >
        {title}
      </Heading>
      <Box h="2px" w="80px" bg={underlineColor} mx="auto" mt={4} />
    </Box>
  )
}

export default SectionHeader
