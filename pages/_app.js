import { ChakraProvider } from "@chakra-ui/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Head from "next/head";
import { createContext } from "react";
import theme from "../theme";
import "../theme/globalStyles.scss";

// Store Strapi Global object in context
export const GlobalContext = createContext({});

config.autoAddCss = false;

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps;
  const initialOptions = {
    // clientId: process.env.PAYPAL_CLIENT_ID,
    clientId:
      "AaRjAkY2Ls90p_WRh9UmKUKy4oEcbMtq6D8rjU2TUlNyBRzokh58qM7e8Ym1SNOv8w4LScDKCs5je3Hr",
    currency: "USD",
    components: "buttons",
    intent: "capture",
    vault: "true",
    // "data-client-token": "abc123xyz==",
    // "data-sdk-integration-source": "button-factory",
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PayPalScriptProvider options={initialOptions}>
        <GlobalContext.Provider value={global}>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </GlobalContext.Provider>
      </PayPalScriptProvider>
    </>
  );
};

export default MyApp;
