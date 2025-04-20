import { Box, Flex, Heading } from "@chakra-ui/react";
import Mdx from "../../../src/common/Mdx";
import Layout from "../../../src/common/Layout";
import { fetchAPI } from "../../../src/lib/api";
import Pic from "common/Pic";
import { Block } from "src/types/pageTypes";

const Practice = ({ practice }) => {
  return (
    <Layout
      header="Practice"
      cover={{
        url: "/static/willmore_park.jpg",
        alternativeText: "Practice",
      }}
      seo={{
        metaTitle: "Practice",
        shareImage: "/static/willmore_park.jpg",
        metaDescription: "Practice",
      }}
    >
      {practice?.section?.map((section: Block) => {
        const mobileDirection =
          section.imagePosition === "end" ? "column" : "column-reverse";
        const webDirection =
          section.imagePosition === "end" ? "row" : "row-reverse";

        return (
          <Flex flexDirection="column" m="8" p="8" gap="8" key={section.id}>
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
                    src={section.image ? null : "/static/willmore_park.jpg"}
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
  const [practice] = await Promise.all([fetchAPI("/practice?populate=*")]);

  return {
    props: {
      practice,
    },
  };
}
export default Practice;
