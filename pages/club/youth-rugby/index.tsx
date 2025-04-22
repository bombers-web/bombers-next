import { Box, Flex, Heading } from "@chakra-ui/react";
import Mdx from "../../../src/common/Mdx";
import Layout from "../../../src/common/Layout";
import { fetchAPI } from "../../../src/lib/api";
import Pic from "common/Pic";
import { Block } from "src/types/pageTypes";

const defaultJetsPics = [
  "/static/jets_team_2.jpg",
  "/static/lucas_jets.jpg",
  "/static/jets_team.jpg",
  "/static/jets_mark.jpg",
];

const YouthRugby = ({ youthRugby }) => {
  return (
    <Layout
      header="Youth Rugby"
      cover={{
        url: "/static/jets_mark.jpg",
        alternativeText: "Youth Rugby",
      }}
      seo={{
        metaTitle: "Youth Rugby",
        shareImage: "/static/jets_mark.jpg",
        metaDescription: "Youth Rugby",
      }}
    >
      {youthRugby?.section?.map((section: Block, idx: number) => {
        const mobileDirection =
          section.imagePosition === "end" ? "column" : "column-reverse";
        const webDirection =
          section.imagePosition === "end" ? "row" : "row-reverse";

        return (
          <Flex
            flexDirection="column"
            m="8"
            p="8"
            gap="8"
            key={section.id}
            bg="brand.white"
            borderRadius="md"
            boxShadow="md"
            maxWidth="1140px"
          >
            <Box>
              <Heading m={0} size="xl">
                {section.title}
              </Heading>
              <Heading m={0} size="sm" color="brand.medium">
                {section.subtitle}
              </Heading>
            </Box>
            <Flex
              gap={8}
              justifyContent="space-evenly"
              alignItems="center"
              w="100%"
            >
              <Flex
                gap={16}
                w="100%"
                flexDirection={[mobileDirection, webDirection]}
              >
                <Box flex={1} h="100%">
                  <Mdx>{section.content}</Mdx>
                </Box>
                <Box flex={1} alignSelf={section.imagePosition}>
                  <Pic
                    size={["lg", "sm", "md", "lg", "xl"]}
                    image={section.image}
                    src={section.image ? null : defaultJetsPics[idx]}
                    borderRadius={5}
                  ></Pic>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [youthRugby] = await Promise.all([fetchAPI("/youth-rugby?populate=*")]);

  return {
    props: {
      youthRugby,
    },
  };
}
export default YouthRugby;
