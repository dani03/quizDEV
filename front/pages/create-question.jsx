import { useContext } from "react"
import NavBar from "../src/components/NavBar"
import { AppContext } from "../src/components/AppContext"
import {
  Card,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react"
import ParticlesComponent from "../src/components/ParticlesComponent"
import CreateQuestionClassic from "../src/components/tabs/CreateQuestionClassic"
import CreateQuestionWithAI from "../src/components/tabs/createQuestionWithAI"
import QuestionTable from "../src/components/tabs/QuestionsTable"

const CreateQuestion = () => {
  const { jwt, logout, user, isError } = useContext(AppContext)
  const data = [
    {
      index: 1,
      label: "Create Question",
      value: <CreateQuestionClassic />,
    },
    {
      index: 2,
      label: "Create Question with AI",
      value: <CreateQuestionWithAI />,
    },
    {
      index: 3,
      label: "View all Questions",
      value: <QuestionTable />,
    },
  ]

  return (
    <div className="h-screen">
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} pseudo={user || ""} />
      <div className="flex justify-center mt-10">
        <Card className="bg-transparent" shadow={false}>
          <Tabs value={data[0].label}>
            <TabsHeader
              className="bg-transparent"
              indicatorProps={{
                className: "bg-gray-900/10 shadow-none !text-gray-900",
              }}
            >
              {data.map(({ index, label, value }) => (
                <Tab key={index} value={value} className="text-white font-bold">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="w-screen">
              {data.map(({ index, label, value }) => (
                <TabPanel
                  key={index}
                  value={value}
                  className="flex justify-center py-8"
                >
                  {value}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

export default CreateQuestion
