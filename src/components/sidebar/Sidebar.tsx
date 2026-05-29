import type { MonthTable } from "../../types/models"
import { getMonthName } from "../../lib/date"

interface Props {
  months: MonthTable[]

  selectedMonthId: string | null

  onSelect: (id: string) => void
}

export const Sidebar = ({
  months,
  selectedMonthId,
  onSelect
}: Props) => {
  return (
    <div className="w-[260px] bg-white border-r border-gray-200 h-full overflow-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">
          Months
        </h2>
      </div>

      <div className="p-2 flex flex-col gap-2">
        {months.map((month) => {
          const isActive =
            month.id === selectedMonthId

          return (
            <button
              key={month.id}
              onClick={() => onSelect(month.id)}
              className={`
                text-left
                px-4
                py-3
                rounded-xl
                transition
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              {getMonthName(
                month.month,
                month.year
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}