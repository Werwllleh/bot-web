import axios from "axios";
import {API_BASE} from "../utils/consts";


export const getCars = async () => {
  try {
    return await axios.get(`${API_BASE}/get-cars`);
  } catch (err) {
    console.error('Ошибка загрузки моделей авто:', err);
  }
};

export const getCarInfo = async (car_number) => {
  try {
    return await axios.post(`${API_BASE}/get-car-info`, {
      car_number: car_number.toUpperCase().trim()
    });
  } catch (err) {
    console.error(`Ошибка получения данных об авто с номером ${car_number}: `, err);
  }
};

export const deleteCarImage = async (file) => {
  try {
    return await axios.post(`${API_BASE}/upload/remove`, {
      fileName: file,
    });
  } catch (err) {
    console.error('Ошибка удаления файла:', err);
  }
}
