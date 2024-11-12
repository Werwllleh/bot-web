import { create } from 'zustand';

export const useUsersStore = create((set) => ({
  userTelegramData: {},
  userData: {},
  isAuthChecked: false,
  users: [],
  cart: [],
  selectedPlace: null,
  available: false,
  updateUserTelegramData: (data) => set(() => ({ userTelegramData: data })),
  updateUserData: (data) => set(() => ({ userData: data })),
  updateAuthChecked: (data) => set(() => ({ isAuthChecked: data })),
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
