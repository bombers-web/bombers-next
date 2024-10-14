import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";

const PayButtons = () => {
  /**
   * usePayPalScriptReducer use within PayPalScriptProvider
   * isPending: not finished loading(default state)
   * isResolved: successfully loaded
   * isRejected: failed to load
   */
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const [value, setValue] = useState("10");

  const InEligibleError = ({ text }) => (
    <h3 style={{ color: "#dc3545", textTransform: "capitalize" }}>
      {text || "The component is ineligible to render"}
    </h3>
  );

  const handleCustomAmount = (e) => {
    e.preventDefault();
    setValue(e.currentTarget.value);
  };

  const paypalbuttonTransactionProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: value,
            },
          },
        ],
      });
    },
    onApprove(data, actions) {
      /**
       * data: {
       *   orderID: string;
       *   payerID: string;
       *   paymentID: string | null;
       *   billingToken: string | null;
       *   facilitatorAccesstoken: string;
       * }
       */
      return actions.order.capture({}).then((details) => {
        alert(
          "Transaction completed by" +
            (details?.payer.name.given_name ?? "No details")
        );

        alert("Data details: " + JSON.stringify(data, null, 2));
      });
    },
  };
  return (
    <>
      {isPending ? <h2>Loading Payment Button...</h2> : null}
      <Flex
        direction="row"
        justifyContent="space-evenly"
        color="brand.light"
        alignItems="center"
      >
        <InputGroup size="sm" ml="4" borderRadius="8">
          <InputLeftAddon children="$" bg="brand.dark" color="brand.light" />
          <Input
            w="60%"
            type="number"
            placeholder="enter amount"
            value={value}
            onChange={handleCustomAmount}
            color="brand.dark"
          ></Input>
        </InputGroup>
      </Flex>
      <PayPalButtons fundingSource="venmo" style={{ color: "blue" }}>
        <InEligibleError text="You are not eligible to pay with Venmo." />
      </PayPalButtons>
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
};

export default PayButtons;

// Data details: {
//   "orderID": "66N40365SX1559041",
//   "payerID": "CAFD4FGGT7EAE",
//   "paymentID": "66N40365SX1559041",
//   "billingToken": null,
//   "facilitatorAccessToken": "A21AAJ46ieUl1R5iaSH_iTflWN_JMShdW34ehynnMowtaN2YIEpnSQqZXvebtF8Heh4CU8FBiRDi-Xgly3anf_2OwCiv4wrbg",
//   "paymentSource": "paypal"
// }
