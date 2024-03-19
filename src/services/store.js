import { create } from 'zustand'

export const useUsersStore = create((set) => ({
  users: [],
  updateUsers: (data) => set(() => ({ users: data })),
}))
