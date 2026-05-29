import Dexie from "dexie"
import type { Table } from "dexie"
import type { MonthTable } from "../types/models"

export class AppDB extends Dexie {
  months!: Table<MonthTable>

  constructor() {
    super("task-hours-db")

    this.version(1).stores({
      months: "id, month, year"
    })
  }
}

export const db = new AppDB()