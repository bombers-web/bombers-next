import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

const DonateButton = ({ onApprove }) => {
  // const [{ options }, dispatch] = usePayPalScriptReducer();
  // const [donationAmount, setDonationAmount] = useState("10");
  // const [customAmount, setCustomAmount] = useState(0);
  // const [value, setValue] = useState(10);

  // useEffect(() => {
  //   dispatch({
  //     type: "resetOptions",
  //     value: { ...options, intent: "capture" },
  //   });
  // }, [dispatch, options]);

  // useEffect(() => {
  //   setValue(donationAmount === "custom" ? customAmount : donationAmount);
  // }, [donationAmount, customAmount]);

  // const createOrder = (data, actions) => {
  //   return actions.order
  //     .create({
  //       purchase_units: [
  //         {
  //           amount: {
  //             value,
  //             breakdown: {
  //               item_total: {
  //                 currency_code: "USD",
  //                 value,
  //               },
  //             },
  //           },
  //           items: [
  //             {
  //               name: "Donation to St. Louis Bombers",
  //               quantity: "1",
  //               unit_amount: {
  //                 currency_code: "USD",
  //                 value,
  //               },
  //               category: "DONATION",
  //             },
  //           ],
  //         },
  //       ],
  //     })
  //     .then((orderId) => orderId);
  // };

  // const handleChange = (value) => setDonationAmount(value);
  // const handleCustomAmount = (e) => {
  //   e.preventDefault();
  //   setCustomAmount(e.currentTarget.value);
  //   setDonationAmount("custom");
  // };

  return (
    <>
      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="5JQ4TPW3RQ9UA" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </>
  );
};

export default DonateButton;
