import { fetchAPI } from 'lib/api'
import { useState } from 'react'
import Layout from '../../src/common/Layout'
import PageTabs from '../../src/common/PageTabs'
import ContentCard from '../../src/components/Content/ContentCard'

const News = ({ content, categories }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const allTabs = ['Latest', ...(categories?.map((c) => c.name) ?? [])]

  return (
    <Layout
      header="Content"
      seo={{
        metaTitle: 'Content',
        metaDescription: `${allTabs[tabIndex] ?? 'Latest'} content`,
      }}
      cover={{
        url: '/static/mcb-hero.jpeg',
        alternativeText: 'McBride cover photo',
      }}
    >
      <PageTabs
        tabs={allTabs}
        index={tabIndex}
        onChange={setTabIndex}
        id="content-tabs"
        panelPx={0}
        panelPy={6}
      >
        <div>
          {content?.length
            ? content.map((item) => <ContentCard key={item?.id} content={item} />)
            : 'No Content'}
        </div>
        {categories?.map((category) => (
          <div key={category.id}>
            {category.contents?.length
              ? category.contents.map((item) => (
                  <ContentCard key={item.id} content={item} />
                ))
              : `No ${category.name} content`}
          </div>
        ))}
      </PageTabs>
    </Layout>
  )
}

export async function getStaticProps() {
  const categories =
    (await fetchAPI(
      '/categories?populate[0]=contents&populate[1]=contents.image&populate[2]=contents.category&populate[3]=contents.writer',
    )) || []
  const content =
    (await fetchAPI(
      '/contents?populate[0]=writer.picture&populate[1]=image&populate[2]=category&sort[0]=published:desc',
    )) || []

  return {
    props: { categories, content },
    revalidate: 86400,
  }
}

export default News
