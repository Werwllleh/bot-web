import axios from "axios";
import {API_CMS} from "../utils/consts";

export const getAllAttributes = async () => {
  try {
    return await axios.get(`${API_CMS}/products?populate=*`);
  } catch (err) {
    console.error('Ошибка получения клубной атрибутики:', err);
  }
};
