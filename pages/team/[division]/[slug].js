import { Center, Stack, Flex } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchAPI } from "src/lib/api";
import Layout from "../../../src/common/Layout";
import PlayerInfo from "../../../src/components/Players/PlayerInfo";
import { getPosition } from "../../../src/components/Players/utils";
import useBp from "../../../theme/useBp";

const Player = ({ player }) => {
  const [direction, setDirection] = useState("row");
  const { isDesktop } = useBp();
  const PLAYER_NAME = `${player?.first_name} ${player?.last_name}`;

  useEffect(() => {
    setDirection(isDesktop ? "row" : "column");
  }, [isDesktop]);

  const inQuotes = (string) => (string ? `"${string}"` : "");

  const text = `${player?.first_name} ${inQuotes(player?.nickname)} ${
    player?.last_name
  }`;

  const position = getPosition(player?.position);

  return (
    <Layout
      seo={{ metaTitle: PLAYER_NAME }}
      header={text}
      subheader={position}
      cover={{
        url: player?.hoverPic?.url,
      }}
    >
      <Stack direction={direction} minH={"inherit"}>
        <Center flex={1} bg={"gradient.regular"}>
          <Image
            width={500}
            height={500}
            fit={player?.picture?.size > 3000 ? "cover" : "contain"}
            src={player?.picture?.url || "/static/default/defaultpic.png"}
            size="xl"
            alt={PLAYER_NAME + " profile pic"}
          />
        </Center>
        <Flex flex={1}>
          <PlayerInfo w="50%" player={player} />
        </Flex>
      </Stack>
    </Layout>
  );
};

export async function getStaticPaths() {
  const players = await fetchAPI("/players?populate=*");
  return {
    paths: players.map((player) => ({
      params: {
        division: player?.division?.toString().toLowerCase() || "d1",
        slug: player?.slug || "shawn-caradine",
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const [player] =
    (await fetchAPI(
      `/players?populate=picture&filters[slug][$eqi]=${params.slug}`
    )) || {};
  return {
    props: { player },
  };
}

export default Player;
