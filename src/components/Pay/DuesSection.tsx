import {
  Button,
  Link,
  Stack,
  Box,
  Heading,
  VStack,
  Flex,
  Text,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";

interface DuesSubscription {
  description: string;
  planId: string;
  cost: number;
  type: "monthly" | "one-time";
  benefits: string;
}

interface SubscriptionListProps {
  subList: DuesSubscription[];
}

const SubscriptionList = ({ subList }: SubscriptionListProps) => {
  const basePaypalUrl =
    "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=";

  return (
    <Stack maxW="100%" id="subscriptionStack">
      {subList?.map(({ description, planId, cost, type, benefits }) => (
        <React.Fragment key={planId}>
          <Flex align="center">
            <VStack w="50%" mr={4}>
              <Text m={0} fontWeight={800}>
                {description}
              </Text>
              <Text m={0}>
                ${cost} - {type}
              </Text>
              {benefits ? (
                <Text m={0} fontStyle="italic" fontWeight={450}>
                  {benefits}
                </Text>
              ) : null}
            </VStack>
            <Link href={`${basePaypalUrl}${planId}`} isExternal w="50%">
              <Button
                w="fit-content"
                minW="50%"
                variant="solid"
                leftIcon={
                  <Image
                    src="/icons/paypal_logo.png"
                    alt="Venmo"
                    width={100}
                    height={24}
                    style={{ paddingRight: 12 }}
                  />
                }
              />
            </Link>
          </Flex>
          <Divider borderColor="brand.light" borderWidth="1px" />
        </React.Fragment>
      ))}
    </Stack>
  );
};

const DuesSection = ({ subscriptions, subtabIndex, onSubtabChange }) => {
  const playerDuesSubscriptions: DuesSubscription[] = subscriptions
    .filter((sub) => sub.description.toLowerCase().includes("dues"))
    .sort((a, b) => a.cost - b.cost);
  const supporterDuesSubscriptions: DuesSubscription[] = subscriptions
    .filter((sub) => !sub.description.toLowerCase().includes("dues"))
    .sort((a, b) => a.cost - b.cost);

  return (
    <Box
      p={4}
      bg="brand.white"
      borderRadius="md"
      boxShadow="md"
      maxWidth="1180px"
    >
      <VStack spacing={4} align="stretch">
        <Flex
          direction="column"
          align="center"
          justify="center"
          mb={4}
          bg="brand.white"
          color="brand.meta"
          p={4}
          borderRadius="md"
        >
          <Heading size="lg" mb={2} textAlign="center">
            Club Dues
          </Heading>
          <Text textAlign="center" mt={0}>
            Select your dues payment option below:{" "}
          </Text>
        </Flex>
        <Box>
          <Tabs
            id="dues"
            isFitted
            size="lg"
            colorScheme="brand.meta"
            color="brand.black"
            maxW="100%"
            alignSelf="center"
            index={subtabIndex}
            onChange={onSubtabChange}
          >
            <TabList>
              <Tab fontSize="m" fontWeight="bold">
                Player Dues
              </Tab>
              <Tab fontSize="m" fontWeight="bold">
                Supporter Dues
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SubscriptionList subList={playerDuesSubscriptions} />
              </TabPanel>
              <TabPanel>
                <SubscriptionList subList={supporterDuesSubscriptions} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Box>
  );
};

export default DuesSection;
