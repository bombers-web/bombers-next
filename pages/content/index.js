import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { fetchAPI } from 'lib/api'
import { useCallback, useState } from 'react'
import Layout from '../../src/common/Layout'
import ContentCard from '../../src/components/Content/ContentCard'

const News = ({ content, categories }) => {
  const [selectedTab, setSelectedTab] = useState('Latest')
  const onTabChange = useCallback((e, d) => {
    setSelectedTab(e)
  }, [])

  const tabStyle = {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: 'ls',
    color: 'gray.400',
    _selected: {
      color: 'brand.black',
      borderColor: 'brand.black',
    },
    _hover: { color: 'brand.black' },
    transition: 'all 0.2s',
  }

  return (
    <Layout
      header="Content"
      seo={{
        metaTitle: 'Content',
        metaDescription: `${selectedTab} content`,
      }}
      cover={{
        url: '/static/mcb-hero.jpeg',
        alternativeText: 'McBride cover photo',
      }}
    >
      <Tabs
        fontFamily="body"
        align="center"
        variant="line"
        size="lg"
        colorScheme="gray"
        value={selectedTab}
        onChange={onTabChange}
        id="content-tabs"
        defaultIndex={0}
      >
        <TabList>
          <Tab {...tabStyle}>Latest</Tab>
          {categories?.map((category) => (
            <Tab {...tabStyle} key={category.id}>
              {category.name}
            </Tab>
          ))}
        </TabList>
        <TabPanels my="24px">
          <TabPanel textTransform="capitalize">
            {content?.length
              ? content.map((item) => {
                  return <ContentCard key={item?.id} content={item} />
                })
              : 'No Content'}
          </TabPanel>
          {categories?.map((category) => {
            return (
              <TabPanel textTransform="capitalize" key={category}>
                {category.contents?.length
                  ? category.contents.map((item) => {
                      return <ContentCard key={item.id} content={item} />
                    })
                  : `No ${category.name} content`}
              </TabPanel>
            )
          })}
        </TabPanels>
      </Tabs>
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
