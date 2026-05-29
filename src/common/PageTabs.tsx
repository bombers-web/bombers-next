import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type SpacingProp = number | string | Record<string, number | string>

interface PageTabsProps {
  tabs: string[]
  index?: number
  onChange?: (index: number) => void
  defaultIndex?: number
  id?: string
  panelPx?: SpacingProp
  panelPy?: SpacingProp
}

const PageTabs = ({
  tabs,
  index,
  onChange,
  defaultIndex,
  id,
  children,
  panelPx = { base: 6, md: 15 },
  panelPy = 16,
}: PropsWithChildren<PageTabsProps>) => {
  const panels = React.Children.toArray(children)

  return (
    <Tabs
      variant="line"
      size="lg"
      align="center"
      index={index}
      onChange={onChange}
      defaultIndex={defaultIndex}
      id={id}
    >
      <TabList
        bg="white"
        borderBottom="1px solid"
        borderColor="brand.light"
        position="sticky"
        top={0}
        zIndex={40}
      >
        {tabs.map((label) => (
          <Tab
            key={label}
            fontFamily="display"
            fontWeight={800}
            fontSize="md"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="gray.400"
            pt="1.25rem"
            px={8}
            pb="1.0625rem"
            borderBottomWidth="3px"
            _selected={{ color: 'brand.dark', borderColor: 'brand.highlight' }}
            _hover={{ color: 'brand.dark' }}
            transition="color 0.15s"
          >
            {label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {panels.map((panel, i) => (
          <TabPanel key={i} px={panelPx} py={panelPy}>
            {panel}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default PageTabs
