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
        </Card>
      </div>
    </div>
  )
}

export default Login
