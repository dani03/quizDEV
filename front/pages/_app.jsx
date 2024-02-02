import AppContextProvider from "../src/components/AppContext"
import "../styles/globals.css"
import { Roboto } from "next/font/google"

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </AppContextProvider>
  )
}

export default MyApp
