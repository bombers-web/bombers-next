import React from "react";
import {
  MobileCard,
  MobileCardCta,
  MobileCardDescription,
  MobileCardTitle,
  MobileReelContainer,
} from "./styles";
import { Content } from "../../types/newsTypes";

const MobileReel = ({ contents }) => {
  return (
    <MobileReelContainer>
      {contents.map((content: Content) => {
        return (
          <MobileCard
            bg={content?.image?.formats.large.url}
            key={content.title}
          >
            <MobileCardDescription>
              <MobileCardTitle>{content.title}</MobileCardTitle>
              <MobileCardCta>Read More</MobileCardCta>
            </MobileCardDescription>
          </MobileCard>
        );
      })}
    </MobileReelContainer>
  );
};

export default MobileReel;
