import Layout from "src/common/Layout";
import React from "react";
import { Heading, SimpleGrid, Box } from "@chakra-ui/react";
import { fetchAPI } from "src/lib/api";
import BoardCard from "../../../src/components/Board/BoardCard";

const Board = (props) => {
  const { members } = props;
  return (
    <>
      <Layout
        header="Executive Board"
        seo={{ metaTitle: "executive board" }}
        margin
      >
        <Box h="100vh">
          <SimpleGrid columns={[1, 3]} spacing={[2, 2]} m={[3]}>
            {members?.length ? (
              members?.map((member) => {
                const { picture, first_name, last_name, position, email } =
                  member;
                const background =
                  picture?.url || "/static/default/defaultpic.png";
                const displayName = `${first_name} ${last_name}`;

                return (
                  <BoardCard
                    size={picture?.size}
                    position={position}
                    email={email}
                    bg={background}
                    displayName={displayName}
                  />
                );
              })
            ) : (
              <Heading as="h5">no members found</Heading>
            )}
          </SimpleGrid>
        </Box>
      </Layout>
    </>
  );
};

export async function getStaticProps({ params }) {
  const members = (await fetchAPI("/board-members?populate=*")) || {};
  return {
    props: { members },
  };
}

export default Board;
