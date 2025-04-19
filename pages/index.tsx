import { Box, Button, Flex, Divider, Link, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import MatchTeams from "components/Games/MatchTeams";
import PageContent from "src/common/PageContent";
import Hero from "../src/common/Hero";
import Layout from "../src/common/Layout";
import Section from "../src/components/Section";
import { fetchAPI } from "../src/lib/api";
import Utils from "../utils/Utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import useBp from "../theme/useBp";

const NextMatchText = styled(Box)`
  color: "#fff";
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
      xs: "14px",
      sm: "16px",
      md: "20px",
      lg: "24px",
    }[props.size || "xs"])};
  font-weight: ${(props) => (props.size !== "lg" ? "400" : "700")};
  font-size: ${(props) =>
    ({
      xs: "12px",
      sm: "14px",
      md: "18px",
      lg: "26px",
    }[props.size || "xs"])};
  color: var(--chakra-colors-brand-light);
  width: 100%;
  padding: ${(props) =>
    ({
      xs: "0 4px",
      sm: "0 8px",
      md: "0 0 8px 12px",
      lg: "0 0 10px 15px",
    }[props.size || "xs"])};
`;

const Home = (props) => {
  const { homepage, highlight, d1Upcoming, d2Upcoming } = props;
  const { isMobile } = useBp();

  const { getLongDate } = new Utils();
  const upcomingMatches =
    d1Upcoming || d2Upcoming
      ? [...d1Upcoming?.slice(0, 1), ...d2Upcoming?.slice(0, 1)]
      : [];

  return (
    <Layout seo={homepage?.seo} bg="brand.light" id="homepage">
      <PageContent>
        <Hero size="3xl" {...highlight} direct></Hero>
        <Section
          bg="brand.dark"
          padding="0px"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          align="center"
        >
          <Flex flexDirection="column" textAlign="center" my="10px">
            <NextMatchFont size="lg">Next Up:</NextMatchFont>
            {upcomingMatches.length > 0 ? (
              upcomingMatches.map((upcomingMatch, idx) => (
                <>
                  <Flex alignItems="center" key={idx}>
                    <MatchTeams match={upcomingMatch} />
                    <NextMatchText flex="3" className="next-match__text--date">
                      <NextMatchFont size="sm" color="white">
                        {getLongDate(upcomingMatch.date)[0] ||
                          "No upcoming games"}
                        {isMobile && (
                          <NextMatchFont size="sm" color="white" mt={2}>
                            {getLongDate(upcomingMatch.date)[1] || "no"}
                          </NextMatchFont>
                        )}
                      </NextMatchFont>
                      {!isMobile && (
                        <NextMatchFont size="sm" color="white">
                          {getLongDate(upcomingMatch.date)[1] || "no"}
                        </NextMatchFont>
                      )}
                      <NextMatchFont size="sm" color="white">
                        {upcomingMatch.location}
                      </NextMatchFont>
                    </NextMatchText>
                    <Box flex="1" justifyContent="space-around" p="0 8px">
                      <Link href="/watch">
                        <Button variant="outline" p={isMobile ? 0 : "auto"}>
                          {isMobile ? (
                            <FontAwesomeIcon
                              icon={faPlay}
                              color="gold"
                              size="sm"
                            />
                          ) : (
                            <>Watch Info</>
                          )}
                        </Button>
                      </Link>
                    </Box>
                  </Flex>
                  <Divider
                    mt={2}
                    width={isMobile ? "95%" : "100%"}
                    alignSelf="center"
                    visibility={
                      idx === upcomingMatches.length - 1 ? "hidden" : "visible"
                    }
                  />
                </>
              ))
            ) : (
              <Text color="gold">There are no upcoming scheduled games</Text>
            )}
          </Flex>
        </Section>
      </PageContent>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [content, homepage, d1Upcoming, d2Upcoming, homeCta] =
    await Promise.all([
      fetchAPI(
        "/contents?populate=*&filters[status][$eq]=published&sort[1]=publishedAt:asc&pagination[limit]=3"
      ),
      fetchAPI("/homepage?populate=*"),
      fetchAPI(
        "/games?populate=*,home.logo,away.logo&filters[division][$eq}=d1&filters[finished][$eq]=false&sort[1]=date"
      ),
      fetchAPI(
        "/games?populate=*,home.logo,away.logo&filters[division][$eq}=d2&filters[finished][$eq]=false&sort[1]=date"
      ),
      fetchAPI("/home-cta?populate=content.image.format"),
    ]);
  return {
    props: {
      content,
      homepage,
      d1Upcoming,
      d2Upcoming,
      highlight: homeCta?.content || null,
    },
  };
}

export default Home;
