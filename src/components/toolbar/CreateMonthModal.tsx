import { useState } from "react"

interface Props {
  onClose: () => void

  onCreate: (
    month: number,
    year: number
  ) => void
}

const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
]

export const CreateMonthModal = ({
  onClose,
  onCreate
}: Props) => {
  const now = new Date()

  const [month, setMonth] = useState(
    now.getMonth()
  )

  const [year, setYear] = useState(
    now.getFullYear()
  )

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
        <h2 className="text-xl font-semibold mb-6">
          Добавить отчёт
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm">
              Месяц
            </label>

            <select
              value={month}
              onChange={(e) =>
                setMonth(Number(e.target.value))
              }
              className="w-full border rounded-xl p-3"
            >
              {MONTHS.map((m, index) => (
                <option
                  key={m}
                  value={index}
                >
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Год
            </label>

            <input
              type="number"
              value={year}
              onChange={(e) =>
                setYear(Number(e.target.value))
              }
              className="w-full border rounded-xl p-3"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300"
          >
            Отмена
          </button>

          <button
            onClick={() =>
              onCreate(month, year)
            }
            className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  )
}