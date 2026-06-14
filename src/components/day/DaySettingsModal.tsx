import { useState } from "react"

interface Props {
  day: number

  startTime: string

  initialLunchTaken: boolean

  onSave: (
    startTime: string,
    lunchTaken: boolean
  ) => void

  onClose: () => void
}

export const DaySettingsModal = ({
  day,
  startTime,
  initialLunchTaken,
  onSave,
  onClose
}: Props) => {
  const [value, setValue] =
    useState(startTime)

  const [lunchTaken, setLunchTaken] =
    useState(initialLunchTaken)

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-xl font-semibold mb-4">
          День {day}
        </h2>

        <label className="block mb-2">
          Время начала
        </label>

        <input
          type="time"
          value={value}
          onChange={(e) =>
            setValue(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-3 py-2"
        />

        <div className="mt-4">
        <label className="flex items-center gap-2">
            <input
            type="checkbox"
            checked={lunchTaken}
            onChange={(e) =>
                setLunchTaken(
                e.target.checked
                )
            }
            />

            <span>
            Был обед
            </span>
        </label>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Отмена
          </button>

          <button
            onClick={() =>
            onSave(
                value,
                lunchTaken
            )
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}