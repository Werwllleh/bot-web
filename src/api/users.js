import axios from "axios";
import {API_BASE} from "../utils/consts";


export const createUser = async (data) => {
  try {
    return await axios.post(`${API_BASE}/create-user`, {
      data: data
    })
  } catch (err) {
    console.error('Ошибка создания пользователя:', err);
    throw err; // Пробрасываем ошибку, чтобы её можно было обработать в компоненте
  }
}
