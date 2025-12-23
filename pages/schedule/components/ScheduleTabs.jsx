import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import Results from './Results'
import Schedule from './Schedule'

const ScheduleTabs = ({ games = [] }) => {
  const upcoming = games?.filter((game) => !game.finished)
  const results = games?.filter((game) => game.finished)
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
    <Box w="full">
      <Tabs align="center" variant="line" colorScheme="black">
        <TabList borderBottom="2px solid" borderColor="gray.100" gap={8}>
          <Tab {...tabStyle}>Schedule</Tab>
          <Tab {...tabStyle}>Results</Tab>
        </TabList>

        <TabPanels mt={6}>
          <TabPanel p={0}>
            <Schedule upcoming={upcoming} />
          </TabPanel>
          <TabPanel p={0}>
            <Results results={results || []} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default ScheduleTabs
