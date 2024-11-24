import { create } from 'zustand';
import {getAllUsers} from "../api/api-users";
import {getUsersCars} from "../api/api-cars";

export const useUsersStore = create((set) => ({
  userTelegramData: {},
  userData: {},
  isAuthChecked: false,
  isAdmin: false,
  users: [],
  usersCars: [],
  updateUserTelegramData: (data) => set(() => ({ userTelegramData: data })),
  updateUserData: (data) => set(() => ({
    userData: data,
    isAdmin: data.user_admin
  })),
  updateAuthChecked: (data) => set(() => ({ isAuthChecked: data })),
  // updateUsers: (data) => set(() => ({ users: data })),
  updateUsers: async () => {
    const users = await getAllUsers();
    set({ users: users.data });
  },
  updateUsersCars: async () => {
    const usersCars = await getUsersCars();
    set({ usersCars: usersCars.data });
  },
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
