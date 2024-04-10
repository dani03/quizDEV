import AppContextProvider, { AppContext } from "../src/components/AppContext"
import "../styles/globals.css"
import { motion } from "framer-motion"

const MyApp = ({ Component, pageProps }) => {
  return (
    <AppContextProvider>
      <main className="font-montserrat">
        <motion.div
          initial={transition.pageInitial}
          animate={transition.pageAnimate}
          variants={transition}
        >
          <Component {...pageProps} />
        </motion.div>
      </main>
    </AppContextProvider>
  )
}

export const transition = {
  pageInitial: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(01px)",
  },
  pageAnimate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
}

export default MyApp
