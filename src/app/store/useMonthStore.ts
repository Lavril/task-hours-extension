import { create } from "zustand"

interface State {
  selectedMonthId: string | null

  setSelectedMonthId: (id: string | null) => void
}

export const useMonthStore = create<State>((set) => ({
  selectedMonthId: null,

  setSelectedMonthId: (id) =>
    set({
      selectedMonthId: id
    })
}))