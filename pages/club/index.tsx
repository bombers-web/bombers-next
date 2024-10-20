import Layout from "../../src/common/Layout";
import IndexLayout from "../../src/components/IndexLayout";
import useNav from "hooks/useNav";

const ClubIndex = () => {
  const { navs } = useNav();
  console.log(navs)
  // TODO: reestablish useNav
  // const subMenus = navs[0].subMenus;

  // //temporary
  // const subMenus = [
  //   {
  //     name: "history",
  //     id: "history",
  //     slug: "club/history",
  //     bg: "/static/legends_3.jpeg",
  //   },
  //   {
  //     name: "board",
  //     id: "board",
  //     slug: "club/board",
  //     bg: "",
  //   },
  //   {
  //     name: "youth rugby",
  //     id: "youth-rugby",
  //     slug: "club/youth-rugby",
  //     bg: "/static/jets_mark.jpg",
  //   },
    // {
    //   name: "bombers career center",
    //   id: "youth-rugby",
    //   slug: "club/career-center",
    //   bg: "",
    // },
  // ];

  return (
    <Layout
      header="club"
      seo={{ metaTitle: "Club", metaDescription: "St. Louis Bombers" }}
    >
      <IndexLayout items={navs[2].subMenus}></IndexLayout>
    </Layout>
  );
};

export default ClubIndex;
