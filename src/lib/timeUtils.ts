export const roundHours = (
  value: number
) =>
  Number(value.toFixed(2))

export const addHoursToTime = (
  time: string,
  hours: number
) => {
  const [h, m] =
    time.split(":").map(Number)

  const totalMinutes =
    h * 60 +
    m +
    Math.round(hours * 60)

  const endHour =
    Math.floor(
      totalMinutes / 60
    ) % 24

  const endMinute =
    totalMinutes % 60

  return `${String(
    endHour
  ).padStart(
    2,
    "0"
  )}:${String(
    endMinute
  ).padStart(
    2,
    "0"
  )}`
}