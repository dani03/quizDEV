import { Button, Card } from "@material-tailwind/react"
import NavBar from "../src/components/NavBar"
import ParticlesComponent from "../src/components/ParticlesComponent"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import PopupGame from "../src/components/PopupGame"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import DefaultDisplay from "../src/components/DefaultDisplay"

const Quiz = () => {
  const {
    jwt,
    logout,
    isError,
    myProfile,
    quiz,
    isLightMode,
    toggleLightMode,
  } = useContext(AppContext)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [quizById, setQuizById] = useState(null)
  const [listOfAnswerIds, setListOfAnswerIds] = useState([])
  const searchParams = useSearchParams()
  const [currentQuiz, setCurrentQuiz] = useState(null)

  // ex of context : ?context=ewogICJpZF91c2VyIjogMSwKICAicXVpel9pZCI6IDMKfQ==

  useEffect(() => {
    const context = searchParams.get("context")
    if (context && quiz?.data?.length > 0) {
      setCurrentQuiz(JSON.parse(atob(context)))
      const parsedContext = JSON.parse(atob(context))
      const foundQuiz = quiz.data.find(
        (q) => q.id === Number(parsedContext.quiz_id)
      )
      setQuizById(foundQuiz)
    }
  }, [searchParams, quiz])

  const handleAnswerSubmit = (answer) => {
    setListOfAnswerIds((prev) => [...prev, { [answer.question_id]: answer.id }])
    setSelectedAnswer(answer)
    setFeedback(answer.correct_answer ? "CORRECT" : "WRONG")

    setTimeout(() => {
      setFeedback(null)
      setSelectedAnswer(null)
      setCurrentQuestionIndex((prev) => prev + 1)
    }, 500)
  }

  const getResult = () => {
    axios
      .post(
        `http://localhost:3002/api/v1/quiz/user/answer/${currentQuiz.quiz_id}`,
        { questions_answers: listOfAnswerIds },
        { headers: { Authorization: `Bearer ${jwt}` } }
      )
      .then((response) => console.log("response : ", response))
      .catch((error) => console.log("error : ", error))
  }

  const currentQuestion = quizById?.questions?.[currentQuestionIndex]

  return (
    <div
      className={`h-screen bg-cover ${
        !isError
          ? `${
              isLightMode
                ? "md:bg-normal bg-mobile"
                : "md:bg-normal2 bg-mobile2"
            }`
          : "md:bg-error bg-error_mobile"
      }`}
    >
      <ParticlesComponent isError={isError} />
      <NavBar
        jwt={jwt}
        logout={logout}
        myProfile={myProfile}
        isLightMode={isLightMode}
        toggleLightMode={toggleLightMode}
      />
      <div className="flex justify-center mt-4 md:mt-8">
        {quizById ? (
          <Card className="bg-transparent mx-auto w-192 h-192" shadow={false}>
            <div className="flex justify-between mx-4 pt-2 md:my-4">
              <h1 className="text-white text-sm mb-16 text-center underline">
                {quizById.level_name}
              </h1>
              <h1 className="text-white text-sm mb-16 text-center italic">
                {quizById.title}
              </h1>
              <h1 className="text-xl text-white font-bold py-2 px-2 w-16">
                {currentQuestionIndex}/{quizById.questions.length}
              </h1>
            </div>
            {currentQuestion ? (
              <div className="rounded-xl mx-4 px-4">
                <h1 className="text-white text-xl md:text-3xl font-bold text-center h-40 md:h-48">
                  {currentQuestion.title}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentQuestion.answers.map((answer) => (
                    <Button
                      key={answer.id}
                      onClick={() => handleAnswerSubmit(answer)}
                      className="mb-2 mx-auto bg-purplePrimary hover:scale-105 w-72"
                      fullWidth
                    >
                      {answer.answer}
                    </Button>
                  ))}
                </div>
                {feedback && (
                  <PopupGame
                    msg={feedback}
                    color={
                      feedback === "CORRECT" ? "bg-green-500" : "bg-red-500"
                    }
                  />
                )}
              </div>
            ) : (
              <h1 className="text-white text-lg">
                Quiz terminé ! Merci pour votre participation. {getResult()}
              </h1>
            )}
          </Card>
        ) : (
          <DefaultDisplay />
        )}
      </div>
    </div>
  )
}

export default Quiz
