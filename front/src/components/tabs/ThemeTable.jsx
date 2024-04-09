<<<<<<< HEAD
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
=======
import { Card, Typography } from "@material-tailwind/react"

const TABLE_HEAD = ["Label"]

const TABLE_ROWS = [
  { label: "IT" },
  { label: "Math" },
  { label: "Cinema" },
  { label: "Music" },
]

const ThemeTable = () => {
  return (
    <Card className="overflow-scroll w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none font-bold"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ label }, index) => {
            const isLast = index === TABLE_ROWS.length - 1
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50"

            return (
              <tr key={label}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {label}
                  </Typography>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
>>>>>>> origin
    </Card>
  )
}

export default ThemeTable
