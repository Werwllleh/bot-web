import { create } from 'zustand';

export const useUsersStore = create((set) => ({
  users: [],
  cart: [],
  updateUsers: (data) => set(() => ({ users: data })),
  updateCart: (data) => set(() => ({ cart: data })),
}))

export const usePartnersStore = create((set) => ({
  partners: [],
  updatePartners: (data) => set(() => ({ partners: data })),
}))

export const useStickersStore = create((set) => ({
  stickers: [],
  updateStickers: (data) => set(() => ({ stickers: data })),
}))