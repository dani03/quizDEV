import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import { Card, Typography } from "@material-tailwind/react"
import { motion } from "framer-motion"
import { useContext } from "react"
import ParticlesComponent from "../src/components/ParticlesComponent"

const Home = () => {
  const { jwt, logout, user, isError, role } = useContext(AppContext)

  return (
    <>
      <ParticlesComponent isError={isError} />
      <div className="h-screen md:bg-normal bg-mobile">
        <NavBar
          jwt={jwt}
          logout={logout}
          pseudo={user || ""}
          role={role ? role : 2}
        />
        <Card className="bg-transparent">
          <motion.ul
            className="mt-16 mx-auto"
            initial="hidden"
            animate="visible"
            variants={list}
          >
            <motion.li variants={item}>
              <Typography
                className="md:text-4xl text-2xl text-center font-dancing md:-mb-12 -mb-8"
                color="white"
              >
                Unlock Potential
              </Typography>
            </motion.li>
            <motion.li variants={item}>
              <Typography
                className="md:text-5xl text-45xl text-center font-bold font-passion md:-mb-24 -mb-16"
                color="white"
              >
                JOB'IN
              </Typography>
              <Typography
                className="md:text-5xl text-45xl text-center font-bold font-passion md:-mb-12 -mb-8"
                color="white"
              >
                QUIZ
              </Typography>
            </motion.li>
            <motion.li variants={item}>
              <Typography
                className="md:text-4xl text-2xl text-center font-dancing"
                color="white"
              >
                Discover Talent
              </Typography>
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
      staggerChildren: 0.5,
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
