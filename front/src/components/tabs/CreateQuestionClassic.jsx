import { Button, Typography, Checkbox, Input } from "@material-tailwind/react"
import axios from "axios"
import { useState } from "react"
import Popup from "../Popup"

const CreateQuestionClassic = (props) => {
  const [error, setError] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const { levels, domains, jwt, changeIsError } = props

  const handleOpen = () => {
    changeIsError()
    setOpenPopup(!openPopup)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const answers = {}

    // Vérifier chaque réponse avant de l'ajouter à l'objet
    if (event.currentTarget.answer1 && event.currentTarget.answer1.value) {
      answers[event.currentTarget.answer1.value] =
        event.currentTarget.answer1Checkbox.checked
    }
    if (event.currentTarget.answer2 && event.currentTarget.answer2.value) {
      answers[event.currentTarget.answer2.value] =
        event.currentTarget.answer2Checkbox.checked
    }
    if (event.currentTarget.answer3 && event.currentTarget.answer3.value) {
      answers[event.currentTarget.answer3.value] =
        event.currentTarget.answer3Checkbox.checked
    }
    if (event.currentTarget.answer4 && event.currentTarget.answer4.value) {
      answers[event.currentTarget.answer4.value] =
        event.currentTarget.answer4Checkbox.checked
    }

    axios
      .post(
        "http://localhost:3002/api/v1/question/store",
        {
          title: event.currentTarget.question.value,
          level_id: event.currentTarget.level.value,
          domain_id: event.currentTarget.domain.value,
          answers: answers,
          points: event.currentTarget.points.value,
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
        setOpenPopup(true)
        changeIsError()
        setError(error?.response?.data?.message || "Error 403")
      })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-1 flex flex-col gap-6 w-80 md:w-128 overflow-y-auto h-96 md:h-full h-[650px]">
        <Typography variant="lead" color="white">
          Question
        </Typography>
        <Input
          type="text"
          name="question"
          placeholder="Quelle est la capitale de la France ?"
          className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
        />
        <div className="flex items-center">
          <Input
            type="text"
            name="answer1"
            placeholder="answer 1"
            className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
          />
          <Checkbox
            label={
              <Typography color="white" className="text-sm italic">
                Good answer ?
              </Typography>
            }
            name="answer1Checkbox"
            color="yellow"
            className="ml-2"
          />
        </div>
        <div className="flex items-center">
          <Input
            type="text"
            name="answer2"
            placeholder="answer 2"
            className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
          />
          <Checkbox
            label={
              <Typography color="white" className="text-sm italic">
                Good answer ?
              </Typography>
            }
            name="answer2Checkbox"
            color="yellow"
            className="ml-2"
          />
        </div>
        <div className="flex items-center">
          <Input
            type="text"
            name="answer3"
            placeholder="answer 3"
            className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
          />
          <Checkbox
            label={
              <Typography color="white" className="text-sm italic">
                Good answer ?
              </Typography>
            }
            name="answer3Checkbox"
            color="yellow"
            className="ml-2"
          />
        </div>
        <div className="flex items-center">
          <Input
            type="text"
            name="answer4"
            placeholder="answer 4"
            className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
          />
          <Checkbox
            label={
              <Typography color="white" className="text-sm italic">
                Good answer ?
              </Typography>
            }
            name="answer4Checkbox"
            color="yellow"
            className="ml-2"
          />
        </div>
        <Typography variant="lead" color="white">
          Theme
        </Typography>
        <select
          name="domain"
          autoComplete="Theme"
          className="block w-full p-2 rounded-lg bg-transparent border border-2 text-gray-900"
        >
          {Array.isArray(domains.data) && domains.data.length > 0 ? (
            domains.data.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))
          ) : (
            <option></option>
          )}
        </select>
        <Typography variant="lead" color="white">
          Difficulty
        </Typography>
        <select
          name="level"
          autoComplete="Difficulty"
          className="block w-full p-2 rounded-lg bg-transparent border border-2 text-gray-900"
        >
          {Array.isArray(levels.data) && levels.data.length > 0 ? (
            levels.data.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))
          ) : (
            <option></option>
          )}
        </select>
        <Typography variant="lead" color="white">
          Points
        </Typography>
        <Input
          type="number"
          name="points"
          className="text-white placeholder:text-white border border-2 p-2 rounded-lg"
        />
        <Button
          type="submit"
          fullWidth
          className="mt-4 mx-auto bg-deepBrownPrimary hover:opacity-75"
        >
          Create your question
        </Button>
      </div>
      <Popup msg={error} open={openPopup} handleOpen={handleOpen} />
    </form>
  )
}

export default CreateQuestionClassic
