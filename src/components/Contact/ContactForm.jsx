import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Grid,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { withMask } from 'use-mask-input'
import { escapeHtml } from 'utils/escapeHtml'

const TOPICS = [
  'Joining the team',
  'Sponsorship',
  'Press / Media',
  'Alumni',
  'Other',
]

const FieldLabel = ({ children, fontWeight = '700' }) => (
  <Text
    as="label"
    display="block"
    mb="0.5rem"
    fontFamily="display"
    fontWeight={fontWeight}
    fontSize="0.75rem"
    letterSpacing="0.25em"
    textTransform="uppercase"
    color="brand.dark"
  >
    {children}
  </Text>
)

const inputSx = {
  bg: '#EEF1F4',
  color: 'brand.dark',
  border: '1.5px solid transparent',
  borderRadius: '0.5rem',
  fontSize: '0.9375rem',
  _focus: {
    borderColor: 'brand.highlight',
    boxShadow: '0 0 0 3px rgba(214,195,127,0.18)',
  },
  _placeholder: { color: '#aaa' },
}

const ContactForm = () => {
  const toast = useToast()
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: 'Joining the team',
    message: '',
  }

  const [contact, setContact] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!contact.firstName.trim())
      newErrors.firstName = 'First name is required'
    if (!contact.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!contact.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email))
      newErrors.email = 'Invalid email format'
    if (!contact.message.trim()) newErrors.message = 'Message is required'
    if (contact.phone && !/^\+?[\d\s\-()]+$/.test(contact.phone))
      newErrors.phone = 'Invalid phone number format'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget
    setContact((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: 'Form Error',
        description: 'Please check all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `Contact: ${contact.topic} — ${contact.firstName} ${contact.lastName}`,
          replyTo: contact.email,
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #212121; padding: 1.25rem; }
                .container { max-width: 37.5rem; margin: 0 auto; }
                .field { margin-bottom: 0.9375rem; }
                pre { white-space: pre-wrap; background: #f8f8f8; padding: 0.9375rem; border-radius: 0.25rem; }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>New Contact Form Submission</h2>
                <div class="field"><p><strong>Name:</strong> ${escapeHtml(
                  contact.firstName,
                )} ${escapeHtml(contact.lastName)}</p></div>
                <div class="field"><p><strong>Email:</strong> ${escapeHtml(
                  contact.email,
                )}</p></div>
                <div class="field"><p><strong>Phone:</strong> ${escapeHtml(
                  contact.phone || 'Not provided',
                )}</p></div>
                <div class="field"><p><strong>Topic:</strong> ${escapeHtml(
                  contact.topic,
                )}</p></div>
                <div class="field"><p><strong>Message:</strong></p><pre>${escapeHtml(
                  contact.message,
                )}</pre></div>
              </div>
            </body>
            </html>
          `,
          text: `New Contact Form Submission\n\nName: ${contact.firstName} ${
            contact.lastName
          }\nEmail: ${contact.email}\nPhone: ${
            contact.phone || 'Not provided'
          }\nTopic: ${contact.topic}\nMessage: ${contact.message}`,
        }),
      })

      if (!response.ok) throw new Error('Network response was not ok')

      toast({
        title: 'Message Sent!',
        description: 'We will get back to you ASAP',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setContact(initialState)
    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box as="form" onSubmit={(e) => e.preventDefault()}>
      <Flex direction="column" gap="5">
        {/* Name row */}
        <Grid templateColumns={{ base: '1fr', sm: '1fr 1fr' }} gap="5">
          <FormControl isInvalid={!!errors.firstName}>
            <FieldLabel fontWeight="800">
              First Name{' '}
              <Box as="span" color="brand.highlight">
                *
              </Box>
            </FieldLabel>
            <Input
              name="firstName"
              value={contact.firstName}
              onChange={handleChange}
              placeholder="Marcus"
              variant="unstyled"
              sx={{ ...inputSx, p: '0.9375rem 1.125rem' }}
              isRequired
            />
            <FormErrorMessage>{errors.firstName}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.lastName}>
            <FieldLabel fontWeight="800">
              Last Name{' '}
              <Box as="span" color="brand.highlight">
                *
              </Box>
            </FieldLabel>
            <Input
              name="lastName"
              value={contact.lastName}
              onChange={handleChange}
              placeholder="Owusu"
              variant="unstyled"
              sx={{ ...inputSx, p: '0.9375rem 1.125rem' }}
              isRequired
            />
            <FormErrorMessage>{errors.lastName}</FormErrorMessage>
          </FormControl>
        </Grid>

        {/* Email */}
        <FormControl isInvalid={!!errors.email}>
          <FieldLabel fontWeight="800">
            Email{' '}
            <Box as="span" color="brand.highlight">
              *
            </Box>
          </FieldLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" h="100%" pl="0.0625rem">
              <EmailIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type="email"
              name="email"
              value={contact.email}
              onChange={handleChange}
              placeholder="you@example.com"
              variant="unstyled"
              sx={{ ...inputSx, p: '0.9375rem 1.125rem 0.9375rem 2.875rem' }}
              isRequired
            />
          </InputGroup>
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        {/* Phone */}
        <FormControl isInvalid={!!errors.phone}>
          <FieldLabel fontWeight="800">
            Phone{' '}
            <Box
              as="span"
              color="brand.meta"
              fontWeight="400"
              letterSpacing="0"
              textTransform="none"
            >
              (optional)
            </Box>
          </FieldLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" h="100%" pl="0.0625rem">
              <PhoneIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type="tel"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              placeholder="(314) 555-0142"
              ref={withMask('(999) 999-9999')}
              variant="unstyled"
              sx={{ ...inputSx, p: '0.9375rem 1.125rem 0.9375rem 2.875rem' }}
            />
          </InputGroup>
          <FormErrorMessage>{errors.phone}</FormErrorMessage>
        </FormControl>

        {/* Topic chips */}
        <Box>
          <FieldLabel fontWeight="800">What&rsquo;s this about?</FieldLabel>
          <Flex wrap="wrap" gap="0.5rem">
            {TOPICS.map((topic) => (
              <Box
                key={topic}
                as="button"
                type="button"
                onClick={() => setContact((prev) => ({ ...prev, topic }))}
                px="1rem"
                py="0.5625rem"
                borderRadius="999px"
                fontSize="sm"
                border="1px solid"
                borderColor={
                  contact.topic === topic ? 'brand.dark' : 'brand.light'
                }
                bg={contact.topic === topic ? 'brand.dark' : 'white'}
                color={contact.topic === topic ? 'white' : 'brand.dark'}
                cursor="pointer"
                _hover={{
                  bg: 'brand.dark',
                  color: 'white',
                  borderColor: 'brand.dark',
                }}
                transition="background 0.15s, color 0.15s, border-color 0.15s"
              >
                {topic}
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Message */}
        <FormControl isInvalid={!!errors.message}>
          <FieldLabel fontWeight="800">
            Message{' '}
            <Box as="span" color="brand.highlight">
              *
            </Box>
          </FieldLabel>
          <Textarea
            name="message"
            value={contact.message}
            onChange={handleChange}
            placeholder="Tell us what's going on…"
            rows={6}
            resize="vertical"
            variant="unstyled"
            sx={{ ...inputSx, p: '0.9375rem 1.125rem' }}
            isRequired
          />
          <FormErrorMessage>{errors.message}</FormErrorMessage>
        </FormControl>

        {/* Submit row */}
        <Flex
          align="center"
          justify="space-between"
          gap="1.25rem"
          wrap="wrap"
          mt="0.25rem"
        >
          <Button
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Sending..."
            isDisabled={isSubmitting}
            bg="brand.highlight"
            color="brand.black"
            _hover={{ bg: '#c8b265' }}
            _active={{ transform: 'scale(0.98)' }}
            fontFamily="display"
            fontWeight="700"
            fontSize="sm"
            letterSpacing="0.3em"
            textTransform="uppercase"
            px="2.5rem"
            py="0.9375rem"
            h="auto"
            borderRadius="0.25rem"
          >
            Send Message →
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ContactForm
