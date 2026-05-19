import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import SevensResults from './SevensResults'
import SevensUpcoming from './SevensUpcoming'

const SevensTabs = ({ tournaments = [] }) => {
  const now = new Date()
  const upcoming = tournaments.filter((t) => !t.finished)
  const results = tournaments.filter((t) => t.finished)

  const tabStyle = {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: 'ls',
    color: 'brand.mediumSecondary',
    _selected: {
      color: 'brand.black',
      borderColor: 'brand.black',
    },
    _hover: { color: 'brand.highlight' },
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
            <SevensUpcoming tournaments={upcoming} />
          </TabPanel>
          <TabPanel p={0}>
            <SevensResults tournaments={results} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default SevensTabs
