import { Box } from "@chakra-ui/react";
import Image from "next/image";
import styled from "styled-components";

const Container = styled(Box)`
  align-items: ${(props) => props.alignItems};
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  position: relative;
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};
`;

const InnerContainer = styled.div`
  z-index: 10;
  height: 100%;
`;

/**
 * <BgImage>
 *
 * The new next/image optimization setup handles background images oddly
 * It requires they be foreground images placed inside of a container
 * This component abstracts that logic away for better DX
 *
 * You can layer text and imagery on top of the background image
 * All you have to do is pass that text or imagery into this component
 *
 * Note: all images get processed through Webpack so you must import!
 * No absolute URLs as they will break during site generation
 *
 * @param { string } alignItems - vertical alignment of inner content
 * @param { string } imgalt - text description of the image
 * @param { string } imgsrc - url of the image, should be a JS module import
 * @param { string } justifyContent - horizontal alignment of inner content
 * @param { number } height - how tall the background image should be (default: 50vh)
 * @param { number } width - how wide image should be (default: 100%)
 */
const BgImage = ({
  alignItems = "center",
  children,
  imgalt = "Background Image",
  src,
  height = "50vh",
  justifyContent = "center",
  width = "100%",
  position = "center",
  fit = "cover",
}) => {
  return (
    <Container
      alignItems={alignItems}
      justifyContent={justifyContent}
      width={width}
      height={height}
    >
      {src ? (
        <Image
          alt={imgalt}
          src={src}
          style={{ objectFit: fit, objectPosition: position }}
          quality={80}
          fill={true}
        />
      ) : null}
      {children && <InnerContainer>{children}</InnerContainer>}
    </Container>
  );
};

export default BgImage;
