import Dexie from "dexie"

import type { MonthTable } from "../types/models"

export class AppDB extends Dexie {
  months!: Dexie.Table<MonthTable, string>

  constructor() {
    super("task-hours-db")

    this.version(2).stores({
      months: "id, key, month, year"
    })
  }
}

export const db = new AppDB()