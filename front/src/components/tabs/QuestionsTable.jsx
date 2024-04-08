import { Card, Typography } from "@material-tailwind/react"

const TABLE_HEAD = [
  "Question",
  "Answer 1",
  "Answer 2",
  "Answer 3",
  "Answer 4",
  "Good answer",
]

const TABLE_ROWS = [
  {
    question: "Quelle est la capital de la France ? ",
    answer1: "Paris",
    answer2: "Madrid",
    answer3: "London",
    answer4: "Oran",
    goodAnswer: 1,
  },
]

const QuestionTable = () => {
  return (
    <Card className=" overflow-scroll">
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
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(
            (
              { question, answer1, answer2, answer3, answer4, goodAnswer },
              index
            ) => {
              const isLast = index === TABLE_ROWS.length - 1
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50"

              return (
                <tr key={question}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {question}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {answer1}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {answer2}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {answer3}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {answer4}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {goodAnswer}
                    </Typography>
                  </td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
    </Card>
  )
}

export default QuestionTable
