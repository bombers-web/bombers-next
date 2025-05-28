import Layout from "src/common/Layout";
import WatchCard from "../../src/components/Watch/WatchCard";
import { SimpleGrid } from "@chakra-ui/react";

const Watch = () => {
  const streamingSources = [
    {
      name: "Ahlmeyer Sports Productions",
      href: "https://www.youtube.com/@asp-ahlemeyersportsproduct192/featured",
    },
    {
      name: "Bombers Youtube",
      href: "https://www.youtube.com/@st.louisbombersrugby8391",
      bg: "/static/schoeman_dallas.JPG",
    },
    {
      name: "Bombers VEO (Mobile Only",
      href: "https://veolive.page.link/R72N",
      bg: "/static/feakes_belmont.JPG",
    },
  ];

  return (
    <>
      <Layout header="Watch Info" seo={{ metaTitle: "Watch" }} margin>
        <SimpleGrid
          height="100%"
          columns={[1, 3]}
          spacing={[2, 2]}
          m={[0, 0, 8, 16]}
        >
          {streamingSources.map((source) => {
            return (
              <WatchCard name={source.name} href={source.href} bg={source.bg} />
            );
          })}
        </SimpleGrid>
      </Layout>
    </>
  );
};

export default Watch;
