import type { MonthTable } from "../../types/models"

interface Props {
  month: MonthTable | null
}

export const MonthTableView = ({
  month
}: Props) => {
  if (!month) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">
          No month selected
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">
                Task
              </th>

              <th className="border p-3 text-left">
                Plan
              </th>

              <th className="border p-3 text-left">
                Fact
              </th>

              {Array.from({
                length: new Date(
                  month.year,
                  month.month + 1,
                  0
                ).getDate()
              }).map((_, index) => (
                <th
                  key={index}
                  className="border p-3 min-w-[60px]"
                >
                  {index + 1}
                </th>
              ))}

              <th className="border p-3 text-left">
                Note
              </th>
            </tr>
          </thead>

          <tbody>
            {month.tasks.map((task) => {
              const fact = Object.values(
                task.days
              ).reduce(
                (acc, value) => acc + value,
                0
              )

              return (
                <tr key={task.id}>
                  <td className="border p-2">
                    {task.name}
                  </td>

                  <td className="border p-2">
                    {task.planHours}
                  </td>

                  <td className="border p-2">
                    {fact}
                  </td>

                  {Array.from({
                    length: new Date(
                      month.year,
                      month.month + 1,
                      0
                    ).getDate()
                  }).map((_, index) => (
                    <td
                      key={index}
                      className="border p-2"
                    >
                      {task.days[index + 1] || ""}
                    </td>
                  ))}

                  <td className="border p-2">
                    {task.note}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}