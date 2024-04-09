import { Button, Input, Typography } from "@material-tailwind/react"
import axios from "axios"
import { useState } from "react"

<<<<<<< HEAD
const CreateTheme = (props) => {
  const { jwt } = props
=======
const CreateTheme = () => {
>>>>>>> origin
  const [error, setError] = useState("")

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
<<<<<<< HEAD
      .post(
        "http://localhost:3002/api/v1/domain/store",
        {
          name: event.currentTarget.name.value,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
=======
      .post("http://localhost:3002/api/v1/create-theme", {
        themeLabel: event.currentTarget.themeLabel.value,
      })
>>>>>>> origin
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
        setError(error?.response?.data?.message || "Error 403")
      })
  }

  return (
    <form onSubmit={handleFormSubmit}>
<<<<<<< HEAD
      <div className="mb-1 flex flex-col gap-6">
=======
      <div className="mb-1 flex flex-col gap-6 w-80">
>>>>>>> origin
        <Typography variant="lead" color="white">
          Label
        </Typography>
        <Input
          size="lg"
<<<<<<< HEAD
          name="name"
          className="bg-white border border-purplePrimary"
=======
          name="themeLabel"
          className="bg-white border"
>>>>>>> origin
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />

        <Button
          type="submit"
          fullWidth
<<<<<<< HEAD
          className="mt-4 mx-auto bg-deepBrownPrimary hover:opacity-75"
=======
          className="mt-4 mx-auto hover:bg-yellow-600"
          color="yellow"
>>>>>>> origin
        >
          Create your Theme
        </Button>
      </div>
    </form>
  )
}

export default CreateTheme
