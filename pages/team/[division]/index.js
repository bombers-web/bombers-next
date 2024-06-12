import React from "react";
import Layout from "../../../src/common/Layout";
import PlayerList from "../../../src/components/Players/PlayerList";
import Sponsors from "../../../src/components/Sponsors";
import { startCase } from "lodash";
import { useRouter } from "next/router";

const Players = () => {
  const r = useRouter();
  const { list, division } = r.query;

  const covers = {
    d1: "/static/d1_team.jpeg",
    d3: "/static/d3TeamPhoto.JPG",
    "coaches-and-staff": "/static/coach_pic1.jpeg",
    legends: "/static/jk_legends_pic.jpeg",
  };
  return (
    <>
      {division && list ? (
        <Layout
          header={`Bombers ${startCase(division)}`}
          cover={{
            url: covers[division],
            size: "xl",
            alternativeText: `${division} team pic`,
          }}
          seo={{ metaTitle: division }}
          margin
        >
          <PlayerList list={list} type={division} />
          <Sponsors />
        </Layout>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Players;
