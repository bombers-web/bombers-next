import { Box, Flex, IconButton, Text, VStack } from '@chakra-ui/react'
import Pic from 'common/Pic'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Calender = ({ calenders }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % calenders.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1))
  }

  if (!calenders || calenders.length === 0) {
    return (
      <Box textAlign="center" py={10} color="gray.600">
        No calendars to display.
      </Box>
    )
  }

  const currentCalender = calenders[currentIndex]

  const formatCalendarDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString.replace(/-/g, '/'))
    const options = { year: 'numeric', month: 'long' }
    return new Intl.DateTimeFormat('en-US', options).format(date)
  }

  return (
    <VStack spacing={6} align="center" width="100%">
      {/* STEALTH NAVIGATION */}
      <Flex
        alignItems="center"
        justifyContent="center"
        bg="blackAlpha.400" // Darker background for the nav pill
        borderRadius="full"
        border="1px solid"
        borderColor="brand.dark" // Very subtle border
      >
        <IconButton
          icon={<FaChevronLeft size="12px" />}
          onClick={handlePrev}
          aria-label="Previous Calendar"
          isDisabled={calenders.length <= 1 || currentIndex === 0}
          variant="unstyled" // Removes all default styling for a cleaner look
          display="flex"
          alignItems="center"
          justifyContent="center"
          size="xs"
          color="whiteAlpha.600" // Subdued icon color
          _hover={{ color: 'yellow.400' }}
          _disabled={{ color: 'whiteAlpha.200', cursor: 'not-allowed' }}
        />

        <Text
          fontSize="lg"
          fontWeight="800"
          color="whiteAlpha.900"
          textTransform="uppercase"
          letterSpacing="0.2em"
          minW="160px"
          textAlign="center"
        >
          {formatCalendarDate(currentCalender.date)}
        </Text>

        <IconButton
          icon={<FaChevronRight size="12px" />}
          onClick={handleNext}
          aria-label="Next Calendar"
          isDisabled={
            calenders.length <= 1 || currentIndex === calenders.length - 1
          }
          variant="unstyled"
          display="flex"
          alignItems="center"
          justifyContent="center"
          size="xs"
          color="whiteAlpha.600"
          _hover={{ color: 'yellow.400' }}
          _disabled={{ color: 'whiteAlpha.200', cursor: 'not-allowed' }}
        />
      </Flex>

      {/* DARK BORDER CALENDAR DISPLAY */}
      <Box
        bg="black" // Deepest possible background
        borderRadius="xl"
        overflow="hidden"
        p={{ base: 1, md: 2 }}
        width="100%"
        maxWidth={{ base: '100%', md: '750px', lg: '900px' }}
        border="2px solid"
        borderColor="blackAlpha.800" // Solid dark border
        boxShadow="inset 0 0 10px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.6)"
      >
        <Pic
          image={currentCalender.calender.image}
          src={currentCalender.calender.url}
          borderRadius={6}
          objectFit="contain"
          width="100%"
          height={{ base: 'auto', md: '550px', lg: '700px' }}
          opacity={0.95} // Slightly dimmed to merge with the dark theme
        />
      </Box>
    </VStack>
  )
}

export default Calender
