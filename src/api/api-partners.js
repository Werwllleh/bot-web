import axios from "axios";
import {API_BASE} from "../utils/consts";

export const addPartnerCategory = async (chatId, category) => {
  try {
    return await axios.post(`${API_BASE}/add-partner-category`, {
      chatId: chatId,
      category: category
    });
  } catch (err) {
    console.error('Ошибка добавления категории партнера:', err);
  }
};

export const getPartnersCategories = async () => {
  try {
    return await axios.get(`${API_BASE}/get-partners-categories`);
  } catch (err) {
    console.error('Ошибка добавления категории партнера:', err);
  }
};

export const deletePartnerCategory = async (chatId, categoryId) => {
  try {
    return await axios.post(`${API_BASE}/delete-partner-category`, {
      chatId: chatId,
      categoryId: categoryId
    });
  } catch (err) {
    console.error('Ошибка добавления категории партнера:', err);
  }
};

export const addPartner = async (chatId, data, partnerId) => {
  try {
    return await axios.post(`${API_BASE}/add-partner`, {
      chatId: chatId,
      data: data,
      partnerId: partnerId
    });
  } catch (err) {
    console.error('Ошибка добавления партнера:', err);
  }
};

export const deletePartner = async (chatId, partnerId) => {
  try {
    return await axios.post(`${API_BASE}/delete-partner`, {
      chatId: chatId,
      partnerId: partnerId
    });
  } catch (err) {
    console.error('Ошибка добавления партнера:', err);
  }
};

export const getPartnersAdmin = async () => {
  try {
    return await axios.get(`${API_BASE}/get-partners-admin`);
  } catch (err) {
    console.error('Ошибка получения партнеров:', err);
  }
};

export const getPartnersUsers = async () => {
  try {
    return await axios.get(`${API_BASE}/get-partners-users`);
  } catch (err) {
    console.error('Ошибка получения партнеров:', err);
  }
};

export const updatePartnerStatus = async (chatId, partnerId, data) => {
  try {
    return await axios.post(`${API_BASE}/update-partner-status`, {
      chatId: chatId,
      partnerId: partnerId,
      data: data
    });
  } catch (err) {
    console.error('Ошибка добавления партнера:', err);
  }
};