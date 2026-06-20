interface Props {
  onCreateMonth: () => void

  onDeleteMonth: () => void

  onAddTask: () => void

  onExport: () => void

  onOpenSettings: () => void

  onOpenHelp: () => void
}

export const Toolbar = ({
  onCreateMonth,
  onDeleteMonth,
  onAddTask,
  onExport,
  onOpenSettings,
  onOpenHelp
}: Props) => {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
      <button
        onClick={onCreateMonth}
        className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
      >
        Добавить отчёт
      </button>

      <button
        onClick={onDeleteMonth}
        className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
      >
        Удалить месяц
      </button>

      <button
        onClick={onAddTask}
        className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
      >
        Добавить задачу
      </button>

      <button
        onClick={onExport}
        className="px-4 py-2 rounded-lg bg-green-600 text-white"
      >
        Экспорт docx
      </button>

      <button
        onClick={onOpenSettings}
        className="px-4 py-2 rounded-lg bg-gray-600 text-white"
      >
        Настройки
      </button>

      <button
        onClick={onOpenHelp}
        className="px-4 py-2 rounded-lg bg-sky-500 text-white"
      >
        Справка
      </button>
    </div>
  )
}