import { Flex, HStack, Link } from "@chakra-ui/react";
import LoginButton from "src/common/LoginButton";
import NavLogo from "../../../common/NavLogo";
import Socials from "../../../common/Socials";
import useNav from "../../../hooks/useNav";

// type MenuItemProps = {
//   theme: any;
//   outlined?: boolean;
// };

// const MenuItem = styled(Box)`
//   ${(props: MenuItemProps) => ({
//     padding: props.outlined ? "4px" : "inherit",
//     border: props.outlined ? "3px solid white" : "none",
//     ...props.theme?.fonts?.menuItem,
//   })}
//   opacity: 0.75;
//   :hover {
//     opacity: 1;
//   }
// `;

const TopNav = () => {
  const { navs } = useNav();

  return (
    <HStack
      minH={["50px", "75px", "50px", "50px"]}
      maxH="100px"
      bg="gradient.regular"
      flexGrow="2"
      justifyContent="center"
      id="topbar"
      display={["none", "none", "flex", "flex"]}
      alignItems="center"
    >
      <Flex w="100%" mx={8} justifyContent="flex-end" maxW="1180px">
        <NavLogo color="brand.light" size="md" logoOnly />
        {navs.map((nav) => {
          return (
            <Link
              key={nav.slug}
              style={{
                textDecoration: "none",
                alignSelf: "center",
              }}
              href={nav.slug}
            >
              {nav.name}
              {/* <MenuItem className="desktop-menu-item">{nav.name}</MenuItem> */}
            </Link>
          );
        })}
        <Socials />
        <LoginButton />
      </Flex>
    </HStack>
  );
};

export default TopNav;
