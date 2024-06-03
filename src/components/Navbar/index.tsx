import { Box } from "@chakra-ui/react";
import styles from "./Navbar.module.scss";
import { DesktopNav, MobileNav } from "./navs";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from "next/router";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Nav = ({ ...props }) => {
  const router = useRouter();

  useGSAP(() => {
    gsap.to(".main-nav-bar", {
      scrollTrigger: ".scrollable",
    });
  }, []);

  return (
    <Box className={`${styles["nav-container"]} main-nav-bar`} {...props}>
      <MobileNav homePage={router.route === "/"} />
      <DesktopNav homePage={router.route === "/"} />
    </Box>
  );
};

export default Nav;
