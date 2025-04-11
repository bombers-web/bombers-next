import { Box, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import { MatchType } from "src/types/matchTypes";

const MatchTeamsContainer = styled(Box)`
  display: flex;
  align-items: center;
flex: 1;
  margin: 8px 0;
  @media (min-width: 992px) {
    margin: 0 40px 0 0;
  }
`;

const TeamLogoContainer = styled(Box)`
  width: 48px;
  height: 48px;
display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 3px;
  @media (min-width: 992px) {
    width: 72px;
    height: 72px;
  }
`;

const TeamMatchVs = styled.h2`
  font-family: "Poppins", "Helvetica Neue", Arial, sans-serif;
  margin: 0 16px;
  opacity: 0.5;
  font-weight: 900;
  font-size: 26px;
  line-height: 20px;
  color: var(--chakra-colors-brand-light);
  @media (min-width: 1200px) {
    letter-spacing: -1px;
    line-height: 50px;
    font-size: 46px;
  }
`;

const TeamContainer = styled(Box)`
  margin: 0;
  padding: 0;
  justify-items: center;
`;

const TeamName = styled(Text)`
  color: var(--chakra-colors-brand-lightSecondary);
  margin: 0;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: small;
  text-align: center;
  line-height: 1;
`;



const MatchTeams = ({ match }: { match: MatchType }) => {
  const { home, away } = match;

  return (
    <MatchTeamsContainer>
      <TeamContainer>
        <TeamLogoContainer>
          <Image
            alt={home?.name}
            src={home?.logo?.formats.small.url}
            style={{ objectFit: "cover" }}
            fill
          />
        </TeamLogoContainer>
        <TeamName>{home.name}</TeamName>
      </TeamContainer>
      <TeamMatchVs>v</TeamMatchVs>
      <TeamContainer>
        <TeamLogoContainer>
          <Image
            alt={away?.name}
            src={away?.logo?.formats.small.url}
            style={{ objectFit: "cover" }}
            fill
          />
        </TeamLogoContainer>
        <TeamName>{away.name}</TeamName>
      </TeamContainer>
    </MatchTeamsContainer>
  );
};

export default MatchTeams;
