interface Props {
  onCreateMonth: () => void

  onDeleteMonth: () => void

  onAddTask: () => void

  onExport: () => void

  onOpenSettings: () => void
}

export const Toolbar = ({
  onCreateMonth,
  onDeleteMonth,
  onAddTask,
  onExport,
  onOpenSettings
}: Props) => {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
      <button
        onClick={onCreateMonth}
        className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600"
      >
        New Month
      </button>

      <button
        onClick={onDeleteMonth}
        className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
      >
        Delete Month
      </button>

      <button
        onClick={onAddTask}
        className="px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600"
      >
        Add Task
      </button>

      <button
        onClick={onExport}
        className="px-4 py-2 rounded-lg bg-green-600 text-white"
      >
        Export DOCX
      </button>

      <button
        onClick={onOpenSettings}
        className="px-4 py-2 rounded-lg bg-gray-600 text-white"
      >
        Settings
      </button>
    </div>
  )
}