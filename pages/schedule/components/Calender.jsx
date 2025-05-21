import { Flex, Box, IconButton, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Pic from "common/Pic";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons for arrows

const Calender = ({ calenders }) => {
  // Assume calenders is an array of all available calendar objects
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % calenders.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + calenders.length) % calenders.length
    );
  };

  if (!calenders || calenders.length === 0) {
    return <Box>No calendars to display.</Box>;
  }

  const currentCalender = calenders[currentIndex];

  return (
    <VStack spacing={4} align="center">
      <Flex width="100%" justifyContent="center" alignItems="center" gap={10}>
        <IconButton
          icon={<FaChevronLeft />}
          onClick={handlePrev}
          aria-label="Previous Calendar"
          isDisabled={calenders.length <= 1} // Disable if only one calendar
        />
        <Text fontSize="xl" fontWeight="bold">
          {currentCalender.date}
        </Text>
        <IconButton
          icon={<FaChevronRight />}
          onClick={handleNext}
          aria-label="Next Calendar"
          isDisabled={calenders.length <= 1} // Disable if only one calendar
        />
      </Flex>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4} // Add some padding around the image
        width="100%" // Ensure it takes full width of its container
        // maxW="md" // Optional: set a max width for the calendar container
      >
        <Pic
          image={currentCalender.calender.image} // Assuming 'image' property is for the image itself
          src={currentCalender.calender.url}
          borderRadius={5}
          objectFit="contain" // Ensures the entire image is visible
          width="100%"
          height="auto" // Maintain aspect ratio
        />
      </Box>
    </VStack>
  );
};

export default Calender;
