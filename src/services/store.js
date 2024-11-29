import { create } from 'zustand';
import {getAllUsers} from "../api/api-users";
import {getUsersCars} from "../api/api-cars";
import {getPartnersAdmin, getPartnersCategories, getPartnersUsers} from "../api/api-partners";

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
  partnersListUsers: [],
  partnersListAdmin: [],
  partnersCategories: [],
  updatePartnersAdmin: async () => {
    const allPartners = await getPartnersAdmin();
    set({ partnersListAdmin: allPartners.data });
  },
  updatePartnersUsers: async () => {
    const allPartners = await getPartnersUsers();
    set({ partnersListUsers: allPartners.data });
  },
  updatePartnersCategories: async () => {
    const partnersCategoriesList = await getPartnersCategories();
    set({ partnersCategories: partnersCategoriesList.data });
  },
}))


export const useProductsCountStore = create((set) => ({
  productStore: [],
  productStoreLoading: true,
  updateProductStore: (data) => set(() => ({ productStore: data })),
  updateProductStoreLoading: (data) => set(() => ({ productStoreLoading: data })),
}))
