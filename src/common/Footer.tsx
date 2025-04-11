import { Link, Text, Box } from "@chakra-ui/react";
import useNav from "../hooks/useNav";
import NavLogo from "./NavLogo";
import Socials from "./Socials";
import Sponsors from "../components/Sponsors";
import {
  Copyright,
  FooterContainer,
  FooterIcons,
  FooterInfo,
  FooterLinks,
} from "./styles";

const Footer = (_props) => {
  const { navs, shortest } = useNav(["Club", "Team"]);
  return (
    <Box>
      <FooterContainer id="footer">
        <FooterInfo>
          <NavLogo color="brand.light" />
          <FooterIcons>
            <Socials size="" />
            <Sponsors forFooter={true} />
          </FooterIcons>
        </FooterInfo>
        <FooterLinks>
          {navs.map((item, i) => {
            return item.subMenus ? (
              <ul className={`col col-${i + 1}`} key={item.id}>
                <>
                  {<li className="header">{item.name}</li>}
                  {item.subMenus?.slice(0, shortest).map((link, index) =>
                    link.name !== "more" ? (
                      <Link
                        key={`link-${item.id}-${index}`}
                        style={{
                          textDecoration: "none",
                          alignSelf: "center",
                        }}
                        href={"/" + link.slug}
                      >
                        {link.name}
                      </Link>
                    ) : null
                  )}
                </>
              </ul>
            ) : null;
          })}
        </FooterLinks>
      </FooterContainer>
      <Copyright backgroundColor="brand.dark">
        <Text size="xs" textAlign="center" mt={4}>
          © {new Date().getFullYear()} St. Louis Bombers.
        </Text>
      </Copyright>
    </Box>
  );
};

export default Footer;
