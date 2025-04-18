/* eslint-disable no-unused-vars */
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useCallback, useState, useEffect } from "react";
import Layout from "../src/common/Layout";
import DuesSection from "../src/components/Pay/DuesSection";
import DonateSection from "../src/components/Pay/DonateSection";
import Sponsorships from "../src/components/Pay/Sponsorships";
import { fetchAPI } from "../src/lib/api";

const Pay = () => {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    fetchAPI("/sponsors?populate=*")
      .then((val) => {
        if (val) {
          setSponsors(val);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const [selectedTab, setSelectedTab] = useState("Latest");
  const onTabChange = useCallback((e, d) => {
    setSelectedTab(e);
  }, []);

  return (
    <Layout seo={{ metaTitle: "Pay" }}>
      <Tabs
        fontFamily="Montserrat"
        align="center"
        variant="line"
        size="lg"
        colorScheme="brand.highlight"
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
            <DonateSection></DonateSection>
          </TabPanel>
          <TabPanel textTransform="capitalize">
            <DuesSection></DuesSection>
          </TabPanel>
          <TabPanel textTransform="capitalize">
            <Sponsorships sponsors={sponsors}></Sponsorships>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default Pay;
