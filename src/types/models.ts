export interface Task {
  id: string

  name: string

  planHours: number

  days: Record<number, number>

  note: string
}

export interface MonthTable {
  id: string

  key: string

  month: number

  year: number

  tasks: Task[]

  collapsedWeeks: number[]
}

export interface UserSettings {
  id: string
  fullName: string
}