import Layout from "src/common/Layout";
import WatchCard from "../../src/components/Watch/WatchCard";
import { SimpleGrid } from "@chakra-ui/react";

const Watch = () => {
  const streamingSources = [
    {
      name: "Ahlmeyer Sports Productions",
      href: "https://www.youtube.com/@asp-ahlemeyersportsproduct192/featured",
      link: "null",
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
        <SimpleGrid columns={[1, 3]} spacing={[2, 2]} m={[3]}>
          {streamingSources.map((source) => {
            return <WatchCard name={source.name} href={source.href} />;
          })}
        </SimpleGrid>
      </Layout>
    </>
  );
};

export default Watch;
