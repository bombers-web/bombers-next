/* eslint-disable no-unused-vars */
import { Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../src/common/Layout";
import { PayPalButtons } from "@paypal/react-paypal-js";
import PayButtons from "../src/components/Pay/PayButtons";
import VenmoButton from "../src/components/Pay/VenmoButton";
import DonateButton from "../src/components/Pay/DonateButton";

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
        <Stack minH="100%" w="100%" bg="brand.light" p="8" spacing="8">
          <Heading color="brand.medium" size="xl">
            Current Players
          </Heading>
          <Heading
            fontFamily="Staatliches"
            fontWeight="300"
            size="md"
            color="brand.black"
            minH="10%"
            maxH="25%"
          >
            Pay dues below. There is an option to sign up for a monthly
            subscription or you can pay in full
          </Heading>
          {/* <VenmoButton></VenmoButton> */}
          <PayButtons></PayButtons>
        </Stack>
        <Stack minH="100%" w="100%" bg="brand.black" p="8" spacing="8">
          <Heading color="brand.light" size="xl">
            Donations
          </Heading>
          <Heading
            fontFamily="Staatliches"
            fontWeight="300"
            size="md"
            color="brand.medium"
            minH="10%"
            maxH="25%"
          >
            If you would like to donate you can reach out to us or click on the
            paypal below
          </Heading>
          {/* <DonateButton onApprove={onApprove}></DonateButton> */}
        </Stack>
      </SimpleGrid>
    </Layout>
  );
};

export default Pay;
