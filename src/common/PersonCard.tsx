import { Box, Flex, Text } from '@chakra-ui/react'
import { FiMail } from 'react-icons/fi'
import Pic from './Pic'

type PersonCardProps = {
  name: string
  role: string
  email?: string
  image?: { url: string; alternativeText?: string; name?: string }
}

const PersonCard = ({ name, role, email, image }: PersonCardProps) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Box
      role="group"
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="sm"
      overflow="hidden"
      transition="border-color 0.2s ease, box-shadow 0.2s ease"
      _hover={{
        borderColor: 'brand.highlight',
        boxShadow: '0 0.5rem 1.5rem rgba(0,0,0,0.08)',
      }}
    >
      <Flex align="center" p={{ base: '1rem', md: '1.25rem' }} gap="1rem">
        {/* Avatar */}
        <Box
          flexShrink={0}
          w="4.5rem"
          h="4.5rem"
          borderRadius="full"
          overflow="hidden"
          border="2px solid"
          borderColor="brand.highlight"
          bg="brand.dark"
        >
          {image?.url ? (
            <Pic
              image={image}
              fit="cover"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <Flex align="center" justify="center" w="full" h="full">
              <Text
                fontFamily="display"
                fontWeight={700}
                fontSize="1.625rem"
                color="brand.highlight"
                userSelect="none"
              >
                {initials}
              </Text>
            </Flex>
          )}
        </Box>

        {/* Content */}
        <Box minW={0}>
          <Text
            fontFamily="display"
            fontWeight={700}
            fontSize="0.75rem"
            letterSpacing="0.3em"
            textTransform="uppercase"
            color="brand.highlight"
            noOfLines={2}
            mb="0.25rem"
          >
            {role}
          </Text>
          <Text
            fontFamily="display"
            fontWeight={700}
            fontSize="1.25rem"
            letterSpacing="0.02em"
            textTransform="uppercase"
            color="brand.dark"
            lineHeight={1.1}
          >
            {name}
          </Text>
          {email && (
            <Flex
              as="a"
              href={`mailto:${email}`}
              align="flex-start"
              gap="0.25rem"
              mt="0.5rem"
              color="brand.meta"
              fontFamily="body"
              fontSize="0.8125rem"
              _hover={{ color: 'brand.highlight' }}
              transition="color 0.2s"
            >
              <FiMail size="0.6875rem" style={{ flexShrink: 0 }} />
              <Text as="span" wordBreak="break-all">
                {email}
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>

      {/* Hover accent bar */}
      <Box
        h="0.1875rem"
        w="0"
        bg="brand.highlight"
        transition="width 0.3s ease"
        _groupHover={{ w: '100%' }}
      />
    </Box>
  )
}

export default PersonCard
