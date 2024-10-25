import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import useNav from "hooks/useNav";
import IndexLayout from "../../src/components/IndexLayout";
import Card from "../../src/common/Card";
import Layout from "../../src/common/Layout";

const TeamHome = () => {
  const { navs } = useNav();
  const teamSubMenu = navs[3].subMenus;

  return (
    <Layout seo={{ metaTitle: "Team" }} header="Players and Staff">
      <IndexLayout items={teamSubMenu}></IndexLayout>
    </Layout>
  );
};

export default TeamHome;
