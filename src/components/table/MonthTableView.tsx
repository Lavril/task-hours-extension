import type{ MonthTable, Task } from "../../types/models"

interface Props {
  month: MonthTable | null

  onUpdateMonth: (
    updatedMonth: MonthTable
  ) => Promise<void>
}

export const MonthTableView = ({
  month,
  onUpdateMonth
}: Props) => {
  if (!month) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Select or create a month
        </p>
      </div>
    )
  }

  const daysInMonth = new Date(
    month.year,
    month.month + 1,
    0
  ).getDate()

  const updateTask = async (
    taskId: string,
    updater: (task: Task) => void
  ) => {
    const updatedTasks = month.tasks.map(
      (task) => {
        if (task.id !== taskId) {
          return task
        }

        const updatedTask = {
          ...task,
          days: {
            ...task.days
          }
        }

        updater(updatedTask)

        return updatedTask
      }
    )

    await onUpdateMonth({
      ...month,
      tasks: updatedTasks
    })
  }

  const deleteTask = async (
    taskId: string
  ) => {
    await onUpdateMonth({
      ...month,
      tasks: month.tasks.filter(
        (task) => task.id !== taskId
      )
    })
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <div className="min-w-max p-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-auto max-h-[calc(100vh-120px)]">
            <table className="border-collapse">
              <thead className="sticky top-0 z-30">
                <tr className="bg-gray-100">
                  <th className="sticky left-0 z-40 bg-gray-100 border-b border-r p-3 min-w-[240px] text-left">
                    Task
                  </th>

                  <th className="sticky left-[240px] z-40 bg-gray-100 border-b border-r p-3 min-w-[100px] text-left">
                    Plan
                  </th>

                  <th className="sticky left-[340px] z-40 bg-gray-100 border-b border-r p-3 min-w-[100px] text-left">
                    Fact
                  </th>

                  {Array.from({
                    length: daysInMonth
                  }).map((_, index) => (
                    <th
                      key={index}
                      className="border-b border-r p-3 min-w-[70px] text-center"
                    >
                      {index + 1}
                    </th>
                  ))}

                  <th className="border-b p-3 min-w-[240px] text-left">
                    Note
                  </th>

                  <th className="border-b p-3 min-w-[100px]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {month.tasks.map((task) => {
                  const fact = Object.values(
                    task.days
                  ).reduce(
                    (acc, value) =>
                      acc + value,
                    0
                  )

                  return (
                    <tr
                      key={task.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="sticky left-0 bg-white border-b border-r p-2">
                        <input
                          value={task.name}
                          onChange={(e) =>
                            updateTask(
                              task.id,
                              (t) => {
                                t.name =
                                  e.target.value
                              }
                            )
                          }
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </td>

                      <td className="sticky left-[240px] bg-white border-b border-r p-2">
                        <input
                          type="number"
                          value={
                            task.planHours
                          }
                          onChange={(e) =>
                            updateTask(
                              task.id,
                              (t) => {
                                t.planHours =
                                  Number(
                                    e.target
                                      .value
                                  ) || 0
                              }
                            )
                          }
                          className="w-full border rounded-lg px-3 py-2"
                        />
                      </td>

                      <td className="sticky left-[340px] bg-gray-50 border-b border-r p-2 font-semibold">
                        {fact}
                      </td>

                      {Array.from({
                        length: daysInMonth
                      }).map((_, index) => {
                        const day =
                          index + 1

                        return (
                          <td
                            key={day}
                            className="border-b border-r p-1"
                          >
                            <input
                              type="number"
                              value={
                                task.days[
                                  day
                                ] || ""
                              }
                              onChange={(
                                e
                              ) =>
                                updateTask(
                                  task.id,
                                  (t) => {
                                    const raw =
                                      e.target
                                        .value

                                    if (
                                      raw ===
                                      ""
                                    ) {
                                      delete t
                                        .days[
                                        day
                                      ]

                                      return
                                    }

                                    t.days[
                                      day
                                    ] =
                                      Number(
                                        raw
                                      )
                                  }
                                )
                              }
                              className="w-[60px] border rounded-lg px-2 py-1 text-center"
                            />
                          </td>
                        )
                      })}

                      <td className="border-b p-2">
                        <textarea
                          value={task.note}
                          onChange={(e) =>
                            updateTask(
                              task.id,
                              (t) => {
                                t.note =
                                  e.target.value
                              }
                            )
                          }
                          className="w-full border rounded-lg px-3 py-2 min-h-[40px]"
                        />
                      </td>

                      <td className="border-b p-2">
                        <button
                          onClick={() =>
                            deleteTask(
                              task.id
                            )
                          }
                          className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}

                {month.tasks.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={
                        daysInMonth + 6
                      }
                      className="text-center py-12 text-gray-400"
                    >
                      No tasks yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}