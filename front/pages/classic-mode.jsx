import { useCallback, useContext, useState } from "react"
import NavBar from "../src/components/NavBar"
import { AppContext } from "../src/components/AppContext"
import UseApi from "../src/components/UseApi"
import Button from "../src/components/Button"
import PopupGame from "../src/components/PopupGame"
import { makeClient } from "../src/services/makeClient"
import { motion } from "framer-motion"

const Classic = () => {
  const questions = UseApi([{}], "get", "/classic")
  const { jwt, logout, user, userId } = useContext(AppContext)
  const [isFinish, setIsFinish] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isWrong, setIsWrong] = useState(false)
  const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay))
  }
  const winPoints = async () => {
    setIsCorrect(true)
    await timeout(1000)
    setIsCorrect(false)
  }
  const loosePoints = async () => {
    setIsWrong(true)
    await timeout(1000)
    setIsWrong(false)
  }
  const addpoints = useCallback(async (id, jwt, points) => {
    try {
      const { data } = await makeClient({
        headers: { authentification: jwt },
      }).post(`/user/points/${id}`, {
        score: points,
      })
    } catch (err) {
      const { response: { data } = {} } = err
      if (data.error) {
        return
      }
      setError("Oops, something went wrong.")
    }
  }, [])
  const checkAnswer = async (answerIndex) => {
    if (answerIndex === questions[currentQuestion].good_answer) {
      setScore(score + questions[currentQuestion].points)

      if (questions[currentQuestion + 1]) {
        winPoints()
        setCurrentQuestion(currentQuestion + 1)
      } else {
        winPoints()
        addpoints(userId, jwt, score)
        await timeout(1000)
        setIsFinish(true)
      }
    } else {
      if (questions[currentQuestion + 1]) {
        loosePoints()
        setCurrentQuestion(currentQuestion + 1)
      } else {
        loosePoints()
        addpoints(userId, jwt, score)
        await timeout(1000)
        setIsFinish(true)
      }
    }
  }

  return (
    <div className="h-screen z-1">
      <NavBar
        jwt={jwt}
        logout={logout}
        pseudo={user ? JSON.parse(user).pseudo : null}
      />
      {(isCorrect && <PopupGame msg="CORRECT" color="bg-green-500" />) ||
        (isWrong && <PopupGame msg="WRONG" color="bg-red-500" />)}
      {isFinish ? (
        <h1>Fini votre score : {score}</h1>
      ) : (
        <>
          <div className="flex justify-between mt-10 ml-5">
            <div>
              <motion.div
                key={currentQuestion}
                initial="initial"
                animate="visible"
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                }}
                variants={counterQuestion}
              >
                <h1 className="font-montserrat text-xl">
                  {currentQuestion} <span className="text-yellow-400">|</span>{" "}
                  {questions.length}
                </h1>
              </motion.div>
            </div>
            <motion.div
              key={score}
              initial="normal"
              animate="change"
              variants={scoreVariant}
            >
              <div>
                <span className="font-montserrat text-neutral-800 mr-5 p-5 text-2xl font-bold text-yellow-400 md:text-5xl md:text-neutral-800">
                  {score}
                </span>
              </div>
            </motion.div>
          </div>
          <div className="grid justify-items-center max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-4xl lg:px-8">
            <motion.div
              key={currentQuestion}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.5,
                delay: 0.5,
              }}
              variants={interrogationVariant}
            >
              <h1 className="font-montserrat text-center text-xl underline font-bold mb-5">
                {questions[currentQuestion].interrogation}
              </h1>
            </motion.div>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={listAnswers}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4 sm:gap-x-10"
            >
              <motion.li
                whileHover={answerVariant.whileHover}
                whileTap={answerVariant.whileTap}
                transition={answerVariant.transition}
                variants={answerVariant}
              >
                <Button
                  color="normal"
                  onClick={() => checkAnswer(1)}
                  variant="classicAnswer"
                  size="lg"
                >
                  A.&nbsp;&nbsp;{questions[currentQuestion].first_answer}
                </Button>
              </motion.li>
              <motion.li
                whileHover={answerVariant.whileHover}
                whileTap={answerVariant.whileTap}
                transition={answerVariant.transition}
                variants={answerVariant}
              >
                <Button
                  color="normal"
                  onClick={() => checkAnswer(2)}
                  variant="classicAnswer"
                  size="lg"
                >
                  B.&nbsp;&nbsp;{questions[currentQuestion].second_answer}
                </Button>
              </motion.li>
              <motion.li
                whileHover={answerVariant.whileHover}
                whileTap={answerVariant.whileTap}
                transition={answerVariant.transition}
                variants={answerVariant}
              >
                <Button
                  color="normal"
                  onClick={() => checkAnswer(3)}
                  variant="classicAnswer"
                  size="lg"
                >
                  C.&nbsp;&nbsp;{questions[currentQuestion].third_answer}
                </Button>
              </motion.li>
              <motion.li
                whileHover={answerVariant.whileHover}
                whileTap={answerVariant.whileTap}
                transition={answerVariant.transition}
                variants={answerVariant}
              >
                <Button
                  color="normal"
                  onClick={() => checkAnswer(4)}
                  variant="classicAnswer"
                  size="lg"
                >
                  D.&nbsp;&nbsp;{questions[currentQuestion].fourth_answer}
                </Button>
              </motion.li>
            </motion.ul>
          </div>
        </>
      )}
    </div>
  )
}

export const scoreVariant = {
  normal: {
    opacity: 1,
    scale: 0.5,
  },
  change: {
    opacity: 1,
    borderRadius: 50,
    scale: 1,
  },
  scale: {
    type: "spring",
    damping: 5,
    stiffness: 100,
    restDelta: 0.001,
  },
}
export const counterQuestion = {
  initial: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}
export const interrogationVariant = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
  scale: {
    type: "spring",
    damping: 2,
    stiffness: 100,
    restDelta: 0.001,
  },
}
export const answerVariant = {
  whileHover: {
    scale: 1.2,
    color: "#fcba03",
  },
  whileTap: { scale: 0.8 },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 10,
  },
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}
export const listAnswers = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
  hidden: { opacity: 0 },
}

export default Classic
