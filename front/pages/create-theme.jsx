import { useContext, useState } from "react"
import { AppContext } from "../src/components/AppContext"
import NavBar from "../src/components/NavBar"
import ParticlesComponent from "../src/components/ParticlesComponent"
import { Card } from "@material-tailwind/react"
import CreateTheme from "../src/components/tabs/CreateTheme"
import ThemeTable from "../src/components/tabs/ThemeTable"

const CreateThemePage = () => {
  const { jwt, logout, user, isError, role, domains } = useContext(AppContext)
  const [openTab, setOpenTab] = useState(1)

  const tabContents = [
    {
      id: 1,
      name: "Create Theme",
      content: <CreateTheme jwt={jwt} />,
    },
    {
      id: 2,
      name: "View all Themes",
      content: <ThemeTable domains={domains} />,
    },
  ]

  const handleTabChange = (tab) => {
    setOpenTab(tab)
  }

  return (
    <div
      className={`h-screen bg-cover ${
        !isError ? "md:bg-normal bg-mobile" : "md:bg-error bg-error_mobile"
      }`}
    >
      <ParticlesComponent isError={isError} />
      <NavBar jwt={jwt} logout={logout} pseudo={user || ""} role={role || 2} />
      <div className="flex justify-center mt-8 md:mt-16">
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
        </Card>
      </div>
    </div>
  )
}

export default CreateThemePage
