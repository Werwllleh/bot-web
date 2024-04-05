import { create } from 'zustand';

export const useAppStore = create((set) => ({
  menuStatus: false,
  updateMenuStatus: (data) => set(() => ({ menuStatus: data })),
}))

export const useUsersStore = create((set) => ({
  currentUser: {},
  userStatus: null,
  users: [],
  cart: [],
  selectedPlace: null,
  available: false,
  updateCurrentUser: (data) => set(() => ({ currentUser: data })),
  updateUserStatus: (data) => set(() => ({ userStatus: data })),
  updateUsers: (data) => set(() => ({ users: data })),
  updateCart: (data) => set(() => ({ cart: data })),
  updateSelectedPlace: (data) => set(() => ({ selectedPlace: data })),
  updateAvailableProducts: (data) => set(() => ({ available: data })),
}))

export const usePartnersStore = create((set) => ({
  partners: [],
  updatePartners: (data) => set(() => ({ partners: data })),
}))

export const useStickersStore = create((set) => ({
  stickers: [],
  updateStickers: (data) => set(() => ({ stickers: data })),
}))

export const useProductsCountStore = create((set) => ({
  productStore: [],
  productStoreLoading: true,
  updateProductStore: (data) => set(() => ({ productStore: data })),
  updateProductStoreLoading: (data) => set(() => ({ productStoreLoading: data })),
}))
