import { Button, DialogHeader, DialogFooter } from "@material-tailwind/react"
import { motion } from "framer-motion"

const Popup = (props) => {
  const { msg, open, handleOpen } = props

  return (
    <>
      {open ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 mb-32 h-screen backdrop-blur-sm">
          <motion.div
            className={"px-4 py-9 rounded-xl"}
            initial={popVariant.hidden}
            animate={popVariant.visible}
          >
            <div className="bg-red-500 h-48 w-96 mx-auto my-auto rounded-xl shadow-xl relative">
              <DialogHeader>{msg}</DialogHeader>
              <DialogFooter>
                <Button
                  variant="gradient"
                  color="green"
                  className="border border-2 border-black text-black"
                  onClick={handleOpen}
                >
                  <span>ok</span>
                </Button>
              </DialogFooter>
            </div>
          </motion.div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export const popVariant = {
  hidden: {
    opacity: 0,
    y: -100,
    x: -100,
  },
  visible: {
    opacity: 1,
    rotate: 360,
    y: 0,
    x: 0,
  },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 50,
  },
}

export default Popup
