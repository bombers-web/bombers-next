/* eslint-disable no-unused-vars */
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import Mdx from "src/common/Mdx";
import { ContentTag, ContentTime } from "src/components/NewsReel/styles";
import styled from "styled-components";
import Layout from "../../src/common/Layout";
import Pic from "../../src/common/Pic";
import ContentTitle, {
  ContentSummary,
} from "../../src/components/Content/ContentTitle";
import { fetchAPI } from "../../src/lib/api";
import { getStrapiMedia } from "../../src/lib/media";
import { max } from "lodash";

const ContentHeader = styled.div`
  font-size: 44px;
  color: white;
  font-weight: 600;
  background: linear-gradient(
    90deg,
    rgba(24, 24, 24, 1) 0%,
    rgba(33, 33, 33, 1) 35%,
    rgba(48, 48, 48, 1) 100%
  );
  padding: 16px;
  border: 4px solid white;
  width: 100%;
  text-align: center;
`;

const defaultContent = {
  image: {
    url: "",
  },
  title: "",
  description: "",
  author: {},
  published_at: "",
  content: "",
};

const Content = ({ content, context }) => {
  const router = useRouter();
  const imageUrl = content?.image;

  const seo = {
    metaTitle: content?.title,
    metaDescription: content?.description,
    shareImage: content?.image,
    content: true,
  };

  // const meta = [
  //   {
  //     name: "category",
  //     type: "categoryTag",
  //     Component: ContentTag,
  //     content: content?.category?.name || "Story",
  //   },
  //   {
  //     name: "publishedAt",
  //     type: "dateTag",
  //     Component: ContentTime,
  //     content: formatDistanceToNow(new Date(1995, 6, 2), {
  //       addSuffix: true,
  //       locale: {
  //         ...enUS,
  //         formatDistance: (unit, count) => {
  //           switch (true) {
  //             case unit === "xDays":
  //               return `${count} d`;

  //             case unit === "aboutXDays":
  //               return `${count} days ago`;

  //             case unit === "aboutXHours":
  //               return `${count} hrs ago`;
  //             case unit === "aboutXYears":
  //               return `${count} years ago`;

  //             case unit === "xMinutes":
  //               return `${count} min ago`;

  //             case unit === "xMonths":
  //               return `${count} mo. ago`;
  //             case unit === "aboutXMonths":
  //               return `${count} mo. ago`;

  //             case unit === "xSeconds":
  //               return "just now";

  //             case unit === "xYears":
  //               return `${count} y`;

  //             default:
  //               return "%d hours";
  //           }
  //         },
  //       },
  //     }),
  //   },
  // ];

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout
      cover={{ url: imageUrl, alternativeText: content.description }}
      seo={seo}
      mainBg="brand.black"
    >
      <>
        <Flex
          bg="brand.light"
          py="70px"
          justifyContent="flex-start"
          h="100%"
          id={content?.uid || "start"}
          borderRadius="20px 20px 0 0"
          position="relative"
          top="-10px"
          w="100%"
          m="auto"
        >
          <Flex
            w="100%"
            m="auto"
            p="8"
            h="50%"
            maxW={["100%", "100%", "1180px"]}
            bg="brand.white"
            boxShadow="lg"
            direction="column"
            justifyContent="center"
          >
            <ContentTitle
              fontSize={["2xl", "3xl", "4xl"]}
              lineHeight={[1, 1.5, 2]}
            >
              {content?.title}
            </ContentTitle>
            <ContentSummary as="p">{content?.description}</ContentSummary>
            {content?.image && (
              <Pic
                image={content.image || ""}
                objectFit="contain"
                style={{
                  position: "static",
                  width: "100%",
                  height: "auto",
                  maxWidth: "1180px",
                }}
              />
            )}
            <Flex gap="4" justify="flex-end" marginTop="4">
              <Box m="0">
                <Pic
                  image={content?.writer.picture || ""}
                  style={{
                    position: "static",
                    borderRadius: "50%",
                    height: 30,
                  }}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                w="100%"
              >
                <Box>
                  <Text margin="0">
                    By {content?.writer?.name || "Anonymous"}
                  </Text>
                  <Text className="uk-text-meta uk-margin-remove-top">
                    {format(new Date(content.publishedAt), "PPPp")}
                  </Text>
                </Box>
              </Box>
            </Flex>
            <Flex py="4" gap="8px">
              <EmailShareButton>
                <EmailIcon size={32} round></EmailIcon>
              </EmailShareButton>
              <FacebookShareButton
                url={`${process.env.HOST_URL || "http://localhost:3000"}${
                  router.asPath
                }`}
                quote={"Dummy text!"}
                hashtag="#muo"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={`${process.env.HOST_URL || "http://localhost:3000"}${
                  router.asPath
                }`}
                quote={"Dummy text!"}
                hashtag="#muo"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <WhatsappShareButton>
                <WhatsappIcon size={32} round></WhatsappIcon>
              </WhatsappShareButton>
              <FacebookMessengerShareButton>
                <FacebookMessengerIcon size={32} round></FacebookMessengerIcon>
              </FacebookMessengerShareButton>
            </Flex>
            <Divider size="1px" variant="solid" m="8" color="brand.black" />
            <Flex
              justifyContent="flex-start"
              m="auto"
              alignItems="flex-start"
              direction="column"
            >
              {content?.tagline && (
                <Heading as="h3" size="lg" color="brand.highlight" my="4">
                  {content.tagline || ""}
                </Heading>
              )}
              <Box textAlign="justify" mb="10" pb="10">
                <Mdx>{content?.content}</Mdx>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </>
    </Layout>
  );
};

export async function getStaticPaths() {
  const contents = (await fetchAPI("/contents?populate=*")) || [];
  return {
    paths: contents.map((content) => ({
      params: {
        slug: content?.slug || "2024-champs",
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [content] =
    (await fetchAPI(
      `/contents?populate[0]=writer.picture&populate[1]=image&sort[0]=published:desc&filters[slug][$eq]=${params.slug}`
    )) || {};
  return {
    props: { content },
    // refetch every 2 weeks
    revalidate: 1209600,
  };
}

export default Content;
