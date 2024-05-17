import { useContext, useState } from "react"
import NavBar from "../src/components/NavBar"
import { AppContext } from "../src/components/AppContext"
import { Card } from "@material-tailwind/react"
import ParticlesComponent from "../src/components/ParticlesComponent"
import CreateQuestionClassic from "../src/components/tabs/CreateQuestionClassic"
import CreateQuestionWithAI from "../src/components/tabs/createQuestionWithAI"
import QuestionTable from "../src/components/tabs/QuestionsTable"

const CreateQuestion = () => {
<<<<<<< HEAD
  const {
    jwt,
    logout,
    user,
    isError,
    role,
    levels,
    domains,
    questions,
    changeIsError,
  } = useContext(AppContext)
=======
  const { jwt, logout, user, isError, role, levels, domains, questions } =
    useContext(AppContext)
>>>>>>> develop
  const [openTab, setOpenTab] = useState(1)

  const handleTabChange = (tab) => {
    setOpenTab(tab)
  }
  const tabContents = [
    {
      id: 1,
      name: "Create Question",
      content: (
<<<<<<< HEAD
        <CreateQuestionClassic
          jwt={jwt}
          levels={levels}
          domains={domains}
          changeIsError={changeIsError}
        />
=======
        <CreateQuestionClassic jwt={jwt} levels={levels} domains={domains} />
>>>>>>> develop
      ),
    },
    {
      id: 2,
      name: "Create AI",
      content: <CreateQuestionWithAI />,
    },
    {
      id: 3,
      name: "View all Questions",
      content: <QuestionTable questions={questions} />,
    },
  ]

  return (
<<<<<<< HEAD
    <div
      className={`h-screen bg-cover ${
        !isError ? "md:bg-normal bg-mobile" : "md:bg-error bg-error_mobile"
      }`}
    >
=======
    <div className="h-screen md:bg-normal bg-mobile bg-cover">
>>>>>>> develop
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} pseudo={user || ""} role={role} />
      <div className="flex justify-center mt-4">
        <Card className="bg-transparent mx-auto" shadow={false}>
          <div className="flex justify-center mb-4 w-80 md:w-192 p-2 bg-transparent rounded-lg mx-auto">
            {tabContents.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`text-white font-bold flex-1 py-2 px-4 mx-2 md:mx-4 rounded-md text-sm md:text-lg focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                  openTab === tab.id ? "bg-deepBrownPrimary text-white" : ""
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          {tabContents.map((tab) => (
            <div
              key={tab.id}
              className={`mx-auto w-80 md:w-128 transition-all duration-300 ${
                openTab === tab.id ? "block" : "hidden"
              }`}
            >
              {tab.content}
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}

export default CreateQuestion
