import axios from "axios";
import {API_CMS} from "../utils/consts";

export const getAllAttributes = async () => {
  try {
    return await axios.get(`${API_CMS}/products`);
  } catch (err) {
    console.error('Ошибка получения клубной атрибутики:', err);
  }
};

export const getCurrentAttribute = async (slug) => {
  try {
    return await axios.get(`${API_CMS}/products/${slug}`);
  } catch (err) {
    console.error('Ошибка получения атрибута:', err);
  }
};
