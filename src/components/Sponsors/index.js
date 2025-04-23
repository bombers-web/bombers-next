/* eslint-disable no-unused-vars */
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Pic from "../../common/Pic";
import useBp from "../../../theme/useBp";
import { SponsorContainer, SponsorsTitle, SponsorList } from "./styles";
import { fetchAPI } from "../../lib/api";
import Image from "next/image";

const Sponsors = ({ forFooter, ...props }) => {
  const [sponsors, setSponsors] = useState([]);
  const [_columns, setColumns] = useState(sponsors.length);
  const { isDesktop } = useBp();

  useEffect(() => {
    setColumns(isDesktop ? sponsors?.length : 2);
  }, [isDesktop, sponsors.length]);

  useEffect(() => {
    fetchAPI("/sponsors?populate=*")
      .then((val) => {
        if (val) {
          setSponsors(val);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return forFooter ? (
    <Flex direction="row" flexWrap={"wrap"} gap={4} justifyContent={"center"}>
      {sponsors?.map((sponsor) => {
        const logo = sponsor?.image?.url || sponsor.logo;
        return (
          <Box key={sponsor?.name}>
            <Pic
              style={{
                width: 60,
                height: 60,
                opacity: 0.7,
                zoom: 1,
              }}
              src={logo}
              fit="contain"
            ></Pic>
          </Box>
        );
      })}
    </Flex>
  ) : (
    <SponsorContainer>
      <SponsorList>
        {sponsors?.map((sponsor) => (
          <Box minW={100} minH={100}>
            <Image
              height={250}
              width={250}
              className="sponsor_image"
              src={sponsor.image.url || sponsor.logo}
            ></Image>
          </Box>
        ))}
      </SponsorList>
    </SponsorContainer>
  );
};

export default Sponsors;
