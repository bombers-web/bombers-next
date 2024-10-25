import Layout from "../../src/common/Layout";
import IndexLayout from "../../src/components/IndexLayout";
import useNav from "hooks/useNav";

const ClubIndex = () => {
  const { navs } = useNav();
  const clubSubNav = navs[2].subMenus;
  return (
    <Layout
      header="club"
      seo={{ metaTitle: "Club", metaDescription: "St. Louis Bombers" }}
    >
      <IndexLayout items={clubSubNav}></IndexLayout>
    </Layout>
  );
};

export default ClubIndex;
