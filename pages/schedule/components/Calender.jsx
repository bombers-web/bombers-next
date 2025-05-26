import { Flex, Box, IconButton, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Pic from "common/Pic";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calender = ({ calenders }) => {
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
    return (
      <Box textAlign="center" py={10}>
        No calendars to display.
      </Box>
    );
  }

  const currentCalender = calenders[currentIndex];

  // Function to format the date
  const formatCalendarDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString.replace(/-/g, "/"));
    const options = { year: "numeric", month: "long" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <VStack spacing={{ base: 6, md: 8 }} align="center" width="100%">
      <Flex
        width="100%"
        justifyContent="center"
        alignItems="center"
        gap={{ base: 4, md: 10 }}
      >
        <IconButton
          icon={<FaChevronLeft />}
          onClick={handlePrev}
          aria-label="Previous Calendar"
          isDisabled={calenders.length <= 1}
          size={{ base: "sm", md: "lg" }}
        />
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="bold"
          textAlign="center"
        >
          {formatCalendarDate(currentCalender.date)}
        </Text>
        <IconButton
          icon={<FaChevronRight />}
          onClick={handleNext}
          aria-label="Next Calendar"
          isDisabled={calenders.length <= 1}
          size={{ base: "sm", md: "lg" }}
        />
      </Flex>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={{ base: 2, md: 4 }}
        width="100%"
        maxWidth={{ base: "95%", md: "700px", lg: "900px" }}
        height="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Pic
          image={currentCalender.calender.image}
          src={currentCalender.calender.url}
          borderRadius={5}
          objectFit="contain"
          width="100%"
          height={{ base: "auto", md: "500px", lg: "600px" }}
        />
      </Box>
    </VStack>
  );
};

export default Calender;
