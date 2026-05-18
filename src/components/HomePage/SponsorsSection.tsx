import { Box, Text } from '@chakra-ui/react'
import Sponsors from 'components/Sponsors'

const SponsorsSection = () => {
  return (
    <Box
      bg="brand.light"
      w="full"
      py={{ base: 10, md: 14 }}
      px={{ base: 4, md: 8 }}
    >
      <Box maxW="1280px" mx="auto" textAlign="center">
        <Text
          fontFamily="display"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="widest"
          color="gray.500"
          textTransform="uppercase"
          mb={8}
        >
          Supported by our sponsors
        </Text>
        <Sponsors forFooter={false} />
      </Box>
    </Box>
  )
}

export default SponsorsSection
