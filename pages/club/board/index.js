import Layout from "src/common/Layout";
import React from "react";
import { Heading, SimpleGrid, Box } from "@chakra-ui/react";
import { fetchAPI } from "src/lib/api";
import BoardCard from "../../../src/components/Board/BoardCard";

export const revalidate = 0;

const Board = (props) => {
  const { members } = props;
  return (
    <>
      <Layout
        header="Executive Board"
        seo={{ metaTitle: "Executive Board" }}
        margin
      >
        <Box m={[0, 0, 0, 8, 16]} id="players-list">
          <Heading m={[8, 8]} mt={[2, 4]}>
            Executive Board
          </Heading>
          <SimpleGrid columns={[1, 4]} spacing={[0, 2]} m={[3]}>
            {members?.length ? (
              members?.map((member) => {
                const { photo, first_name, last_name, position, email } =
                  member;
                const background =
                  photo?.url || "/static/default/defaultpic.png";
                const displayName = `${first_name} ${last_name}`;

                return (
                  <BoardCard
                    size={photo?.size}
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
  const members = (await fetchAPI("/board-members?populate=photo")) || [];
  return {
    props: { members },
  };
}

export default Board;
