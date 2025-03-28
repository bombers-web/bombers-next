import { Button, Link, Stack } from "@chakra-ui/react";

const DuesButtons = () => {
  const subscriptions = {
    "Sr. Player Dues - monthly (30 per month)":
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-9NL41251R87142636MDWJ6MI",
    "Rookie Player Dues - Monthly (20 per month)":
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-11C84787D0814841GMD7WLZY",
    "Sr. Player Dues - Lump(360 one time)":
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-0N256970XA1578740MEEWG5Y",
    "Rookie Player Dues - Lump (240 one time)":
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3FS120372Y6760101MEEWFVI",
    "Alumni Dues - Tier 1(10 per month) club member and free beer at home matches":
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-2N692775Y6541725DMITZLHA",
    "Alumni Dues - Tier 2 (20 per month) club member, free beer at home matches, annual polo and voting rights at AGM":
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3W902499R0041970WML73FOA",
    "Alumni Dues - Tier 3(30 per month) club member, fre beer, polo, voting rights, free entry to annual award banquet":
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-44T80983CU5880629ML73GMI",
    "7s Qualifier Player (50 per month for 4 months)":
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-37R54582B1762132PMKUIG4Y",
    "Bombers Business Network Dues (40 per month) (Tier 2 + feature on website as a club sponsor, 4x networking HH's and 1 sponsors tent at fall home match.)":
      "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-7FG369770X2600427ML73H3Q",
  };

  const duesSubscriptions = [
    {
      name: "Sr. Dues - Monthly",
      link: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-9NL41251R87142636MDWJ6MI",
    },
    {
      name: "Sr. Dues - Lump Sum",
      link: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-0N256970XA1578740MEEWG5Y",
    },
    {
      name: "Rookie Dues - Monthly",
      link: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-11C84787D0814841GMD7WLZY",
    },
    {
      name: "Rookie Dues - Lump Sum",
      link: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-3FS120372Y6760101MEEWFVI",
    },
  ];

  return (
    <>
      <Stack>
        {duesSubscriptions.map((plan) => (
          <Button maxW="300px" key={plan.name}>
            <Link href={plan.link} isExternal>
              {plan.name}
            </Link>
          </Button>
        ))}
      </Stack>
    </>
  );
};

export default DuesButtons;

// Data details: {
//   "orderID": "66N40365SX1559041",
//   "payerID": "CAFD4FGGT7EAE",
//   "paymentID": "66N40365SX1559041",
//   "billingToken": null,
//   "facilitatorAccessToken": "A21AAJ46ieUl1R5iaSH_iTflWN_JMShdW34ehynnMowtaN2YIEpnSQqZXvebtF8Heh4CU8FBiRDi-Xgly3anf_2OwCiv4wrbg",
//   "paymentSource": "paypal"
// }
