import { Button, Input, Typography } from "@material-tailwind/react"
import axios from "axios"
import { useState } from "react"

const CreateLevel = (props) => {
  const { jwt } = props
  const [error, setError] = useState("")

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
      .post(
        "http://localhost:3002/api/v1/level/store",
        {
          name: event.currentTarget.name.value,
          points: event.currentTarget.points.value,
          slug: event.currentTarget.slug.value,
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
      <div className="mb-1 flex flex-col gap-6 w-80">
        <Typography variant="lead" color="white">
          Label
        </Typography>
        <Input
          size="lg"
          name="name"
          className="bg-white border"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="lead" color="white">
          Points
        </Typography>
        <Input
          size="lg"
          name="points"
          className="bg-white border"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="lead" color="white">
          Slug
        </Typography>
        <Input
          size="lg"
          name="slug"
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
          Create your Level
        </Button>
      </div>
    </form>
  )
}

export default CreateLevel
