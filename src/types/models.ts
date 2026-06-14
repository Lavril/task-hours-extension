export interface Task {
  id: string

  name: string

  planHours: number

  days: Record<number, DayEntry>

  note: string
}

export interface MonthTable {
  id: string

  key: string

  month: number

  year: number

  tasks: Task[]

  collapsedWeeks: number[]

  daySettings: Record<
    number,
    DaySettings
  >
}

export interface UserSettings {
  id: string

  fullName: string

  defaultStartTime: string

  workDayHours: number

  lunchDurationHours: number
}

export interface DayEntry {
  hours: number
}

export interface DaySettings {
  startTime: string
  lunchTaken?: boolean
}
