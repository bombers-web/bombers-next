import { EmailIcon } from '@chakra-ui/icons'
import { AspectRatio, Box, Heading, Link, Text, VStack } from '@chakra-ui/react'

// Destructure { coach } from props instead of individual fields
const CoachCard = ({ coach }) => {
  // 1. Construct the name from your JSON fields
  const fullName = `${coach?.first_name} ${coach?.last_name || ''}`

  // 2. Map the picture. Strapi usually provides coach.picture.url
  // We use coach.bg as a secondary fallback if you are passing a manual background
  const background = coach?.photo?.url || '/static/default/defaultpic.png'

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
      {/* Photo Section */}
      <AspectRatio ratio={4 / 5}>
        <Box
          backgroundImage={`url(${background})`}
          backgroundPosition="center top"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundColor="gray.50"
          transition="transform 0.5s ease"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
      </AspectRatio>

      {/* Content Section */}
      <VStack p={5} spacing={1} align="flex-start" bg="white">
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="brand.highlight"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          {coach?.position}
        </Text>

        <Heading
          as="h3"
          fontSize="xl"
          fontWeight="800"
          color="gray.800"
          lineHeight="tight"
        >
          {fullName}
        </Heading>

        {/* coach.email might be null based on your JSON, so we check first */}
        {coach?.email && (
          <Box pt={3} w="100%">
            <Link
              href={`mailto:${coach.email}`}
              fontSize="sm"
              color="gray.500"
              display="flex"
              alignItems="center"
              _hover={{ color: 'brand.highlight', textDecoration: 'none' }}
            >
              <EmailIcon mr={2} />
              <Text noOfLines={1}>{coach.email}</Text>
            </Link>
          </Box>
        )}
      </VStack>

      {/* Accent bar */}
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

export default CoachCard
