import { useContext, useEffect, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import ParticlesComponent from "../src/components/ParticlesComponent"
import NavBar from "../src/components/NavBar"
import { Button, Card, Input, Typography } from "@material-tailwind/react"
import Popup from "../src/components/Popup"
import Select from "react-select"
import axios from "axios"
import QuizTable from "../src/components/tabs/QuizTable"

const CreateQuiz = () => {
  const { jwt, logout, user, isError, role, questions, quiz, levels } =
    useContext(AppContext)
  const [error, setError] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const [positivPopup, setPositivPopup] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const options = Array.isArray(questions.data)
    ? questions.data.map((question) => ({
        value: question.id,
        label: question.title,
      }))
    : []

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions)
  }

  const handleOpen = () => {
    setOpenPopup(!openPopup)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    axios
      .post(
        "http://localhost:3002/api/v1/quiz/store",
        {
          title: event.currentTarget.title.value,
          level_id: event.currentTarget.level.value,
          questions_ids: selectedOptions.map(
            (selectedQuestion) => selectedQuestion.value
          ),
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        setPositivPopup(true)
        setError(`${response.data.message}`)
        setOpenPopup(!openPopup)
        setTimeout(() => window.location.reload(), 2000)
      })
      .catch(function (error) {
        setPositivPopup(false)
        setError(error?.response?.data?.message || "Error 403")
        setOpenPopup(!openPopup)
      })
  }

  return (
    <div
      className={`overflow-auto h-screen bg-cover ${
        !isError ? "md:bg-normal bg-mobile" : "md:bg-error bg-error_mobile"
      }`}
    >
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} pseudo={user || ""} role={role || 2} />
      <div className="flex justify-center mt-8 md:mt-16">
        <Card className="bg-transparent mx-auto" shadow={false}>
          <div className="flex justify-center mb-4 w-80 md:w-192 p-2 bg-transparent rounded-lg mx-auto">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography className="text-4xl text-white font-bold mb-4 text-center">
                  Create your custom quiz
                </Typography>
                <Typography className="text-xl font-bold text-white">
                  Select your questions
                </Typography>
                <Input
                  size="lg"
                  name="title"
                  className="border border-2 border-white placeholder:text-white text-white font-bold py-4 px-3"
                  placeholder="Title"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography className="text-xl font-bold text-white">
                  Difficulty
                </Typography>
                <select
                  name="level"
                  autoComplete="Difficulty"
                  className="block w-full py-2 px-3 rounded-lg bg-transparent border border-2 text-white font-bold"
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
                <Typography className="text-xl font-bold text-white">
                  Select your questions
                </Typography>
                {isClient && (
                  <Select
                    isMulti
                    options={options}
                    onChange={handleSelectChange}
                    className="basic-multi-select rounded-xl"
                    classNamePrefix="select"
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  className="mt-4 mx-auto bg-deepBrownPrimary hover:opacity-75"
                >
                  Create your Theme
                </Button>
              </div>
              <Popup
                msg={error}
                open={openPopup}
                handleOpen={handleOpen}
                positive={positivPopup}
              />
            </form>
          </div>
        </Card>
      </div>
      <hr className="text-xl font-bold" />
      <div className="mx-auto">
        <QuizTable quiz={quiz} />
      </div>
    </div>
  )
}

export default CreateQuiz