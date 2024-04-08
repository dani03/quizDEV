import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import { Card, Typography } from "@material-tailwind/react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@material-tailwind/react"
import { useContext } from "react"
import ParticlesComponent from "../src/components/ParticlesComponent"

const Home = () => {
  const { jwt, logout, user, isError } = useContext(AppContext)

  return (
    <>
      <ParticlesComponent isError={isError} />
      <div className="h-screen">
        <NavBar jwt={jwt} logout={logout} pseudo={user || ""} />
        <Card className="bg-transparent mt-10 px-16">
          <motion.ul
            className="grid grid-cols-1 gap-4 place-content-center w-2/3"
            initial="hidden"
            animate="visible"
            variants={list}
          >
            <motion.li variants={item}>
              <Typography variant="h1" color="white">
                {user ? user : ""}
              </Typography>
            </motion.li>
            <motion.li variants={item}>
              <Typography variant="h5" color="white">
                If you want to test, click on the button !
              </Typography>
            </motion.li>
            <motion.li variants={item}>
              <Link href="/classic-mode">
                <Button color="white">Test questions</Button>
              </Link>
            </motion.li>
          </motion.ul>
        </Card>
      </div>
    </>
  )
}

export const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: { opacity: 0 },
}
export const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -100 },
  transition: {
    when: "afterChildren",
  },
}

export default Home
