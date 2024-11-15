import React from "react";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabIndicator,
} from "@chakra-ui/react";
import Results from "./Results";
import Schedule from "./Schedule";
import Tables from "./Tables";

const ScheduleTabs = ({ games = [] }) => {
  const tabs = ["Schedule", "Results", "Tables"];
  const upcoming = games?.filter((game) => !game.finished);
  const results = games?.filter((game) => game.finished);
  const division = "d3";

  return (
    <Tabs align="center" colorScheme="brand.meta">
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab + "tab"}>{tab}</Tab>
        ))}
      </TabList>
      {/* <TabIndicator
        mt="-5px"
        height="2px"
        bg="brand.black"
        borderRadius="1px"
      /> */}
      <TabPanels>
        <TabPanel>
          <Schedule upcoming={upcoming} />
        </TabPanel>
        <TabPanel>
          <Results results={results || []} />
        </TabPanel>
        <TabPanel>
          <Tables division={division} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ScheduleTabs;
