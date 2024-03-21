import { create } from 'zustand'

export const useUsersStore = create((set) => ({
  users: [],
  updateUsers: (data) => set(() => ({ users: data })),
}))

export const usePartnersStore = create((set) => ({
  partners: [],
  updatePartners: (data) => set(() => ({ partners: data })),
}))