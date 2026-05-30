import { useEffect, useState } from "react"

import { db } from "../../db/db"

export const SettingsModal = ({
  onClose
}: {
  onClose: () => void
}) => {
  const [fullName, setFullName] =
    useState("")

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const settings =
      await db.settings.get("main")

    if (settings) {
      setFullName(settings.fullName)
    }
  }

  const save = async () => {
    await db.settings.put({
      id: "main",
      fullName
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[500px]">
        <h2 className="text-xl font-semibold mb-4">
          Settings
        </h2>

        <label className="block mb-2">
          Full name
        </label>

        <input
          value={fullName}
          onChange={(e) =>
            setFullName(
              e.target.value
            )
          }
          className="w-full border rounded-lg px-3 py-2"
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}