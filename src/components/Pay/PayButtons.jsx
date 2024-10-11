import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const PayButtons = () => {
  /**
   * usePayPalScriptReducer use within PayPalScriptProvider
   * isPending: not finished loading(default state)
   * isResolved: successfully loaded
   * isRejected: failed to load
   */
  const [{ isPending }] = usePayPalScriptReducer();
  const paypalbuttonTransactionProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "0.01",
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
      {isPending ? <h2>Load Smart Payment Button...</h2> : null}
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
