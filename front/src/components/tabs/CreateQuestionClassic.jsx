import { Button, Input, Typography } from "@material-tailwind/react"
import axios from "axios"
import { useState } from "react"

const CreateQuestionClassic = () => {
  const [error, setError] = useState("")

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
      .post("http://localhost:3002/api/v1/create-question", {
        question: event.currentTarget.question.value,
        answer1: event.currentTarget.answer1.value,
        answer1: event.currentTarget.answer2.value,
        answer1: event.currentTarget.answer3.value,
        answer1: event.currentTarget.answer4.value,
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
          Question
        </Typography>
        <Input
          size="lg"
          name="question"
          placeholder="Quelle est la capital de la France ?"
          className="bg-white border"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="lead" color="white">
          Answer 1
        </Typography>
        <Input
          size="lg"
          name="answer1"
          className="bg-white border"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="lead" color="white">
          Answer 2
        </Typography>
        <Input
          size="lg"
          name="answer2"
          className="bg-white border"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="lead" color="white">
          Answer 3
        </Typography>
        <Input
          size="lg"
          name="answer3"
          className="bg-white border"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <Typography variant="lead" color="white">
          Answer 4
        </Typography>
        <Input
          size="lg"
          name="answer4"
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
          Create your question
        </Button>
      </div>
    </form>
  )
}

export default CreateQuestionClassic
