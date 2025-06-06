import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import BgImage from "src/common/BgImage";
import Layout from "../src/common/Layout";
const Golf = () => {
  const props = {
    buttons: [],
    image: "/static/golf.jpeg",
  };
  return (
    <Layout
      seo={{ metaTitle: "2022-golf-tournament" }}
      header="2023 Golf Tournament"
      cover={{ url: props.image, alternativeText: "golf flyer image" }}
    >
      <Stack p="8" spacing="8" id="form">
        <Heading
          size="2xl"
          color="brand.black"
          mb="8"
          textAlign="center"
          w="100%"
        >
          Its time for the 2022 St. Louis Bombers Open!
        </Heading>
        <Flex justifyContent="flex-start" alignItems="flex-start" p="8">
          <Box flexGrow="1" width="50%" mb="8" mr="8">
            <Text
              fontSize="xl"
              fontFamily="Helvetica"
              fontWeight="light"
              color="brand.medium"
            >
              Get your teams signed up today to reserve your spot! We had over
              180 golfers last year and looking to repeat this year. Interested
              in becoming a Sponsor or Donor, contact{" "}
              <Link
                href="mailto:events@stlouisbombers.com"
                target="_blank"
                textDecoration="underline"
                color="brand.black"
              >
                events@stlouisbombers.com
              </Link>
            </Text>
          </Box>
          <Box flexGrow="1" width="50%">
            <BgImage src="/images/golf2.jpeg"></BgImage>
          </Box>
        </Flex>
      </Stack>
    </Layout>
  );
};

export default Golf;
