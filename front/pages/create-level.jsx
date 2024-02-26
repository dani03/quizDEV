import { useContext, useEffect, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import ParticlesComponent from "../src/components/ParticlesComponent"
import {
  Card,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react"
import CreateLevel from "../src/components/tabs/CreateLevel"
import LevelTable from "../src/components/tabs/LevelTable"
import axios from "axios"

const Login = () => {
  const { jwt, logout, user, isError } = useContext(AppContext)
  const [levels, setLevels] = useState([])

  useEffect(() => {
    const fetchLevels = async () => {
      if (!jwt) return
      try {
        const response = await axios.get(
          "http://localhost:3002/api/v1/levels",
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        setLevels(response.data)
      } catch (error) {
        console.error("Error fetching levels:", error)
        setLevels([])
      }
    }

    fetchLevels()
  }, [jwt])

  const data = [
    {
      index: 1,
      label: "Create Level",
      value: <CreateLevel jwt={jwt} />,
    },
    {
      index: 1,
      label: "View all Levels",
      value: <LevelTable levels={levels} />,
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
        </Card>
      </div>
    </div>
  )
}

export default Login
