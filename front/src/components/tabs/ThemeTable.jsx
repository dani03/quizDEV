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

const ThemeTable = (props) => {
  const { domains } = props

  return (
    <Card className="shadow-xl">
      <DataTable columns={columns} data={domains.data} />
    </Card>
  )
}

export default ThemeTable
