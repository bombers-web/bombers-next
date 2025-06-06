import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { groupBy } from "lodash";
import React from "react";
import Layout from "../../src/common/Layout";
import { fetchAPI } from "../../src/lib/api";
import ScheduleTabs from "./components/ScheduleTabs";
import Calender from "./components/Calender";

const Schedule = ({ games, calenders }) => {
  const { d1, d2 } = groupBy(games, "division");
  const seo = {
    metaTitle: "Schedule",
  };

  return (
    <Layout seo={seo}>
      {/* <Hero
        text="Schedule"
        image="/images/nationals17.jpg"
        size={isDesktop ? "md" : "xl"}
        contentLink="#schedule"
      /> */}
      <Box maxW="1180px" justifyContent={"center"} mx="auto" mt={8} mb={4}>
        <Tabs
          id="schedule"
          isFitted
          size="lg"
          colorScheme="brand.meta"
          fontWeight="bold"
          fontFamily="Big Shoulders Display"
          fontSize="xl"
          color="brand.black"
        >
          <TabList>
            <Tab>Bombers DI</Tab>
            <Tab>Bombers DII</Tab>
            <Tab>Club Events</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ScheduleTabs games={d1}></ScheduleTabs>
            </TabPanel>
            <TabPanel>
              <ScheduleTabs games={d2}></ScheduleTabs>
            </TabPanel>
            <TabPanel>
              <Calender calenders={calenders}></Calender>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
};

export async function getStaticProps() {
  const [games, calenders] = await Promise.all([
    fetchAPI(
      "/games?populate[0]=home.logo&populate[1]=away.logo&populate=winner&sort[0]=date:asc"
    ),
    fetchAPI("/calenders?populate[0]=calender"),
  ]);

  return {
    props: {
      games,
      calenders,
    },
    // refetch every day
    revalidate: 86400,
  };
}

export default Schedule;
