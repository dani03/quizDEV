import React, { useEffect, useState } from "react"
import { Card } from "@material-tailwind/react"
import DataTable from "react-data-table-component"

const columns = [
  {
    name: "Question",
    selector: (row) => row.title,
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

const QuestionTable = (props) => {
  const { questions } = props

  return (
    <Card className="shadow-xl">
      <DataTable columns={columns} data={questions.data} />
    </Card>
  )
}

export default QuestionTable
