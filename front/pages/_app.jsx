import { useEffect } from "react"
import AppContextProvider from "../src/components/AppContext"
import "../styles/globals.css"
import { motion } from "framer-motion"
import Head from "next/head"

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log(
              "Service Worker registered with scope:",
              registration.scope
            )
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err)
          })
      })
    }
  }, [])

  return (
    <AppContextProvider>
      <main className="font-montserrat">
        <motion.div
          initial={transition.pageInitial}
          animate={transition.pageAnimate}
          variants={transition}
        >
          <Head>
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
            <title>Job'in quiz</title>
            <meta name="description" content="Job'in quiz" />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF" />
            <meta name="theme-color" content="#ffffff" />
            <link rel="apple-touch-icon" href="/icons/logo-192.png" />
            <link
              rel="apple-touch-icon"
              sizes="192x192"
              href="/icons/logo-192.png"
            />
            <link rel="manifest" href="/manifest.json" />
          </Head>
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
