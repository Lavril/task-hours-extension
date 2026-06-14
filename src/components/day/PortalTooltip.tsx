import { createPortal } from "react-dom"

import { DayTooltip } from "./DayTooltip"

interface Props {
  x: number
  y: number

  day: number

  startTime: string

  workedHours: number

  lunchHours: number

  lunchTaken: boolean

  workDayHours: number
}

export const PortalTooltip = (
  props: Props
) => {
  return createPortal(
    <div
      style={{
        position: "fixed",
        left: props.x,
        top: props.y,
        zIndex: 9999
      }}
    >
      <DayTooltip
        day={props.day}
        startTime={props.startTime}
        workedHours={props.workedHours}
        lunchHours={props.lunchHours}
        lunchTaken={props.lunchTaken}
        workDayHours={props.workDayHours}
      />
    </div>,
    document.body
  )
}