import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import Layout from "../src/common/Layout";
import Image from "next/image";

const Fof = () => {
  return (
    <Layout
      seo={{
        metaTitle: "Oops! 404 Error",
      }}
      header="Page not found"
      mainBg="#fff"
    >
      <Flex flexDirection="column" alignItems="center">
        <Text fontWeight="bold" fontSize="3xl" fontFamily="body">
          404: This is obviously not the page you are looking for...
        </Text>
        <Box objectFit="cover">
          <Image
            alt="404 error"
            src="/static/hinson_404.JPG"
            // style={{ objectFit: fit, objectPosition: position }}
            quality={80}
            width={800}
            height={800}
          ></Image>
        </Box>
        <Text fontWeight="bold" fontSize="xl" fontFamily="body">
          Here are some links to get you back on track...
        </Text>
      </Flex>
    </Layout>
  );
};

export default Fof;
