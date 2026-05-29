import { useEffect, useState } from "react"

import type { MonthTable, Task } from "../../types/models"

import { buildWeeks } from "../../lib/weeks"

import { useDebouncedCallback } from "../../hooks/useDebouncedCallback"

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
  const [localMonth, setLocalMonth] =
    useState<MonthTable | null>(month)

  useEffect(() => {
    setLocalMonth(month)
  }, [month])

  const debouncedSave =
    useDebouncedCallback(
      async (
        updatedMonth: MonthTable
      ) => {
        await onUpdateMonth(
          updatedMonth
        )
      },
      300
    )

  if (!localMonth) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Select or create a month
        </p>
      </div>
    )
  }

  const daysInMonth = new Date(
    localMonth.year,
    localMonth.month + 1,
    0
  ).getDate()

  const weeks =
    buildWeeks(daysInMonth)

  const updateMonth = (
    updatedMonth: MonthTable
  ) => {
    setLocalMonth(updatedMonth)

    debouncedSave(updatedMonth)
  }

  const updateTask = (
    taskId: string,
    updater: (task: Task) => void
  ) => {
    const updatedTasks =
      localMonth.tasks.map((task) => {
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
      })

    updateMonth({
      ...localMonth,
      tasks: updatedTasks
    })
  }

  const deleteTask = (
    taskId: string
  ) => {
    updateMonth({
      ...localMonth,
      tasks: localMonth.tasks.filter(
        (task) => task.id !== taskId
      )
    })
  }

  const toggleWeek = (
    weekIndex: number
  ) => {
    const collapsedWeeks = [
      ...localMonth.collapsedWeeks
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

    updateMonth({
      ...localMonth,
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

  const getDayTotal = (
    day: number
  ) => {
    return localMonth.tasks.reduce(
      (acc, task) =>
        acc +
        (task.days[day] || 0),
      0
    )
  }

  const grandTotal =
    localMonth.tasks.reduce(
      (acc, task) =>
        acc +
        Object.values(
          task.days
        ).reduce(
          (a, b) => a + b,
          0
        ),
      0
    )

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "ArrowRight" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault()

      const inputs =
        Array.from(
          document.querySelectorAll(
            "input"
          )
        )

      const index =
        inputs.indexOf(
          e.target as HTMLInputElement
        )

      if (
        e.key === "ArrowRight"
      ) {
        inputs[index + 1]?.focus()
      }

      if (
        e.key === "ArrowLeft"
      ) {
        inputs[index - 1]?.focus()
      }

      if (
        e.key === "ArrowDown"
      ) {
        inputs[index + 10]?.focus()
      }

      if (
        e.key === "ArrowUp"
      ) {
        inputs[index - 10]?.focus()
      }
    }
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
                      localMonth.collapsedWeeks.includes(
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
                      localMonth.collapsedWeeks.includes(
                        week.index
                      )

                    if (collapsed) {
                      return (
                        <th
                          key={
                            week.index
                          }
                          className="border-b border-r p-2 bg-blue-50"
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
                {localMonth.tasks.map(
                  (task) => {
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
                            value={
                              task.name
                            }
                            onChange={(
                              e
                            ) =>
                              updateTask(
                                task.id,
                                (
                                  t
                                ) => {
                                  t.name =
                                    e
                                      .target
                                      .value
                                }
                              )
                            }
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          />
                        </td>

                        <td className="sticky left-[240px] bg-white border-b border-r p-2">
                          <input
                            type="number"
                            value={
                              task.planHours
                            }
                            onChange={(
                              e
                            ) =>
                              updateTask(
                                task.id,
                                (
                                  t
                                ) => {
                                  t.planHours =
                                    Number(
                                      e
                                        .target
                                        .value
                                    ) ||
                                    0
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

                        {weeks.map(
                          (week) => {
                            const collapsed =
                              localMonth.collapsedWeeks.includes(
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
                                  className="border-b border-r p-2 bg-blue-50 text-center font-semibold"
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
                                        onKeyDown={
                                          handleKeyDown
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
                                        className="w-[60px] border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-300"
                                      />
                                    </td>
                                  )
                                )}

                                <td className="border-b border-r p-2 bg-blue-50 text-center font-semibold">
                                  {
                                    weekTotal
                                  }
                                </td>
                              </>
                            )
                          }
                        )}

                        <td className="border-b p-2">
                          <textarea
                            value={
                              task.note
                            }
                            onChange={(
                              e
                            ) =>
                              updateTask(
                                task.id,
                                (
                                  t
                                ) => {
                                  t.note =
                                    e
                                      .target
                                      .value
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
                  }
                )}

                <tr className="sticky bottom-0 bg-gray-100 font-semibold">
                  <td className="sticky left-0 bg-gray-100 border-t border-r p-3">
                    TOTAL
                  </td>

                  <td className="sticky left-[240px] bg-gray-100 border-t border-r" />

                  <td className="sticky left-[340px] bg-gray-100 border-t border-r p-3">
                    {grandTotal}
                  </td>

                  {weeks.map((week) => {
                    const collapsed =
                      localMonth.collapsedWeeks.includes(
                        week.index
                      )

                    const weekTotal =
                      week.days.reduce(
                        (
                          acc,
                          day
                        ) =>
                          acc +
                          getDayTotal(
                            day
                          ),
                        0
                      )

                    if (collapsed) {
                      return (
                        <td
                          key={
                            week.index
                          }
                          className="border-t border-r p-3 text-center bg-blue-50"
                        >
                          {weekTotal}
                        </td>
                      )
                    }

                    return (
                      <>
                        {week.days.map(
                          (day) => (
                            <td
                              key={
                                day
                              }
                              className="border-t border-r p-3 text-center"
                            >
                              {getDayTotal(
                                day
                              )}
                            </td>
                          )
                        )}

                        <td className="border-t border-r p-3 text-center bg-blue-50">
                          {weekTotal}
                        </td>
                      </>
                    )
                  })}

                  <td className="border-t" />

                  <td className="border-t" />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}