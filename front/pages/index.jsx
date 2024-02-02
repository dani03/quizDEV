import { useContext } from "react"
import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import { Button, Typography } from "@material-tailwind/react"
import { motion } from "framer-motion"
import Link from "next/link"

const Home = () => {
  const { jwt, logout, user } = useContext(AppContext)

  return (
    <div className="h-screen">
      <NavBar jwt={jwt} logout={logout} pseudo={user || ""} />
      <div className="flex justify-center mt-10">
        <motion.ul
          className="grid grid-cols-1 gap-4 place-content-center w-2/3"
          initial="hidden"
          animate="visible"
          variants={list}
        >
          <motion.li variants={item}>
            <Typography variant="h1" color="white">
              {user || ""}
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
      </div>
    </div>
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
