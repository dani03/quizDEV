import { useContext } from "react"
import { AppContext } from "../src/components/AppContext"
import ParticlesComponent from "../src/components/ParticlesComponent"
import NavBar from "../src/components/NavBar"
import { Card, Typography } from "@material-tailwind/react"

const MyProfile = () => {
  const { jwt, logout, user, isError, role, myProfile } = useContext(AppContext)

  return (
    <div
      className={`h-screen bg-cover ${
        !isError ? "md:bg-normal bg-mobile" : "md:bg-error bg-error_mobile"
      }`}
    >
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} pseudo={user || ""} role={role || 2} />
      <div className="flex justify-center mt-4 md:mt-8">
        <Card className="bg-transparent mx-auto" shadow={false}>
          <div>
            {myProfile.map((user) => (
              <div key={user.id}>{user}</div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default MyProfile
