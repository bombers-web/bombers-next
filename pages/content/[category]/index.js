/* eslint-disable no-unused-vars */
import { SimpleGrid } from "@chakra-ui/react";
import ContentCard from "src/components/Contents/ContentCard";
import styled from "styled-components";
import Layout from "../../../src/common/Layout";
import { fetchAPI } from "../../../src/lib/api";

const ContentHeader = styled.div`
  font-size: 44px;
  color: white;
  font-weight: 600;
  background: linear-gradient(
    90deg,
    rgba(24, 24, 24, 1) 0%,
    rgba(33, 33, 33, 1) 35%,
    rgba(48, 48, 48, 1) 100%
  );
  padding: 16px;
  border: 4px solid white;
  width: 100%;
  text-align: center;
`;

const defaultContent = {
  image: {
    url: "",
  },
  title: "",
  description: "",
  author: {},
  published_at: "",
  content: "",
};

const Content = ({ contents, category }) => {
  return (
    <Layout seo={{ mainTitle: category }} header={category}>
      <SimpleGrid m={[0, 0, 2, 2, 4]} spacing="8" minChildWidth="300px">
        {contents.map((content) => {
          return <ContentCard content={content} href="/contents"></ContentCard>;
        })}
      </SimpleGrid>
    </Layout>
  );
};

export async function getStaticPaths() {
  const categories = await fetchAPI("/categories");

  return {
    paths: categories.map(({ name }) => ({
      params: {
        category: name,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const contents = await fetchAPI(
    `/contents?[category.name]=${params.category}&status=published`
  );

  return {
    props: { contents, category: params.category },
    revalidate: 60 * 60 * 60,
  };
}

export default Content;
