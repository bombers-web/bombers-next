import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import MatchTeams from "components/Games/MatchTeams";
import PageContent from "src/common/PageContent";
import Hero from "../src/common/Hero";
import Layout from "../src/common/Layout";
import Section from "../src/components/Section";
import { fetchAPI } from "../src/lib/api";
import Utils from "../utils/Utils";

const NextMatchText = styled(Box)`
  color: "#fff";
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  .next-match__text--date {
    margin-bottom: 4px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 8px;
  }
  @media (min-width: 992px) {
    margin-bottom: 0;
  }

  @media (min-width: 992px) {
    .next-match__text--date {
      margin-right: 30px;
      gap: 34px;
    }
  }
  @media (min-width: 992px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const NextMatchFont = styled(Box)<{ size?: "xs" | "sm" | "md" | "lg" }>`
  margin-right: ${(props) =>
    ({
      xs: "0px",
      sm: "0px",
      md: "32px",
      lg: "52px",
    }[props.size || "xs"])};
  line-height: ${(props) =>
    ({
      xs: "20px",
      sm: "22px",
      md: "26px",
      lg: "34px",
    }[props.size || "xs"])};
  font-weight: ${(props) => (props.size !== "lg" ? "400" : "700")};
  font-size: ${(props) =>
    ({
      xs: "12px",
      sm: "16px",
      md: "18px",
      lg: "26px",
    }[props.size || "xs"])};
  color: var(--chakra-colors-brand-light);
  width: 100%;
  padding: ${(props) =>
    ({
      xs: "0 4px",
      sm: "0 8px",
      md: "0 12px",
      lg: "0 15px",
    }[props.size || "xs"])};
  flex: 0;
`;

const Home = (props) => {
  const { homepage, highlight, d1Upcoming } = props;
  const { getLongDate } = new Utils();

  return (
    <Layout seo={homepage?.seo} bg="brand.light" id="homepage">
      <PageContent>
        <Hero size="3xl" {...highlight} direct></Hero>
        <Section
          bg="brand.dark"
          padding="0px"
          style={{
            display: "flex",
            // height: "150px",
            justifyContent: "center",
          }}
          align="center"
        >
          <Box
            py="12px"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            flexDirection="row"
            alignItems="center"
            maxW="1180px"
            w="100%"
            // my={10}
          >
            <NextMatchFont size="lg">Next Up:</NextMatchFont>
            {d1Upcoming[0] ? (
              <>
                <MatchTeams match={d1Upcoming?.[0]} />
                <NextMatchText flex="2" className="next-match__text--date">
                  <Flex gap="3" flex="2">
                    <NextMatchFont size="sm" color="white">
                      {getLongDate(d1Upcoming?.[0].date)[0] ||
                        "No upcoming games"}
                    </NextMatchFont>
                    <NextMatchFont size="sm" color="white">
                      {getLongDate(d1Upcoming?.[0].date)[1] || "no"}
                    </NextMatchFont>
                  </Flex>
                </NextMatchText>
                <NextMatchText flex="2">
                  <NextMatchFont size="md" color="white">
                    {d1Upcoming?.[0].location}
                  </NextMatchFont>
                </NextMatchText>
                <Box flex="1">
                  <Link href="/watch">
                    <Button m={5} variant="outline">
                      Watch Info
                    </Button>
                  </Link>
                </Box>
              </>
            ) : (
              <Text color="gold">There are no upcoming scheduled games</Text>
            )}
          </Box>
        </Section>
      </PageContent>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [content, homepage, d1Upcoming, homeCta] = await Promise.all([
    fetchAPI(
      "/contents?populate=*&filters[status][$eq]=published&sort[1]=publishedAt:asc&pagination[limit]=3"
    ),
    fetchAPI("/homepage?populate=*"),
    fetchAPI(
      "/games?populate=*,home.logo,away.logo&filters[division][$eq}=d1&filters[finished][$eq]=false&sort[1]=date"
    ),
    fetchAPI("/home-cta?populate=content.image.format"),
  ]);
  return {
    props: {
      content,
      homepage,
      d1Upcoming,
      highlight: homeCta?.content || null,
    },
  };
}

export default Home;
