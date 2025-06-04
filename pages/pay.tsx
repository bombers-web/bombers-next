/* eslint-disable no-unused-vars */
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Layout from "../src/common/Layout";
import DuesSection from "../src/components/Pay/DuesSection";
import DonateSection from "../src/components/Pay/DonateSection";
import Sponsorships from "../src/components/Pay/Sponsorships";
import { fetchAPI } from "../src/lib/api";
import { useRouter } from "next/router";

const Pay = (props) => {
  const [sponsors, setSponsors] = useState([]);
  const { subscriptions } = props;
  const router = useRouter();

  const tabMap = {
    donations: 0,
    dues: 1,
    sponsors: 2,
  };

  const subtabMap = {
    player: 0,
    supporter: 1,
  };

  const [tabIndex, setTabIndex] = useState(0);
  const [subtabIndex, setSubtabIndex] = useState(0);

  useEffect(() => {
    const tab = Array.isArray(router.query.tab)
      ? router.query.tab[0]
      : router.query.tab;
    const subtab = Array.isArray(router.query.subtab)
      ? router.query.subtaab[0]
      : router.query.subtab;

    if (tab && tabMap[tab.toLowerCase()] !== undefined) {
      setTabIndex(tabMap[tab.toLowerCase()]);
    }

    if (subtab && subtabMap[subtab.toLowerCase()] !== undefined) {
      setSubtabIndex(subtabMap[subtab.toLowerCase()]);
    }
  }, [router.query, router.asPath]);

  useEffect(() => {
    fetchAPI("/sponsors?populate=*")
      .then((val) => {
        if (val) {
          setSponsors(val);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleTabChange = (index) => {
    const tabKeys = Object.keys(tabMap);
    const tabName = tabKeys.find((key) => tabMap[key] === index) || "donations";

    router.push(`/pay?tab=${tabName}`, undefined, { shallow: true });
    setTabIndex(index);
  };

  const handleSubtabChange = (index) => {
    const subtabKeys = Object.keys(subtabMap);
    const subtabName =
      subtabKeys.find((key) => subtabMap[key] === index) || "player";

    router.push(`/pay?tab=dues&subtab=${subtabName}`, undefined, {
      shallow: true,
    });
    setSubtabIndex(index);
  };

  return (
    <Layout
      seo={{
        metaTitle: "Pay",
        metaDescription: "Dues, Donations and Sponsorships",
      }}
    >
      <Tabs
        fontFamily="Montserrat"
        align="center"
        variant="line"
        size="lg"
        colorScheme="brand.highlight"
        id="content-tabs"
        index={tabIndex}
        onChange={handleTabChange}
      >
        <TabList>
          <Tab fontSize="m" fontWeight="bold">
            Donations
          </Tab>
          <Tab fontSize="m" fontWeight="bold">
            Club Dues
          </Tab>
          <Tab fontSize="m" fontWeight="bold">
            Sponsors
          </Tab>
        </TabList>
        <TabPanels my="24px">
          <TabPanel textTransform="capitalize">
            <DonateSection />
          </TabPanel>
          <TabPanel textTransform="capitalize">
            <DuesSection
              subscriptions={subscriptions}
              subtabIndex={subtabIndex}
              onSubtabChange={handleSubtabChange}
            />
          </TabPanel>
          <TabPanel textTransform="capitalize">
            <Sponsorships sponsors={sponsors} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [subscriptions] = await Promise.all([
    fetchAPI("/subscriptions?populate=*"),
  ]);
  return {
    props: {
      subscriptions,
    },
  };
}

export default Pay;
