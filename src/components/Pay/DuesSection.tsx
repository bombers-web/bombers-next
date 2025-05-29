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

const DuesSection = ({ subscriptions }) => {
  const basePaypalUrl =
    "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=";

  const playerDuesSubscriptions: DuesSubscription[] = [
    {
      description: "Sr. Dues - Monthly",
      planId: "P-9NL41251R87142636MDWJ6MI",
      cost: 30,
      type: "monthly",
      benefits: "",
    },
    {
      description: "Sr. Dues - Yearly",
      planId: "P-0N256970XA1578740MEEWG5Y",
      cost: 360,
      type: "one-time",
      benefits: "",
    },
    {
      description: "Rookie Dues - Monthly",
      planId: "P-11C84787D0814841GMD7WLZY",
      cost: 20,
      type: "monthly",
      benefits: "",
    },
    {
      description: "Rookie Dues - One-time",
      planId: "P-3FS120372Y6760101MEEWFVI",
      cost: 240,
      type: "one-time",
      benefits: "",
    },
  ];

  const supporterDuesSubscriptions: DuesSubscription[] = [
    {
      description: "Bombers Club Supporter",
      planId: "P-2N692775Y6541725DMITZLHA",
      cost: 10,
      type: "monthly",
      benefits: "Beer provided at after match functions.",
    },
    {
      description: "Bombers Club Member",
      // planId: "P-3W902499R0041970WML73FOA", Former Tier 2 plan ID. $20.
      planId: "P-44T80983CU5880629ML73GMI",
      cost: 30,
      type: "monthly",
      benefits:
        "Beer provided at after match functions, bi-annual polo and voting rights at Annual General Meeting.",
    },
  ];

  const SubscriptionList = ({ subList }: SubscriptionListProps) => {
    return (
      <Stack maxW="100%">
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
            // fontWeight="bold"
            // fontFamily="Big Shoulders Display"
            // fontSize="xl"
            color="brand.black"
            maxW="100%"
            alignSelf="center"
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

        {/* <Stack> */}
        {/* {subscriptions?.map(
            ({ description, planId, cost, type, benefits }) => (
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
                      <Text m={0} fontStyle="italic">
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
            )
          )}
        </Stack> */}
      </VStack>
    </Box>
  );
};

export default DuesSection;
