import { useContext } from "react"
import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import UseApi from "../src/components/UseApi"
import { Typography } from "@material-tailwind/react"
import { motion } from "framer-motion"

const Home = () => {
  const { jwt, logout, userId, saveUser, user } = useContext(AppContext)
  if (userId) {
    const user = UseApi({}, "get", `/users/${userId}`)
    if (user) {
      saveUser(
        JSON.stringify({
          id: user.id,
          pseudo: user.pseudo,
          totalPoints: user.total_points,
        })
      )
    }
  }

  return (
    <div className="h-screen">
      <NavBar
        jwt={jwt}
        logout={logout}
        pseudo={user ? JSON.parse(user).pseudo : null}
      />
      <div className="flex justify-center mt-10">
        <motion.ul
          className="grid grid-cols-1 gap-4 place-content-center w-2/3"
          initial="hidden"
          animate="visible"
          variants={list}
        >
          <motion.li variants={item}>
            <Typography variant="h1" color="white">
              Welcome {user ? <h1>{JSON.parse(user).pseudo}</h1> : null}
            </Typography>
          </motion.li>
          <motion.li variants={item}>
            <Typography variant="h5" color="white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
              voluptates itaque saepe blanditiis corrupti facilis voluptatem
              dicta est. Nihil omnis, voluptas voluptatem minus quidem
              distinctio fuga eveniet cum voluptate corporis.
            </Typography>
          </motion.li>
          <motion.li variants={item}>
            <Typography variant="h5" color="white">
              Welcom
            </Typography>
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
