<<<<<<< HEAD
import { useContext, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import ParticlesComponent from "../src/components/ParticlesComponent"
import { Card } from "@material-tailwind/react"
import CreateLevel from "../src/components/tabs/CreateLevel"
import LevelTable from "../src/components/tabs/LevelTable"

const CreateLevelPage = () => {
  const { jwt, logout, user, isError, role, levels } = useContext(AppContext)
  const [openTab, setOpenTab] = useState(1)

  const tabContents = [
    {
      id: 1,
      name: "Create Level",
      content: <CreateLevel jwt={jwt} />,
    },
    {
      id: 2,
      name: "View all levels",
      content: <LevelTable levels={levels} />,
    },
  ]

  const handleTabChange = (tab) => {
    setOpenTab(tab)
  }

  return (
    <div className="h-screen md:bg-normal bg-mobile bg-cover">
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} pseudo={user || ""} role={role || 2} />
      <div className="flex justify-center mt-16 md:mt-32">
        <Card className="bg-transparent mx-auto" shadow={false}>
          <div className="flex justify-center mb-4 w-80 md:w-192 p-2 bg-transparent rounded-lg mx-auto">
            {tabContents.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`text-white flex-1 py-2 px-4 mx-2 md:mx-4 rounded-md text-sm md:text-lg focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
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
=======
import { useContext } from "react"
import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import ParticlesComponent from "../src/components/ParticlesComponent"
import CreateTheme from "../src/components/tabs/CreateTheme"
import {
  Card,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react"
import ThemeTable from "../src/components/tabs/ThemeTable"

const Login = () => {
  const { jwt, logout, user, isError } = useContext(AppContext)
  const data = [
    {
      index: 1,
      label: "Create Theme",
      value: <CreateTheme />,
    },
    {
      index: 1,
      label: "View all Themes",
      value: <ThemeTable />,
    },
  ]

  return (
    <div className="h-screen">
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} pseudo={user ? user : ""} />
      <div className="flex justify-center mt-20">
        <Card className="bg-transparent mx-auto" shadow={false}>
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
>>>>>>> origin
        </Card>
      </div>
    </div>
  )
}

<<<<<<< HEAD
export default CreateLevelPage
=======
export default Login
>>>>>>> origin
