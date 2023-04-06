import * as React from "react";
import {
  Box,
  Text,
  Flex,
  Link as ChakraLink,
  VStack,
  HStack,
  Divider,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Socials from "./Socials";
import Pic from "./Pic";
import Sponsors from "../components/Sponsors";
import Link from "next/link";
import useNav from "../hooks/useNav";

const FooterListItem = ({ children, justifyContent, ...props }) => {
  return (
    <Flex
      justifyContent={justifyContent || "flex-start"}
      flexGrow="1"
      w="100%"
      {...props}
    >
      {children}
    </Flex>
  );
};

const Footer = ({ sponsors, ...props }) => {
  const { navs } = useNav();
  return (
    <Box {...props}>
      <VStack spacing="4" bg="brand.black" p="4">
        <FooterListItem>
          <Pic
            src="/images/white_logo.png"
            style={{ height: 50, width: 50 }}
            fit="contain"
          />
        </FooterListItem>
        <FooterListItem>
          <Socials size="md" />
        </FooterListItem>
        <FooterListItem>
          <Divider />
        </FooterListItem>
        <FooterListItem>
          <Grid templateColumns="repeat(1, 1fr)" gap={2}>
            {navs?.map((nav) => {
              return (
                <GridItem id={nav.slug} key={nav.slug}>
                  <Link
                    href={`/${nav?.slug === "home" ? "" : nav?.slug}`}
                    passHref
                  >
                    <ChakraLink
                      fontFamily="Big Shoulders Display"
                      fontSize="xl"
                      fontWeight="bold"
                      textTransform="uppercase"
                      color="brand.light"
                    >
                      {nav.name}
                    </ChakraLink>
                  </Link>
                </GridItem>
              );
            })}
          </Grid>
        </FooterListItem>
        <FooterListItem>
          <Divider />
        </FooterListItem>
        <FooterListItem justifyContent="center">
          {sponsors && <Sponsors sponsors={sponsors} forFooter />}
        </FooterListItem>
      </VStack>
      <Flex
        justifyContent="center"
        bg="gradient.regular"
        p="4"
        alignItems="center"
      >
        <HStack
          textAlign="center"
          fontFamily="Montserrat"
          fontSize="xx-small"
          color="brand.light"
        >
          <Text m={0}>
            Copyright© | St. Louis Bombers Rugby Football Club |{" "}
            {new Date().getFullYear()}
          </Text>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Footer;
