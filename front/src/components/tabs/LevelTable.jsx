import React, { useEffect, useState } from "react"
import { Card } from "@material-tailwind/react"
import DataTable from "react-data-table-component"

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Points",
    selector: (row) => row.points,
    sortable: true,
  },
  {
    name: "Created at",
    selector: (row) => row.created_at,
    sortable: true,
  },
]

const LevelTable = (props) => {
  const { levels } = props
  const [updatedLevels, setUpdatedLevels] = useState([])

  useEffect(() => {
    setUpdatedLevels(levels)
  }, [levels])

  return (
    <Card className="shadow-xl">
      <DataTable columns={columns} data={updatedLevels.data} />
    </Card>
  )
}

export default LevelTable
