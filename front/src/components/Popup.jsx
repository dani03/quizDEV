import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react"

const Popup = (props) => {
  const { msg, open, handleOpen } = props

  return (
    <>
      <Dialog open={open} handler={handleOpen} className="bg-red-500 h-40">
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
      </Dialog>
    </>
  )
}

export default Popup
