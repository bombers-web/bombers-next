import { Box, Flex, Link } from "@chakra-ui/react";
import styled from "@emotion/styled";
import NavLogo from "../../../common/NavLogo";
import useNav from "../../../hooks/useNav";
import LoginButton from "src/common/LoginButton";
import Socials from "../../../common/Socials";

type MenuItemProps = {
  theme: any;
  outlined?: boolean;
};

type DesktopNavProps = {
  homePage: boolean;
};

const MenuItem = styled(Box)`
  ${(props: MenuItemProps) => ({
    padding: props.outlined ? "4px" : "0px",
    border: props.outlined ? "3px solid white" : "none",
    alignContent: "center",
    ...props.theme?.fonts?.menuItem,
  })}
  opacity: .75;
  :hover {
    opacity: 1;
    color: var(--chakra-colors-brand-highlight);
  }
`;

const DesktopNav = ({ homePage }: DesktopNavProps) => {
  const { navs } = useNav();
  return (
    <Flex
      id="desktop-nav-container"
      bg={homePage ? "linear-gradient(#2d2d2dc1, transparent);" : "brand.dark"}
      minH="100px"
      minW="100vw"
      display={["none", "none", "flex", "flex"]}
      justifyContent="center"
      alignItems="center"
      px="16px"
      pb="8px"
      position={homePage ? "fixed" : "inherit"}
    >
      <Flex justifyContent="center" maxW="1180px" w="100%" alignItems="center">
        <Box flex="1">
          <NavLogo color="brand.light" size="md" logoOnly />
        </Box>
        <Flex
          grow="1"
          flex="2"
          flexDir="row"
          width="100%"
          height="100%"
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {navs.map((nav) => {
            return (
              <Link
                key={nav.slug}
                style={{
                  textDecoration: "none",
                }}
                href={nav.slug}
              >
                <MenuItem className="desktop-menu-item">{nav.name}</MenuItem>
              </Link>
            );
          })}
        </Flex>
        <Flex
          grow="1"
          flex="1"
          flexDir="row"
          width="100%"
          height="100%"
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Link
            style={{
              textDecoration: "none",
            }}
            href="/pay"
          ></Link>
          <Socials />
          <LoginButton />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DesktopNav;
