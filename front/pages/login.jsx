import NavBar from "../src/components/NavBar"
import { useContext, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import { Card, Input, Button, Typography } from "@material-tailwind/react"
import Popup from "../src/components/Popup"
import axios from "axios"
import { Router } from "next/router"
import ParticlesComponent from "../src/components/ParticlesComponent"

const Login = () => {
  const [error, setError] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const { jwt, logout, saveJwt, user, saveUser, isError, changeIsError } =
    useContext(AppContext)
  const handleOpen = () => setOpenPopup(!openPopup)

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
      .post("http://localhost:3002/api/v1/auth/login", {
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
      })
      .then(function (response) {
        if (
          response.data.access_token &&
          response.data.name &&
          response.data.id
        ) {
          console.log(response.data)
          saveJwt(response.data.access_token, response.data.id)
          saveUser(response.data.name)
          setTimeout(() => Router.push("/"), 1000)
        } else {
          changeIsError()
          setError("Error JWT")
        }
      })
      .catch(function (error) {
        changeIsError()
        setError(error?.response?.data?.message || "Error 403")
        handleOpen()
      })
  }

  return (
    <div>
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} pseudo={user ? user : ""} />
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
                Your Email
              </Typography>
              <Input
                size="lg"
                name="email"
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
              <a href="/register" className="font-medium text-blue-400">
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
