import { useEffect, useState } from "react"

import { v4 as uuid } from "uuid"

import { Sidebar } from "../components/sidebar/Sidebar"
import { Toolbar } from "../components/toolbar/Toolbar"
import { MonthTableView } from "../components/table/MonthTableView"

import { db } from "../db/db"

import type { MonthTable } from "../types/models"

import { useMonthStore } from "../app/store/useMonthStore"

export const HomePage = () => {
  const [months, setMonths] = useState<
    MonthTable[]
  >([])

  const {
    selectedMonthId,
    setSelectedMonthId
  } = useMonthStore()

  const loadMonths = async () => {
    const data = await db.months.toArray()

    setMonths(data)

    if (!selectedMonthId && data.length > 0) {
      setSelectedMonthId(data[0].id)
    }
  }

  useEffect(() => {
    loadMonths()
  }, [])

  const selectedMonth =
    months.find(
      (month) =>
        month.id === selectedMonthId
    ) || null

  const createMonth = async () => {
    const now = new Date()

    const month: MonthTable = {
      id: uuid(),

      month: now.getMonth(),

      year: now.getFullYear(),

      tasks: [],

      collapsedWeeks: []
    }

    await db.months.add(month)

    await loadMonths()

    setSelectedMonthId(month.id)
  }

  const deleteMonth = async () => {
    if (!selectedMonthId) {
      return
    }

    await db.months.delete(selectedMonthId)

    await loadMonths()

    setSelectedMonthId(null)
  }

  const addTask = async () => {
    if (!selectedMonth) {
      return
    }

    selectedMonth.tasks.push({
      id: uuid(),

      name: "New Task",

      planHours: 0,

      days: {},

      note: ""
    })

    await db.months.put(selectedMonth)

    await loadMonths()
  }

  return (
    <div className="h-screen flex">
      <Sidebar
        months={months}
        selectedMonthId={selectedMonthId}
        onSelect={setSelectedMonthId}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Toolbar
          onCreateMonth={createMonth}
          onDeleteMonth={deleteMonth}
          onAddTask={addTask}
        />

        <MonthTableView
          month={selectedMonth}
        />
      </div>
    </div>
  )
}