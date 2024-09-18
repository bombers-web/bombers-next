import Layout from "src/common/Layout";
import { Link, Box, SimpleGrid } from "@chakra-ui/react";
import IndexLayout from "components/IndexLayout";

const Watch = () => {
  const streamingSources = [
    {
      name: "Ahlmeyer Sports Productions",
      href: "https://www.youtube.com/@asp-ahlemeyersportsproduct192/featured",
    },
    {
      name: "Bombers Youtube",
      href: "https://www.youtube.com/channel/UCHgkyW1v70rioXkrQJVdMWQ",
    },
    {
      name: "Bombers VEO",
      href: "https://veolive.page.link/R72N",
    },
  ];

  return (
    <>
      <Layout
        header="Watch Info"
        seo={{ metaTitle: "bombers watch information" }}
        margin
      >
        <Box h="100vh">
          <IndexLayout items={streamingSources} />;
        </Box>
      </Layout>
    </>
  );
};

export default Watch;
