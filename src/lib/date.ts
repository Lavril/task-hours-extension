export const getMonthName = (
  month: number,
  year: number
) => {
  return new Date(year, month).toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric"
    }
  )
}