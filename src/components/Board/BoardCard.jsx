import { EmailIcon } from '@chakra-ui/icons' // Optional: run npm install @chakra-ui/icons
import { AspectRatio, Box, Heading, Link, Text, VStack } from '@chakra-ui/react'

const BoardCard = ({ bg, displayName, position, email }) => {
  return (
    <Box
      role="group"
      maxW="300px"
      w="full"
      bg="white"
      boxShadow="sm"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s ease"
      border="1px solid"
      borderColor="gray.100"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '2xl',
        borderColor: 'brand.highlight',
      }}
    >
      {/* Photo Section with consistent Aspect Ratio */}
      <AspectRatio ratio={4 / 5}>
        <Box
          backgroundImage={`url(${bg})`}
          backgroundPosition="center top"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundColor="gray.50"
          transition="transform 0.5s ease"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
      </AspectRatio>
      {/* Content Section with fixed height */}
      <Box p={5} bg="white" h="180px" display="flex" flexDirection="column">
        <Heading
          as="h3"
          fontSize="xl"
          fontWeight="800"
          color="gray.800"
          lineHeight="tight"
          mb={2}
        >
          {displayName}
        </Heading>
        <Link
          href={`mailto:${email}`}
          fontSize="sm"
          color="gray.500"
          display="flex"
          alignItems="center"
          _hover={{ color: 'brand.highlight', textDecoration: 'none' }}
        >
          <EmailIcon mr={2} />
          <Text noOfLines={1}>{email}</Text>
        </Link>
        <Box mt="auto">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="brand.highlight"
            textTransform="uppercase"
            letterSpacing="wider"
            lineHeight="1.4"
            mb={2}
          >
            {position}
          </Text>
        </Box>
      </Box>
      {/* Subtle bottom accent bar that appears on hover */}
      <Box
        h="4px"
        w="0%"
        bg="brand.highlight"
        transition="width 0.3s ease"
        _groupHover={{ w: '100%' }}
      />
    </Box>
  )
}

export default BoardCard
