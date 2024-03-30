import { create } from 'zustand';

export const useAppStore = create((set) => ({
  menuStatus: false,
  updateMenuStatus: (data) => set(() => ({ menuStatus: data })),
}))

export const useUsersStore = create((set) => ({
  currentUser: {
    allows_write_to_pm: true,
    first_name: "Lesha",
    id: 446012794,
    language_code: "en",
    last_name: "",
    username: "all_lllll"
  },
  users: [],
  cart: [],
  updateCurrentUser: (data) => set(() => ({ currentUser: data })),
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

export const useProductsCountStore = create((set) => ({
  productStore: [],
  productStoreLoading: true,
  updateProductStore: (data) => set(() => ({ productStore: data })),
  updateProductStoreLoading: (data) => set(() => ({ productStoreLoading: data })),
}))
