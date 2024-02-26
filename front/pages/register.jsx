import NavBar from "../src/components/NavBar"
import { useContext, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import Popup from "../src/components/Popup"
import { Card, Input, Button, Typography } from "@material-tailwind/react"
import axios from "axios"
import { useRouter } from "next/router"
import ParticlesComponent from "../src/components/ParticlesComponent"

const Register = () => {
  const { jwt, logout, saveJwt, saveUser, isError, changeIsError } =
    useContext(AppContext)
  const [error, setError] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const handleOpen = () => {
    changeIsError()
    setOpenPopup(!openPopup)
  }
  const router = useRouter()

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
      .post("http://localhost:3002/api/v1/auth/register", {
        name: event.currentTarget.name.value,
        lastname: event.currentTarget.lastname.value,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        password_confirmation: event.currentTarget.password_confirmation.value,
        role_id: 2,
      })
      .then(function (response) {
        if (
          response.data.access_token &&
          response.data.name &&
          response.data.id
        ) {
          saveJwt(response.data.access_token, response.data.id)
          saveUser(response.data.name)
          setTimeout(() => router.push("/"), 1000)
        } else {
          setError("Error JWT")
        }
      })
      .catch(function (error) {
        setError(error?.response?.data?.message || "Error 403")
        handleOpen()
      })
  }

  return (
    <div>
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} />
      <div className="flex justify-center mt-20">
        <Card className="bg-white px-4 py-4 md:px-12 md:py-4" shadow={false}>
          <Typography variant="h4" color="blue-gray" className="text-center">
            REGISTER
          </Typography>
          <Typography color="gray" className="mt-1 font-normal text-center">
            Nice to meet you! Enter your details to login.
          </Typography>
          <form
            onSubmit={handleFormSubmit}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Firstname
              </Typography>
              <Input
                size="lg"
                name="name"
                placeholder="firstname"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Lastname
              </Typography>
              <Input
                size="lg"
                name="lastname"
                placeholder="lastname"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                type="email"
                name="email"
                placeholder="email@email.com"
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
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password Confirmation
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password_confirmation"
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
              You already have a account ?{" "}
              <a href="/login" className="font-medium text-blue-400">
                Sign in here
              </a>
            </Typography>
          </form>
        </Card>
        <Popup msg={error} open={openPopup} handleOpen={handleOpen} />
      </div>
    </div>
  )
}

export default Register
