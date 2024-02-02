import NavBar from "../src/components/NavBar"
import { useContext, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import { makeClient } from "../src/services/makeClient"
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react"
import Popup from "../src/components/Popup"

const Login = () => {
  const [error, setError] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const { jwt, logout, saveJwt } = useContext(AppContext)
  const handleOpen = () => setOpenPopup(!openPopup)

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      setError(null)
      const {
        data: { jwt, userId },
      } = await makeClient().post("/login", {
        pseudo: event.currentTarget.pseudo.value,
        password: event.currentTarget.password.value,
      })

      if (!jwt) {
        throw new Error("Missing jwt")
      }

      saveJwt(jwt, userId)
      setError(null)
    } catch (err) {
      if (err.message) {
        setError(err.message)
        handleOpen()
        return
      }
      setError("Something went wrong...")
      handleOpen()
    }
  }

  return (
    <div>
      <NavBar jwt={jwt} logout={logout} />
      <div className="flex justify-center mt-20">
        <Card className="bg-white px-8 py-4" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Login
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to login.
          </Typography>
          <form
            onSubmit={handleFormSubmit}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Pseudo
              </Typography>
              <Input
                size="lg"
                name="pseudo"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password"
                placeholder="********"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button className="mt-6 bg-yellow-400" type="submit" fullWidth>
              Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              You don't have a account ?{" "}
              <a href="#" className="font-medium text-gray-900">
                Sign up here
              </a>
            </Typography>
          </form>
        </Card>
        <Popup msg={error} open={openPopup} handleOpen={handleOpen} />
      </div>
    </div>
  )
}

export default Login
