import AppContextProvider, { AppContext } from "../src/components/AppContext"
import "../styles/globals.css"

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <main className="font-montserrat">
        <Component {...pageProps} />
      </main>
    </AppContextProvider>
  )
}

export default MyApp
