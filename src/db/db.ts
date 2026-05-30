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

    this.version(3).stores({
      months: "id,key,month,year",
      settings: "id"
    })
  }
}

export const db = new AppDB()