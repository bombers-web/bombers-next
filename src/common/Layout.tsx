import { Box, Flex } from "@chakra-ui/react";

import { PropsWithChildren } from "react";
import Nav from "../components/Navbar";
import { SeoType } from "../types/seoTypes";
// import { Sponsors } from "../types/sponsors";
import Footer from "./Footer";
import Seo from "./Seo";

type LayoutProps = {
  // sponsors?: Array<Sponsors>;
  seo: SeoType;
  header?: string;
  subheader?: string;
  bg?: string;
  mainBg?: string;
  id?: string;
  cover?: {
    full?: boolean;
    url: string;
    size?: string;
    alternativeText?: string;
  };
};

const Layout = ({
  children,
  seo,
  header,
  subheader,
  bg,
  mainBg,
  cover,
  id,
}: PropsWithChildren<LayoutProps>) => {
  return (
    <Box id={id}>
      <Seo seo={seo} />
      <Flex direction="column" bg={bg} id="layout">
        <Nav as="nav" />
        <Box
          className="scrollable"
          id="main"
          as="main"
          h="100%"
          flex="1 0 100%"
          minH={"80vh"}
          overflowY="hidden"
          bg={mainBg || "brand.light"}
        >
          {children}
        </Box>
        <Footer />
      </Flex>
    </Box>
  );
};

export default Layout;
