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
  const [base64, setBase64] = useState(null)

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
          saveUser(response.data)
          console.log(base64)
          axios
            .post(
              "http://localhost:3002/api/v1/add/profil-picture",
              {
                image: base64,
              },
              {
                headers: {
                  Authorization: `Bearer ${response.data.access_token}`,
                },
              }
            )
            .then(function (response) {
              console.log(response)
            })
            .catch(function (error) {
              console.log(error)
            })

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

  const addPicture = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = () => {
      setBase64(reader.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  return (
    <div
      className={`h-screen bg-cover ${
        !isError ? "md:bg-normal bg-mobile" : "md:bg-error bg-error_mobile"
      }`}
    >
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} />
      <div className="flex justify-center md:mt-2">
        <Card className="bg-transparent px-4 md:px-8 md:py-2" shadow={false}>
          <p className="text-white text-center font-passion text-45xl md:text-5xl -mb-4 text-shadow-lg shadow-gray-900/50">
            REGISTER
          </p>
          <p className="mt-1 font-normal font-dancing text-2xl text-center text-white text-shadow-lg shadow-gray-900/50">
            Nice to meet you! Enter your details to login.
          </p>
          <form onSubmit={handleFormSubmit} className="mt-8 mb-2 ">
            <div className="mb-1 flex flex-col gap-6 overflow-y-auto max-h-96 ">
              <Typography variant="h6" color="white" className="-mb-3">
                Profile Picture
              </Typography>
              <Input
                size="lg"
                name="picture"
                onChange={addPicture}
                placeholder="add your profile picture"
                type="file"
                className="border-2 !border-t-blue-gray-200 focus:!border-t-gray-900 text-white placeholder:text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {base64 && (
                <img
                  src={base64}
                  height={100}
                  width={100}
                  className="rounded-xl mx-auto"
                  alt="Uploaded profile"
                />
              )}
              <Typography variant="h6" color="white" className="-mb-3">
                Firstname
              </Typography>
              <Input
                size="lg"
                name="name"
                placeholder="firstname"
                className="border-2 !border-t-blue-gray-200 focus:!border-t-gray-900 text-white placeholder:text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="white" className="-mb-3">
                Lastname
              </Typography>
              <Input
                size="lg"
                name="lastname"
                placeholder="lastname"
                className="border-2 !border-t-blue-gray-200 focus:!border-t-gray-900 text-white placeholder:text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="white" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                type="email"
                name="email"
                placeholder="email@email.com"
                className="border-2 !border-t-blue-gray-200 focus:!border-t-gray-900 text-white placeholder:text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="white" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password"
                placeholder="********"
                className="border-2 !border-t-blue-gray-200 focus:!border-t-gray-900 text-white placeholder:text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="white" className="-mb-3">
                Password Confirmation
              </Typography>
              <Input
                type="password"
                size="lg"
                name="password_confirmation"
                placeholder="********"
                className="border-2 !border-t-blue-gray-200 focus:!border-t-gray-900 text-white placeholder:text-white"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button
              className="mt-6 bg-deepBrownPrimary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
            <Typography
              color="white"
              className="mt-4 text-center font-normal italic"
            >
              You already have a account ?{" "}
              <a href="/login" className="font-medium text-blue-500 underline">
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
