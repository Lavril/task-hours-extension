import { useEffect, useState } from "react"

import { v4 as uuid } from "uuid"

import { Sidebar } from "../components/sidebar/Sidebar"
import { Toolbar } from "../components/toolbar/Toolbar"
import { MonthTableView } from "../components/table/MonthTableView"

import { CreateMonthModal } from "../components/toolbar/CreateMonthModal"

import { db } from "../db/db"

import type { MonthTable } from "../types/models"

import { useMonthStore } from "../app/store/useMonthStore"

import { buildMonthKey } from "../lib/month"

import { exportMonthDocx } from "../export/exportDocx"

import { SettingsModal } from "../components/settings/SettingsModal"

export const HomePage = () => {
  const [settingsOpen, setSettingsOpen] =
  useState(false)
  const [months, setMonths] = useState<
    MonthTable[]
  >([])

  const [showCreateModal, setShowCreateModal] =
    useState(false)

  const {
    selectedMonthId,
    setSelectedMonthId
  } = useMonthStore()

  const loadMonths = async () => {
    const data = await db.months
      .toArray()

    const sorted = data.sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year
      }

      return b.month - a.month
    })

    setMonths(sorted)

    if (!selectedMonthId) {
      const now = new Date()

      const currentKey = buildMonthKey(
        now.getMonth(),
        now.getFullYear()
      )

      const currentMonth = sorted.find(
        (month) =>
          month.key === currentKey
      )

      if (currentMonth) {
        setSelectedMonthId(
          currentMonth.id
        )
      }
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

  const createMonth = async (
    month: number,
    year: number
  ) => {
    const key = buildMonthKey(month, year)

    const exists = await db.months
      .where("key")
      .equals(key)
      .first()

    if (exists) {
      alert(
        "Отчёт за этот месяц и год уже создан!"
      )

      return
    }

    const getCurrentWeekIndex = (
      year: number,
      month: number
    ) => {
      const today = new Date()

      if (
        today.getFullYear() !== year ||
        today.getMonth() !== month
      ) {
        return 0
      }

      return Math.floor(
        (today.getDate() - 1) / 7
      )
    }

    const currentWeek =
      getCurrentWeekIndex(
        year,
        month
      )

    const collapsedWeeks =
      [0, 1, 2, 3, 4, 5].filter(
        (w) => w !== currentWeek
      )

    const newMonth: MonthTable = {
      id: uuid(),

      key,

      month,

      year,

      tasks: [],

      collapsedWeeks,

      daySettings: {},
    }

    await db.months.add(newMonth)

    await loadMonths()

    setSelectedMonthId(newMonth.id)

    setShowCreateModal(false)
  }

  const deleteMonth = async () => {
    if (!selectedMonthId) {
      return
    }

    await db.months.delete(
      selectedMonthId
    )

    const remainingMonths =
      months.filter(
        (month) =>
          month.id !== selectedMonthId
      )

    setMonths(remainingMonths)

    if (remainingMonths.length > 0) {
      setSelectedMonthId(
        remainingMonths[0].id
      )
    } else {
      setSelectedMonthId(null)
    }
  }

  const addTask = async () => {
    if (!selectedMonth) {
      return
    }

    selectedMonth.tasks.push({
      id: uuid(),

      name: "Новая задача",

      planHours: 0,

      days: {},

      note: ""
    })

    await db.months.put(selectedMonth)

    await loadMonths()
  }

  const updateMonth = async (
    updatedMonth: MonthTable
        ) => {
        await db.months.put(updatedMonth)

        setMonths((prev) =>
            prev.map((month) =>
            month.id === updatedMonth.id
                ? updatedMonth
                : month
            )
        )
    }

  const exportDocx = async () => {
    if (!selectedMonth) {
      return
    }

    const settings =
      await db.settings.get("main")

    await exportMonthDocx(
      selectedMonth,
      settings?.fullName ||
        "Не указано"
    )
  }

  return (
    <>
      <div className="h-screen flex">
        <Sidebar
          months={months}
          selectedMonthId={
            selectedMonthId
          }
          onSelect={
            setSelectedMonthId
          }
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Toolbar
            onCreateMonth={() =>
              setShowCreateModal(true)
            }
            onDeleteMonth={() => {
              const confirmed =
                window.confirm(
                  `Удалить отчёт?`
                )

              if (confirmed) {
                deleteMonth()
              }
            }}
            onAddTask={addTask}
            onExport={exportDocx}
            onOpenSettings={() =>setSettingsOpen(true)}
          />

          <MonthTableView
            month={selectedMonth}
            onUpdateMonth={updateMonth}
            />
        </div>
      </div>

      {showCreateModal && (
        <CreateMonthModal
          onClose={() =>
            setShowCreateModal(false)
          }
          onCreate={createMonth}
        />
      )}

      {
        settingsOpen && (
          <SettingsModal
            onClose={() =>
              setSettingsOpen(false)
            }
          />
        )
      }
    </>
  )
}