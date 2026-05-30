import Dexie from "dexie"

import type {
  MonthTable,
  UserSettings
} from "../types/models"

export class AppDB extends Dexie {
  months!: Dexie.Table<
    MonthTable,
    string
  >

  settings!: Dexie.Table<
    UserSettings,
    string
  >

  constructor() {
    super("task-hours-db")

    this.version(4).stores({
      months: "id,key,month,year",
      settings: "id"
    }).upgrade(async (tx) => {
      const months = await tx.table("months").toArray()

      for (const month of months) {
        month.tasks = month.tasks.map((task: any) => {
          const newDays: Record<
            number,
            {
              hours: number
              startTime?: string
            }
          > = {}

          Object.entries(task.days || {}).forEach(
            ([day, value]) => {
              newDays[Number(day)] = {
                hours: Number(value)
              }
            }
          )

          return {
            ...task,
            days: newDays
          }
        })

        await tx.table("months").put(month)
      }
    })
  }
}

export const db = new AppDB()