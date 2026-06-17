export interface WeekGroup {
  index: number

  days: number[]
}

export const buildWeeks = (
  year: number,
  month: number,
  daysInMonth: number
) => {
  const weeks = []

  let currentWeek: number[] = []

  for (let day = 1; day <= daysInMonth; day++) {
    const weekday =
      new Date(
        year,
        month,
        day
      ).getDay()

    const mondayWeekday =
      weekday === 0
        ? 7
        : weekday

    currentWeek.push(day)

    if (
      mondayWeekday === 7 ||
      day === daysInMonth
    ) {
      weeks.push({
        index:
          weeks.length,
        days: currentWeek
      })

      currentWeek = []
    }
  }

  return weeks
}