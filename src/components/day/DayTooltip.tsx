import { addHoursToTime } from "../../lib/timeUtils"

interface Props {
  day: number

  startTime: string

  workedHours: number

  lunchHours: number

  lunchTaken: boolean

  workDayHours: number
}

export const DayTooltip = ({
  day,
  startTime,
  workedHours,
  lunchHours,
  lunchTaken,
  workDayHours
}: Props) => {
    const targetHours =
    workDayHours +
    (lunchTaken
        ? lunchHours
        : 0)

    const remaining =
    Math.max(
        0,
        targetHours -
        workedHours
    )

    const finishTime =
    addHoursToTime(
        startTime,
        targetHours
    )

  return (
    <div
      className="
        pointer-events-none
        bg-white
        border
        rounded-xl
        shadow-lg
        p-4
        w-[260px]
        text-sm
      "
    >
      <div className="font-semibold mb-2">
        День {day}
      </div>

      <div>
        Начало работы:
        {" "}
        {startTime}
      </div>

      <div>
        Отработано:
        {" "}
        {workedHours} ч
      </div>

      <div>
        Обед:
        {" "}
        {lunchTaken
          ? `${lunchHours} ч`
          : "нет"}
      </div>

      <div>
        Осталось:
        {" "}
        {remaining} ч
      </div>

      <div>
        Окончание:
        {" "}
        {finishTime}
      </div>
    </div>
  )
}