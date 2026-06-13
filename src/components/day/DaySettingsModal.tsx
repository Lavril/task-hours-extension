import { useState } from "react"

interface Props {
  day: number

  startTime: string

  onSave: (
    startTime: string
  ) => void

  onClose: () => void
}

export const DaySettingsModal = ({
  day,
  startTime,
  onSave,
  onClose
}: Props) => {
  const [value, setValue] =
    useState(startTime)

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

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Отмена
          </button>

          <button
            onClick={() =>
              onSave(value)
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