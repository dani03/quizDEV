import React, { useEffect, useState } from "react"
import {
  Card,
  List,
  ListItem,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react"

const LevelTable = (props) => {
  const { levels } = props
  const [updatedLevels, setUpdatedLevels] = useState([])

  useEffect(() => {
    setUpdatedLevels(levels)
  }, [levels])

  return (
    <Card className="w-full">
      <List>
        {Array.isArray(updatedLevels.data) && updatedLevels.data.length > 0 ? (
          updatedLevels.data.map((item, index) => (
            <ListItem
              ripple={false}
              className={`py-1  pr-1 pl-4 flex justify-between ${
                index % 2 === 1 ? "bg-gray-200" : ""
              }`}
            >
              <div>
                <span className="mx-4">{item.id}</span>
                <span className="mx-4">{item.name}</span>
                <span className="mx-4">{item.points}</span>
                <span className="mx-4">{item.slug}</span>
              </div>
              <ListItemSuffix>test</ListItemSuffix>
            </ListItem>
          ))
        ) : (
          <li>
            <Typography>No levels available</Typography>
          </li>
        )}
      </List>
    </Card>
  )
}

export default LevelTable
