import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  // Inline validation to match the contact form (no native browser bubble).
  // On success we let the form submit natively to Mailchimp.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!email.trim()) {
      e.preventDefault()
      setError('Email is required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.preventDefault()
      setError('Please enter a valid email address')
    } else {
      setError('')
    }
  }

  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '1fr 1.1fr' }}
      gap={{ base: 8, lg: 12 }}
      alignItems="center"
      bg="brand.mediumSecondary"
      borderRadius="sm"
      p={{ base: 8, md: 14 }}
    >
      {/* Left: info */}
      <Box>
        <Text
          fontFamily="display"
          fontWeight="bold"
          fontSize="sm"
          letterSpacing="widest"
          color="brand.highlight"
          textTransform="uppercase"
          mb={2}
        >
          Newsletter
        </Text>
        <Heading
          fontFamily="display"
          fontWeight="extrabold"
          fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
          letterSpacing="tight"
          textTransform="uppercase"
          lineHeight="none"
          color="white"
          mb={4}
        >
          Stay in the Loop
        </Heading>
        <Text
          fontFamily="body"
          fontSize="md"
          color="whiteAlpha.600"
          lineHeight="tall"
          mt={4}
          maxW="380px"
        >
          Match results, recruiting drives, and community updates — straight
          from the pitch to your inbox. Monthly. No spam.
        </Text>
      </Box>

      {/* Right: form */}
      <Box>
        <form
          action="https://stlouisbombers.us22.list-manage.com/subscribe/post?u=d3de19555e475384fba3810d5&amp;id=5ddc6f8c2e&amp;f_id=00fde3e1f0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          target="_blank"
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap={3} mb={3}>
            <FormControl>
              <FormLabel srOnly>First Name</FormLabel>
              <Input
                type="text"
                name="FNAME"
                placeholder="First Name"
                bg="transparent"
                color="white"
                borderColor="whiteAlpha.300"
                borderRadius="sm"
                fontFamily="body"
                _placeholder={{ color: 'whiteAlpha.400' }}
                _hover={{ borderColor: 'whiteAlpha.500' }}
                _focus={{
                  borderColor: 'brand.highlight',
                  boxShadow: 'none',
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel srOnly>Last Name</FormLabel>
              <Input
                type="text"
                name="LNAME"
                placeholder="Last Name"
                bg="transparent"
                color="white"
                borderColor="whiteAlpha.300"
                borderRadius="sm"
                fontFamily="body"
                _placeholder={{ color: 'whiteAlpha.400' }}
                _hover={{ borderColor: 'whiteAlpha.500' }}
                _focus={{
                  borderColor: 'brand.highlight',
                  boxShadow: 'none',
                }}
              />
            </FormControl>
          </Grid>

          <FormControl isRequired isInvalid={!!error} mb={3}>
            <FormLabel srOnly>Email Address</FormLabel>
            <Input
              type="email"
              name="EMAIL"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (error) setError('')
              }}
              bg="transparent"
              color="white"
              borderColor="whiteAlpha.300"
              borderRadius="sm"
              fontFamily="body"
              _placeholder={{ color: 'whiteAlpha.400' }}
              _hover={{ borderColor: 'whiteAlpha.500' }}
              _focus={{
                borderColor: 'brand.highlight',
                boxShadow: 'none',
              }}
            />
            <FormErrorMessage color="brand.loss">{error}</FormErrorMessage>
          </FormControl>

          {/* Mailchimp honeypot */}
          <div
            style={{ position: 'absolute', left: '-5000px' }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_d3de19555e475384fba3810d5_5ddc6f8c2e"
              tabIndex={-1}
              defaultValue=""
              readOnly
            />
          </div>

          <Button
            type="submit"
            name="subscribe"
            w="full"
            bg="brand.highlight"
            color="brand.dark"
            fontFamily="display"
            fontWeight="bold"
            fontSize="sm"
            letterSpacing="widest"
            textTransform="uppercase"
            borderRadius="sm"
            h="50px"
            _hover={{ bg: 'yellow.200' }}
          >
            Subscribe Now
          </Button>
        </form>
      </Box>
    </Grid>
  )
}

export default NewsletterSignup
