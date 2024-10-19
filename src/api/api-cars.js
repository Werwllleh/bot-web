import axios from "axios";
import {API_BASE} from "../utils/consts";


export const getCars = async () => {
  try {
    return await axios.get(`${API_BASE}/get-cars`);
  } catch (e) {
    console.error('Error fetching cars:', e);
    throw e; // Пробрасываем ошибку, чтобы её можно было обработать в компоненте
  }
};
