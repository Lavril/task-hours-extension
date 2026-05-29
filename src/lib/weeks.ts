export interface WeekGroup {
  index: number

  days: number[]
}

export const buildWeeks = (
  daysInMonth: number
): WeekGroup[] => {
  const weeks: WeekGroup[] = []

  let currentDay = 1
  let weekIndex = 0

  while (currentDay <= daysInMonth) {
    weeks.push({
      index: weekIndex,

      days: Array.from(
        {
          length: Math.min(
            7,
            daysInMonth - currentDay + 1
          )
        },
        (_, i) => currentDay + i
      )
    })

    currentDay += 7
    weekIndex++
  }

  return weeks
}