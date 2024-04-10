import { Button, Input, Typography } from "@material-tailwind/react"
import axios from "axios"
import { useState } from "react"

const CreateTheme = (props) => {
  const { jwt } = props
  const [error, setError] = useState("")

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
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
      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="lead" color="white">
          Label
        </Typography>
        <Input
          size="lg"
          name="name"
          className="bg-white border border-purplePrimary"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />

        <Button
          type="submit"
          fullWidth
          className="mt-4 mx-auto bg-deepBrownPrimary hover:opacity-75"
        >
          Create your Theme
        </Button>
      </div>
    </form>
  )
}

export default CreateTheme
