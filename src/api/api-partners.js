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
