import { motion } from "framer-motion"
import { Button, Card } from "@material-tailwind/react"
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid"

const InfoJobinquiz = (props) => {
  const { openInfo } = props

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: openInfo ? 1 : 0, y: openInfo ? 0 : 50 }}
      transition={{ duration: 0.6 }}
      className={`mt-8 mx-auto w-full ${openInfo ? "block" : "hidden"}`}
    >
      <Card className="bg-transparent m-2">
        <div className="ml-4 md:ml-32 w-72">
          <h1 className="text-zinc-100 text-3xl md:text-35xl w-96 py-4 text-pretty">
            With naturally fluid animations you will elevate your UI &
            interactions. Bringing your apps to life has never been simpler.
          </h1>
          <Button className="flex items-center justify-center bg-transparent border border-2 w-72">
            Go to register
            <span>
              <ArrowRightEndOnRectangleIcon className="h-10 w-10 mx-4" />
            </span>
          </Button>
        </div>
        <div className="ml-4 md:ml-32">
          <h1 className="text-zinc-100 text-4xl font-bold mt-48">
            Why Springs?{" "}
          </h1>
          <h1 className="text-zinc-100 text-3xl md:text-35xl md:w-192 py-4 text-pretty">
            We think of animation in terms of time and curves, but that causes
            most of the struggle we face when trying to make elements on the
            screen move naturally, because nothing in the real world moves like
            that. Springs don’t have a defined curve or a set duration.
          </h1>
          <Button className="flex items-center justify-center bg-transparent border border-2 w-72">
            Try now
            <span className="mx-4 font-bold ">$</span>
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default InfoJobinquiz
