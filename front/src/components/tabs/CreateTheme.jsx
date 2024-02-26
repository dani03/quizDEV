import { Button, Input, Typography } from "@material-tailwind/react"
import axios from "axios"
import { useState } from "react"

const CreateTheme = () => {
  const [error, setError] = useState("")

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
      .post("http://localhost:3002/api/v1/create-theme", {
        themeLabel: event.currentTarget.themeLabel.value,
      })
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
      <div className="mb-1 flex flex-col gap-6 w-80">
        <Typography variant="lead" color="white">
          Label
        </Typography>
        <Input
          size="lg"
          name="themeLabel"
          className="bg-white border"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />

        <Button
          type="submit"
          fullWidth
          className="mt-4 mx-auto hover:bg-yellow-600"
          color="yellow"
        >
          Create your Theme
        </Button>
      </div>
    </form>
  )
}

export default CreateTheme
