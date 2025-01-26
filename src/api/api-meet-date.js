import axios from "axios";
import {API_CMS} from "../utils/consts";

export const getMeetDate = async () => {
  try {
    const response = await axios.get(`${API_CMS}/meet-date`);

    if (response.status === 200) {
      return response.data.data;
    }

  } catch (err) {
    console.error('Ошибка получения даты встречи:', err);
  }
};
