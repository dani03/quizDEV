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
      <div className="mb-1 flex flex-col gap-6">
        <Typography variant="lead" color="white">
          Label
        </Typography>
        <Input
          size="lg"
          name="name"
<<<<<<< HEAD
          className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
=======
          className="bg-white border border-purplePrimary"
>>>>>>> develop
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
<<<<<<< HEAD
          className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
=======
          className="bg-white border border-purplePrimary"
>>>>>>> develop
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
<<<<<<< HEAD
          className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
=======
          className="bg-white border border-purplePrimary"
>>>>>>> develop
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />

        <Button
          type="submit"
          fullWidth
          className="mt-4 mx-auto bg-deepBrownPrimary hover:opacity-75"
        >
          Create your Level
        </Button>
      </div>
    </form>
  )
}

export default CreateLevel
