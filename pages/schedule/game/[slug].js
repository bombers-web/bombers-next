import { Heading, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Hero from "../../../src/common/Hero";
import Layout from "../../../src/common/Layout";
import useBp from "../../../theme/useBp";

const ScheduleGame = (props) => {
  const { isDesktop } = useBp();
  const router = useRouter();
  const [size, setSize] = useState("md");
  const [game, setGame] = useState({});

  useEffect(() => {
    setSize(isDesktop ? "md" : "xl");
  }, [isDesktop]);

  useEffect(() => {
    const game = props.games.filter(
      (game) => router.query.slug === game.slug
    )[0];
    setGame(game);
  }, [props.games, router.query.slug]);

  const text = `${game?.home?.name} vs. ${game?.away?.name}`;
  const secondaryText = `${game?.division} · ${
    game.friendly ? "Friendly" : "League"
  }`;
  return (
    <Layout>
      <Hero
        image={game.image ? game.image.url : ""}
        text={text}
        size={size}
        secondaryText={secondaryText}
      ></Hero>
      <Stack direction="column">
        <Heading
          as="div"
          color="brand.medium"
          fontFamily="Staatliches"
          fontWeight="light"
          size="lg"
          minH="10%"
          maxH="25%"
        >
          {game?.home?.name}
        </Heading>
      </Stack>
    </Layout>
  );
};

export default ScheduleGame;
