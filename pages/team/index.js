import useNav from "hooks/useNav";
import IndexLayout from "../../src/components/IndexLayout";
import Layout from "../../src/common/Layout";

const TeamHome = () => {
  const { navs } = useNav();
  const teamSubMenu = navs[3].subMenus;

  return (
    <Layout seo={{ metaTitle: "Team" }} header="Players and Staff">
      <IndexLayout items={teamSubMenu}></IndexLayout>
    </Layout>
  );
};

export default TeamHome;
