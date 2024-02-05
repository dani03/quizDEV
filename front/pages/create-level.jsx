import { useContext } from "react"
import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import ParticlesComponent from "../src/components/ParticlesComponent"

const Login = () => {
  const { jwt, logout, user, isError } = useContext(AppContext)

  return (
    <div className="h-screen">
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} pseudo={user ? user : ""} />
      <div className="flex justify-center mt-20 w-72">
        <div className="z-0"></div>
      </div>
    </div>
  )
}

export default Login
