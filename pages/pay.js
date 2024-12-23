/* eslint-disable no-unused-vars */
import { Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import Layout from "../src/common/Layout";
import DuesButtons from "../src/components/Pay/DuesButtons";
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

  const [selectedTab, setSelectedTab] = useState("Latest");
  const onTabChange = useCallback((e, d) => {
    setSelectedTab(e);
  }, []);

  // return (
  //   <Layout seo={{ metaTitle: "Pay" }}>
  //     <SimpleGrid columns={[1, 1, 2, 2]} minH="100vh" spacing="0">
  //       <Stack minH="100%" w="100%" bg="brand.light" p="8" spacing="0">
  //         <Heading color="brand.medium" size="xl">
  //           Donations
  //         </Heading>
  //         <Heading
  //           fontFamily="Staatliches"
  //           fontWeight="300"
  //           size="md"
  //           color="brand.black"
  //           minH="10%"
  //           maxH="25%"
  //           marginTop="6"
  //         >
  //           Donate to the Club! Whether you're paying your club dues or simply
  //           looking to donate to a good cause!
  //         </Heading>
  //         <PayButtons></PayButtons>
  //       </Stack>
  //       <Stack minH="100%" w="100%" bg="brand.black" p="8" spacing="0">
  //         <Heading color="brand.light" size="xl">
  //           Sponsorships
  //         </Heading>
  //         <Heading
  //           fontFamily="Staatliches"
  //           fontWeight="300"
  //           size="md"
  //           color="brand.medium"
  //           minH="10%"
  //           maxH="25%"
  //           marginTop="6"
  //         >
  //           Check out our sponsorship tiers and information!
  //         </Heading>
  //         {/* <DonateButton onApprove={onApprove}></DonateButton> */}
  //       </Stack>
  //     </SimpleGrid>
  //   </Layout>
  // );
  return (
    <Layout seo={{ metaTitle: "Pay" }}>
      <Tabs
        fontFamily="Montserrat"
        align="center"
        variant="line"
        size="lg"
        colorScheme="gray"
        value={selectedTab}
        onChange={onTabChange}
        id="content-tabs"
        defaultIndex={0}
      >
        <TabList>
          <Tab fontSize="m" fontWeight="bold">
            Donations
          </Tab>
          <Tab fontSize="m" fontWeight="bold">
            Player Dues
          </Tab>
          <Tab fontSize="m" fontWeight="bold">
            Sponsors
          </Tab>
        </TabList>
        <TabPanels my="24px">
          <TabPanel textTransform="capitalize">
            Donations
            <DonateButton></DonateButton>
          </TabPanel>
          <TabPanel textTransform="capitalize">
            Dues
            <DuesButtons></DuesButtons>
          </TabPanel>
          <TabPanel textTransform="capitalize">Sponsorships</TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default Pay;
