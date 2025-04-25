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

const DuesSection = () => {
  // const subscriptions = {
  //   "Sr. Player Dues - monthly (30 per month)":
  //     "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-9NL41251R87142636MDWJ6MI",
  //   "Rookie Player Dues - Monthly (20 per month)":
  //     "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-11C84787D0814841GMD7WLZY",
  //   "Sr. Player Dues - Lump(360 one time)":
  //     "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-0N256970XA1578740MEEWG5Y",
  //   "Rookie Player Dues - Lump (240 one time)":
  //     "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3FS120372Y6760101MEEWFVI",
  //   "Alumni Dues - Tier 1(10 per month) club member and free beer at home matches":
  //     "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-2N692775Y6541725DMITZLHA",
  //   "Alumni Dues - Tier 2 (20 per month) club member, free beer at home matches, annual polo and voting rights at AGM":
  //     "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3W902499R0041970WML73FOA",
  //   "Alumni Dues - Tier 3(30 per month) club member, fre beer, polo, voting rights, free entry to annual award banquet":
  //     "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-44T80983CU5880629ML73GMI",
  //   "7s Qualifier Player (50 per month for 4 months)":
  //     "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-37R54582B1762132PMKUIG4Y",
  //   "Bombers Business Network Dues (40 per month) (Tier 2 + feature on website as a club sponsor, 4x networking HH's and 1 sponsors tent at fall home match.)":
  //     "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-7FG369770X2600427ML73H3Q",
  // };

  const basePaypalUrl =
    "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=";

  const duesSubscriptions: DuesSubscription[] = [
    {
      description: "Sr. Dues - Monthly",
      planId: "P-9NL41251R87142636MDWJ6MI",
      cost: 30,
      type: "monthly",
      benefits: "",
    },
    {
      description: "Sr. Dues - One-time",
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
    // {
    //   description: "Alumni Dues - Monthly",
    //   planId: "P-4BW2104986602192HMQ2NUII",
    //   cost: 10,
    //   type: "monthly",
    //   benefits: "Official club membership and free beer at home matches.",
    // },
    {
      description: "Bombers Alumni Dues - Tier 3",
      planId: "P-44T80983CU5880629ML73GMI",
      cost: 30,
      type: "monthly",
      benefits:
        "Official club membership free beer at home matches annual polo voting rights at AGM and free entry to the Annual Award Banquet.",
    },
    {
      description: "Bombers Alumni Dues - Tier 2",
      planId: "P-3W902499R0041970WML73FOA",
      cost: 20,
      type: "monthly",
      benefits:
        "Official club membership, free beer at home matches, annual polo and voting rights at Annual General Meeting.",
    },
    {
      description: "Bombers Alumni Dues - Tier 1",
      planId: "P-2N692775Y6541725DMITZLHA",
      cost: 10,
      type: "monthly",
      benefits: "Official club membership and free beer at home matches.",
    },
  ];

  return (
    <Box
      p={4}
      bg="brand.white"
      borderRadius="md"
      boxShadow="md"
      maxWidth="1140px"
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
        <Stack>
          {duesSubscriptions.map(
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
        </Stack>
      </VStack>
    </Box>
  );
};

export default DuesSection;
