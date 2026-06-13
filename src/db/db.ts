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

    this.version(5).stores({
      months: "id,key,month,year",
      settings: "id"
    }).upgrade(async (tx) => {
      const months =
        await tx.table("months").toArray()

      for (const month of months) {
        const daySettings: Record<
          number,
          {
            startTime: string
          }
        > = {}

        for (const task of month.tasks) {
          Object.entries(
            task.days || {}
          ).forEach(
            ([day, dayData]: any) => {
              if (
                dayData?.startTime &&
                !daySettings[
                  Number(day)
                ]
              ) {
                daySettings[
                  Number(day)
                ] = {
                  startTime:
                    dayData.startTime
                }
              }

              if (
                dayData?.startTime
              ) {
                delete dayData.startTime
              }
            }
          )
        }

        month.daySettings =
          daySettings

        await tx
          .table("months")
          .put(month)
      }
    })
  }
}

export const db = new AppDB()