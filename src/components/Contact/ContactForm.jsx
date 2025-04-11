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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const ContactForm = () => {
  const toast = useToast();
  const initialState = {
    name: "",
    email: "",
    message: "",
    phone: "",
  };
  const [contact, setContact] = useState(initialState);

  const handleChange = ({ currentTarget, target, ...e }) => {
    setContact({
      ...contact,
      [currentTarget.name]: currentTarget.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios
        .post(`/api/email`, {
          from: "eric.davidson.dev@gmail.com",
          // to: "marcom@stlouisbombers.com",
          to: "eric.davidson.dev@gmail.com",
          replyTo: `${contact.email}`,
          subject: "New Contact Message",
          // message: `Name: ${contact.name}\n
          //       Phone Number: ${contact.phone}\n
          //       Message: ${contact.message}`,
          message: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Contact Form Submission</title>
              <style>
                  body { font-family: sans-serif; }
              </style>
          </head>
          <body>
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${contact.name}</p>
              <p><strong>Phone Number:</strong> ${contact.phone}</p>
              <p><strong>Message:</strong></p> <pre>${contact.message}</pre>
          </body>
          </html>
        `,
        })
        .then((response) => {
          toast({
            title: "Email Sent!",
            description: "We will get back to you ASAP",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (error) {
      toast({
        title: "Oh no!",
        description: "Something went wrong.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setContact(initialState);
  };

  return (
    <Box overflow="hidden" cursor="pointer" p={[2, 2, 4, 6, 8]}>
      <SimpleGrid direction="column" columns={1} spacing={8}>
        <Stack spacing={8}>
          <Input
            sx={{
              color: "#242424",
              _focus: {
                color: "black",
              },
            }}
            variant="filled"
            placeholder="Name"
            name="name"
            value={contact.name}
            onChange={handleChange}
          />
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<EmailIcon color="gray.400" />}
            />
            <Input
              sx={{
                color: "gray",
                _focus: {
                  color: "black",
                },
              }}
              type="email"
              variant="filled"
              placeholder="Email"
              name="email"
              value={contact.email}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.400" />}
            />
            <Input
              sx={{
                color: "gray",
                _focus: {
                  color: "black",
                },
              }}
              variant="filled"
              type="tel"
              placeholder="Phone number"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
            />
          </InputGroup>

          <Textarea
            sx={{
              color: "gray",
              _focus: {
                color: "black",
              },
            }}
            rows="10"
            variant="filled"
            size="lg"
            placeholder="Message"
            onChange={handleChange}
            name="message"
            value={contact.message}
            resize="vertical"
          />
        </Stack>
        <Button variant="solid" width="100%" onClick={handleSubmit}>
          Submit
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default ContactForm;
