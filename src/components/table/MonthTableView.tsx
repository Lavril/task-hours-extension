import type { MonthTable, Task } from "../../types/models"

import { buildWeeks } from "../../lib/weeks"

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

  const weeks =
    buildWeeks(daysInMonth)

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

  const toggleWeek = async (
    weekIndex: number
  ) => {
    const collapsedWeeks = [
      ...month.collapsedWeeks
    ]

    const exists =
      collapsedWeeks.includes(
        weekIndex
      )

    const updated = exists
      ? collapsedWeeks.filter(
          (w) => w !== weekIndex
        )
      : [...collapsedWeeks, weekIndex]

    await onUpdateMonth({
      ...month,
      collapsedWeeks: updated
    })
  }

  const getFactColor = (
    fact: number,
    plan: number
  ) => {
    if (fact === 0) {
      return "bg-gray-50"
    }

    if (fact < plan) {
      return "bg-yellow-100"
    }

    if (fact === plan) {
      return "bg-green-100"
    }

    return "bg-blue-100"
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <div className="min-w-max p-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-auto max-h-[calc(100vh-120px)]">
            <table className="border-collapse">
              <thead className="sticky top-0 z-30">
                <tr className="bg-gray-100">
                  <th className="sticky left-0 z-50 bg-gray-100 border-b border-r p-3 min-w-[240px] text-left">
                    Task
                  </th>

                  <th className="sticky left-[240px] z-50 bg-gray-100 border-b border-r p-3 min-w-[100px]">
                    Plan
                  </th>

                  <th className="sticky left-[340px] z-50 bg-gray-100 border-b border-r p-3 min-w-[100px]">
                    Fact
                  </th>

                  {weeks.map((week) => {
                    const collapsed =
                      month.collapsedWeeks.includes(
                        week.index
                      )

                    return (
                      <th
                        key={week.index}
                        colSpan={
                          collapsed
                            ? 1
                            : week.days.length +
                              1
                        }
                        className="border-b border-r p-2 bg-blue-50"
                      >
                        <button
                          onClick={() =>
                            toggleWeek(
                              week.index
                            )
                          }
                          className="font-semibold hover:text-blue-600"
                        >
                          {collapsed
                            ? "▶"
                            : "▼"}{" "}
                          Week{" "}
                          {week.index + 1}
                        </button>
                      </th>
                    )
                  })}

                  <th className="border-b p-3 min-w-[240px]">
                    Note
                  </th>

                  <th className="border-b p-3 min-w-[100px]">
                    Actions
                  </th>
                </tr>

                <tr className="bg-gray-50">
                  <th className="sticky left-0 z-40 bg-gray-50 border-b border-r p-2" />

                  <th className="sticky left-[240px] z-40 bg-gray-50 border-b border-r p-2" />

                  <th className="sticky left-[340px] z-40 bg-gray-50 border-b border-r p-2" />

                  {weeks.map((week) => {
                    const collapsed =
                      month.collapsedWeeks.includes(
                        week.index
                      )

                    if (collapsed) {
                      return (
                        <th
                          key={
                            week.index
                          }
                          className="border-b border-r p-2"
                        >
                          Total
                        </th>
                      )
                    }

                    return (
                      <>
                        {week.days.map(
                          (day) => (
                            <th
                              key={
                                day
                              }
                              className="border-b border-r p-2 min-w-[70px]"
                            >
                              {day}
                            </th>
                          )
                        )}

                        <th className="border-b border-r p-2 bg-blue-50 min-w-[80px]">
                          Total
                        </th>
                      </>
                    )
                  })}

                  <th className="border-b" />

                  <th className="border-b" />
                </tr>
              </thead>

              <tbody>
                {month.tasks.map((task) => {
                  const fact =
                    Object.values(
                      task.days
                    ).reduce(
                      (
                        acc,
                        value
                      ) =>
                        acc +
                        value,
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

                      <td
                        className={`sticky left-[340px] border-b border-r p-2 font-semibold ${getFactColor(
                          fact,
                          task.planHours
                        )}`}
                      >
                        {fact}
                      </td>

                      {weeks.map((week) => {
                        const collapsed =
                          month.collapsedWeeks.includes(
                            week.index
                          )

                        const weekTotal =
                          week.days.reduce(
                            (
                              acc,
                              day
                            ) =>
                              acc +
                              (task
                                .days[
                                day
                              ] ||
                                0),
                            0
                          )

                        if (
                          collapsed
                        ) {
                          return (
                            <td
                              key={
                                week.index
                              }
                              className="border-b border-r p-2 bg-blue-50 font-semibold text-center"
                            >
                              {
                                weekTotal
                              }
                            </td>
                          )
                        }

                        return (
                          <>
                            {week.days.map(
                              (
                                day
                              ) => (
                                <td
                                  key={
                                    day
                                  }
                                  className="border-b border-r p-1"
                                >
                                  <input
                                    type="number"
                                    value={
                                      task
                                        .days[
                                        day
                                      ] ||
                                      ""
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      updateTask(
                                        task.id,
                                        (
                                          t
                                        ) => {
                                          const raw =
                                            e
                                              .target
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
                            )}

                            <td className="border-b border-r p-2 bg-blue-50 font-semibold text-center">
                              {
                                weekTotal
                              }
                            </td>
                          </>
                        )
                      })}

                      <td className="border-b p-2">
                        <textarea
                          value={
                            task.note
                          }
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}