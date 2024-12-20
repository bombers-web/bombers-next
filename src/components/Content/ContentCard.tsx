import { Badge, Box, Flex, LinkBox, Text } from "@chakra-ui/react";
import { toLower } from "lodash";
import { format } from "date-fns";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const ContentCard = ({ content, href }) => {
  const link = `/content/${toLower(content?.uid)}`;
  const linkHref = `${href || "/content/"}[id]`;

  return (
    <Link as={link} href={linkHref} style={{ textDecoration: "none" }}>
      <LinkBox>
        <Flex
          transition={`all .2s ease-in-out`}
          direction={["column", "column", "row"]}
          m={8}
          p={[0, 0, 2, 4]}
          minH="350px"
          maxH="350px"
          maxW="1200px"
          borderWidth="1px"
          overflow="hidden"
          borderColor="brand.medium"
          cursor="pointer"
          _hover={{
            transform: `scale(1.05)`,
            boxShadow: "5px 3px 3px grey",
          }}
          bg="brand.light"
          borderRadius={8}
        >
          <Box
            className="image-container"
            backgroundImage={content?.image?.url}
            flexGrow="1"
            backgroundPosition="center"
            backgroundSize="cover"
            minW="30%"
            maxW={["container.xl", "100%", "30%"]}
          ></Box>
          <Flex direction="column">
            <Box display="flex" alignItems="baseline" m={4} textAlign="start">
              <Box fontWeight="semibold" lineHeight="tight" maxW="100%">
                <Flex
                  alignItems="start"
                  direction="column"
                  justifyContent="flex-start"
                  m={4}
                >
                  <Text
                    fontSize={["md", "xl"]}
                    as="p"
                    fontWeight="bolder"
                    textTransform={"none"}
                    color="brand.dark"
                    mb="4"
                  >
                    {content?.title}
                  </Text>
                  <Box
                    overflowY="scroll"
                    maxH="350px"
                    wordBreak="break-word"
                    color="brand.dark"
                    fontFamily="sans-serif"
                    fontWeight="light"
                    fontSize="sm"
                    w="100%"
                    display={["none", "none", "block"]}
                  >
                    {content?.category?.name === "Events" ? (
                      <ReactMarkdown>{content?.description}</ReactMarkdown>
                    ) : null}
                    <Text margin="0">
                      By {content?.writer?.name || "Anonymous"}
                    </Text>
                    <Text className="uk-text-meta uk-margin-remove-top">
                      {format(new Date(content.published), "PPPp")}
                    </Text>
                  </Box>
                </Flex>
              </Box>
              {content?.category?.name && (
                <Badge bg="brand.medium" color="brand.light" mx="4">
                  {content?.category?.name}
                </Badge>
              )}
            </Box>
          </Flex>
        </Flex>
      </LinkBox>
    </Link>
  );
};

export default ContentCard;
