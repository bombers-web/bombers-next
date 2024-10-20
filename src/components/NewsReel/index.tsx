import useFeatures from "../../hooks/useFeatures";
import { formatDistance } from "date-fns";
import Link from "next/link";
import {
  ContentTag,
  ContentTime,
  HeroContainer,
  HeroTile,
  HeroTileDescription,
  HeroTileGradient,
  HeroTileImage,
  HeroTileImageContainer,
  HeroTileMeta,
  HeroTileMetaData,
  HeroTileTitle,
  HeroTitleExplainer,
} from "./styles";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useCallback } from "react";
import { useMediaQuery } from "@chakra-ui/react";
import MobileReel from "./MobileReel";
import React from "react";
import { Content } from "../../types/newsTypes";
import { Formats } from "../../types/imageTypes";

const NewsReel = ({ contents }) => {
  const features = useFeatures(contents);

  const reduceFormats = (formats: Formats) =>
    Object.entries(formats).reduce((acc, [k, v]) => {
      return [...acc, { format: k, ...v }];
    }, []);

  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  const [isSmallerThan425] = useMediaQuery("(max-width: 425px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  const getHeroClassName = useCallback(
    (i: number) => {
      if (isSmallerThan1024 && i === 0) {
        return "hero_tile__large";
      }
      if (isSmallerThan1024 && i !== 0) {
        return "hero_tile__small";
      }
      if (!isSmallerThan1024) return "";
    },
    [isSmallerThan1024]
  );

  return isSmallerThan425 ? (
    <MobileReel contents={contents} />
  ) : (
    <HeroContainer id="hero-container">
      {features?.map((feature: Content, i: number) => {
        return (
          <Link
            href={`/contents/${feature.category.name}/${feature.uid}`}
            passHref
            key={feature?.uid}
            legacyBehavior
          >
            <HeroTile className={getHeroClassName(i)}>
              <HeroTileImageContainer>
                {reduceFormats(feature.image.formats).map((format) => {
                  return (
                    <source
                      key={format.format}
                      srcSet={`${format.url} 2x`}
                    ></source>
                  );
                })}
                <HeroTileImage src={feature?.image?.url}></HeroTileImage>
              </HeroTileImageContainer>
              <HeroTitleExplainer>
                <HeroTileTitle className="hero_tile__title">
                  {feature.title}
                </HeroTileTitle>
                <HeroTileDescription className="hero_tile__description">
                  <div className="description">{feature.description}</div>
                  <HeroTileMeta>
                    <HeroTileMetaData>
                      <ContentTag>{feature.category.name}</ContentTag>
                      <ContentTime className="contentTimeDate">
                        <AiOutlineClockCircle className="contentTimeIcon" />
                        {formatDistance(
                          new Date(feature?.publishedAt),
                          new Date(),
                          { addSuffix: true }
                        )}
                      </ContentTime>
                    </HeroTileMetaData>
                  </HeroTileMeta>
                </HeroTileDescription>
              </HeroTitleExplainer>
              <HeroTileGradient />
            </HeroTile>
          </Link>
        );
      })}
    </HeroContainer>
  );
};

export default NewsReel;
