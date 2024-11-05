import { Box, Flex, Heading } from "@chakra-ui/react";
import Form from "common/Form";
import Hero from "common/Hero";
import Mdx from "common/Mdx";
import Pic from "common/Pic";
import Layout from "common/Layout";

import { fetchAPI } from "lib/api";
import Link from "next/link";
import { Block } from "src/types/pageTypes";

// TODO: causing build failures, IS IT NEEDED?
const Dynamic = ({ page }) => {
  if (!page) return null;
  return (
    <Layout
      seo={page.Seo}
      header={page.Seo.metatitle}
      cover={{
        url: page.Seo?.shareImage?.url,
      }}
    >
      {page.block?.map((block: Block) => {
        const mobileDirection =
          block.imagePosition === "end" ? "column" : "column-reverse";
        const webDirection =
          block.imagePosition === "end" ? "row" : "row-reverse";
        return {
          "sections.hero": (
            <Hero
              title={block.title}
              size={block.size || "xl"}
              subTitle={block.subTitle}
              // image={block.image}
              // backButton={block.backButton}
              links={block.buttons}
              contentLink={block.contentLink}
              // direction={block.direction}
              // startPic={block.startPic}
            />
          ),
          "sections.section": (
            <>
              {block.display && (
                <Flex flexDirection="column" m="8" p="8" gap="8">
                  <Heading>{block.title}</Heading>
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
                        <Mdx>{block.content}</Mdx>
                      </Box>
                      {block.image?.url ? (
                        <Box flex={1} alignSelf={block.imagePosition}>
                          <Pic
                            style={{
                              marginTop: "2rem",
                            }}
                            size={["lg", "sm", "md", "lg", "xl"]}
                            image={block.image}
                            borderRadius={5}
                          ></Pic>
                        </Box>
                      ) : null}
                    </Flex>
                  </Flex>
                  <div>
                    {block?.links?.map((link) => (
                      <Link href={`/${link.link}`} passHref>
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </Flex>
              )}
            </>
          ),
          "sections.form": (
            <Form fields={block.field} title={block.title}></Form>
          ),
        }[block.__component];
      })}
    </Layout>
  );
};

export async function getStaticPaths() {
  const pages = await fetchAPI("/pages?populate=*");
  return {
    paths: pages.map((page) => ({
      params: {
        slug: page.slug || "/404",
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const [page] =
    (await fetchAPI(
      `/pages?populate[0]=block.image&populate[1]=Seo&filters[slug][$eq]=${params.slug}`
    )) || {};
  return {
    props: { key: page.id, page },
  };
}

export default Dynamic;
