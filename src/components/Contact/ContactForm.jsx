import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Stack,
  Textarea,
  useToast,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { withMask } from "use-mask-input";

const ContactForm = () => {
  const toast = useToast();
  const initialState = {
    name: "",
    email: "",
    message: "",
    phone: "",
  };

  const [contact, setContact] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!contact.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!contact.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!contact.message.trim()) {
      newErrors.message = "Message is required";
    }

    if (contact.phone && !/^\+?[\d\s-()]+$/.test(contact.phone)) {
      newErrors.phone = "Invalid phone number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Form Error",
        description: "Please check all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Contact from Website",
          html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Contact Form Submission</title>
              <style>
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                }
                .field {
                  margin-bottom: 15px;
                }
                pre {
                  white-space: pre-wrap;
                  background: #f5f5f5;
                  padding: 15px;
                  border-radius: 4px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>New Contact Form Submission</h2>
                <div class="field">
                  <p><strong>Name:</strong> ${contact.name}</p>
                </div>
                <div class="field">
                  <p><strong>Email:</strong> ${contact.email}</p>
                </div>
                <div class="field">
                  <p><strong>Phone Number:</strong> ${
                    contact.phone || "Not provided"
                  }</p>
                </div>
                <div class="field">
                  <p><strong>Message:</strong></p>
                  <pre>${contact.message}</pre>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
            New Contact Form Submission
            
            Name: ${contact.name}
            Email: ${contact.email}
            Phone: ${contact.phone || "Not provided"}
            Message: ${contact.message}
          `,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast({
        title: "Message Sent!",
        description: "We will get back to you ASAP",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setContact(initialState);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box overflow="hidden">
      <SimpleGrid direction="column" columns={1} spacing={8}>
        <Stack spacing={8}>
          <FormControl isInvalid={errors.name}>
            <Input
              sx={{
                color: "#242424",
                _focus: { color: "black" },
              }}
              variant="filled"
              placeholder="Name *"
              name="name"
              value={contact.name}
              onChange={handleChange}
              isRequired
            />
            <FormErrorMessage>{errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<EmailIcon color="gray.400" />}
              />
              <Input
                sx={{
                  color: "gray",
                  _focus: { color: "black" },
                }}
                type="email"
                variant="filled"
                placeholder="Email *"
                name="email"
                value={contact.email}
                onChange={handleChange}
                isRequired
              />
            </InputGroup>
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.phone}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<PhoneIcon color="gray.400" />}
              />
              <Input
                sx={{
                  color: "gray",
                  _focus: { color: "black" },
                }}
                variant="filled"
                type="tel"
                ref={withMask("(999) 999-9999")}
                placeholder="Phone number (optional)"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
              />
            </InputGroup>
            <FormErrorMessage>{errors.phone}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.message}>
            <Textarea
              sx={{
                color: "gray",
                _focus: { color: "black" },
              }}
              rows="10"
              variant="filled"
              size="lg"
              placeholder="Message *"
              onChange={handleChange}
              name="message"
              value={contact.message}
              resize="vertical"
              isRequired
            />
            <FormErrorMessage>{errors.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Button
          variant="solid"
          width="100%"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText="Sending..."
          isDisabled={isSubmitting}
        >
          Submit
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default ContactForm;
