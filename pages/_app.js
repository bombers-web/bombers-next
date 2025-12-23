import { ChakraProvider } from '@chakra-ui/react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Head from 'next/head'
import { createContext } from 'react'
import theme from '../theme'
import '../theme/globalStyles.scss'

// Store Strapi Global object in context
export const GlobalContext = createContext({})

config.autoAddCss = false

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <GlobalContext.Provider value={global}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </GlobalContext.Provider>
    </>
  )
}

export default MyApp
