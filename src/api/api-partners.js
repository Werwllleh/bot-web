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

export const addPartner = async (chatId, data) => {
  try {
    return await axios.post(`${API_BASE}/add-partner`, {
      chatId: chatId,
      data: data
    });
  } catch (err) {
    console.error('Ошибка добавления партнера:', err);
  }
};

export const getPartners = async () => {
  try {
    return await axios.get(`${API_BASE}/get-partners`);
  } catch (err) {
    console.error('Ошибка получения партнеров:', err);
  }
};
