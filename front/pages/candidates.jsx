import { Card, Typography } from "@material-tailwind/react"
import NavBar from "../src/components/NavBar"
import ParticlesComponent from "../src/components/ParticlesComponent"
import { useContext } from "react"
import { Circle } from "rc-progress"
import { AppContext } from "../src/components/AppContext"
import UseMediaQuery from "../src/components/UseMediaService"

const candidates = [
  {
    id_user: 1,
    user_name: "Nadir",
    points: 12,
  },
  {
    id_user: 2,
    user_name: "Quentin",
    points: 30,
  },
  {
    id_user: 3,
    user_name: "Faycal",
    points: 25,
  },
  {
    id_user: 4,
    user_name: "Daniel",
    points: 80,
  },
  {
    id_user: 5,
    user_name: "Jean",
    points: 30,
  },
  {
    id_user: 6,
    user_name: "Hamza",
    points: 33,
  },
  {
    id_user: 7,
    user_name: "Wahib",
    points: 95,
  },
]

const Candidates = () => {
  const { jwt, logout, isError, myProfile, isLightMode, toggleLightMode } =
    useContext(AppContext)
  const smallScreen = UseMediaQuery("(max-width: 768px)")

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
      <div className="flex justify-center md:mt-2 ">
        <Card className="bg-transparent mt-4 md:mt-12" shadow={false}>
          <Typography className="text-zinc-100 text-2xl font-bold text-center mb-2">
            SCORE
          </Typography>
          <div
            className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ${
              smallScreen ? " overflow-y-auto max-h-150" : ""
            }`}
          >
            {candidates.map((candidate, index) => (
              <div
                key={index}
                value={candidate.id_user}
                className="md:hover:scale-105"
              >
                <div className="text-xl text-zinc-100 border border-2 rounded-xl px-2 py-3 shadow-xl w-64">
                  <Typography className="text-zinc-100 font-bold text-center my-2">
                    {candidate.user_name}
                  </Typography>
                  <div className="flex flex-col md:flex-row w-full">
                    <Circle
                      percent={candidate.points}
                      strokeWidth={smallScreen ? 3 : 6}
                      strokeColor={{
                        "0%": "red",
                        "50%": "orange",
                        "100%": "green",
                      }}
                      className={`text-zinc-100 mx-auto ${
                        smallScreen ? "h-24" : "h-36"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Candidates
