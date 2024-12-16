/* eslint-disable no-unused-vars */
import { Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../src/common/Layout";
import PayButtons from "../src/components/Pay/PayButtons";

const Pay = () => {
  const [_success, setSuccess] = useState(false);

  const onApprove = (data, actions) => {
    alert(data.subscriptionID);
    setSuccess(true);
  };

  const createSubscription = (data, actions) => {
    return actions.subscription.create({
      plan_id: "P-9NL41251R87142636MDWJ6MI",
    });
  };

  return (
    <Layout seo={{ metaTitle: "Pay" }}>
      <SimpleGrid columns={[1, 1, 2, 2]} minH="100vh" spacing="0">
        <Stack minH="100%" w="100%" bg="brand.light" p="8" spacing="0">
          <Heading color="brand.medium" size="xl">
            Donations
          </Heading>
          <Heading
            fontFamily="Staatliches"
            fontWeight="300"
            size="md"
            color="brand.black"
            minH="10%"
            maxH="25%"
            marginTop="6"
          >
            Donate to the Club! Whether you're paying your club dues or simply
            looking to donate to a good cause!
          </Heading>
          <PayButtons></PayButtons>
        </Stack>
        <Stack minH="100%" w="100%" bg="brand.black" p="8" spacing="0">
          <Heading color="brand.light" size="xl">
            Sponsorships
          </Heading>
          <Heading
            fontFamily="Staatliches"
            fontWeight="300"
            size="md"
            color="brand.medium"
            minH="10%"
            maxH="25%"
            marginTop="6"
          >
            Check out our sponsorship tiers and information!
          </Heading>
          {/* <DonateButton onApprove={onApprove}></DonateButton> */}
        </Stack>
      </SimpleGrid>
    </Layout>
  );
};

export default Pay;
