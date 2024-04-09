import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import { Card, Button } from "@material-tailwind/react"
import { motion } from "framer-motion"
import { useContext } from "react"
import ParticlesComponent from "../src/components/ParticlesComponent"

const Home = () => {
  const { jwt, logout, user, isError, role } = useContext(AppContext)

  return (
    <>
      <ParticlesComponent isError={isError} />
      <div className="h-screen md:bg-normal bg-mobile bg-cover">
        <NavBar jwt={jwt} logout={logout} pseudo={user || ""} role={role} />
        <Card className="bg-transparent" shadow={false}>
          <motion.ul
            className="mt-16 mx-auto"
            initial="hidden"
            animate="visible"
            variants={list}
          >
            <motion.li variants={item}>
              <p className="text-white md:text-4xl text-2xl text-center font-dancing md:-mb-12 -mb-8 text-shadow-lg shadow-gray-900/50">
                Unlock Potential
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="md:text-5xl whitespace-nowrap text-45xl text-center text-white font-bold font-passion md:-mb-32 -mb-16 text-shadow-lg shadow-gray-900/50">
                JOB'IN
              </p>
              <p className="md:text-5xl whitespace-nowrap text-45xl text-center text-white font-bold font-passion md:-mb-12 -mb-8 text-shadow-lg shadow-gray-900/50">
                QUIZ
              </p>
            </motion.li>
            <motion.li variants={item}>
              <p className="text-white md:text-4xl text-2xl text-center font-dancing mx-auto  text-shadow-lg shadow-gray-900/50">
                Discover Talent
              </p>
            </motion.li>
          </motion.ul>
          <Button className="mt-32 w-64 mx-auto bg-purplePrimary shadow-xl">
            Try out now
          </Button>
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
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
  transition: {
    when: "afterChildren",
  },
}

export default Home
