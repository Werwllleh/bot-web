import axios from "axios";
import {API_BASE} from "../utils/consts";


export const addUserCar = async (chatId, data) => {
  try {
    return await axios.post(`${API_BASE}/add-car`, {
      chatId: chatId,
      data: data
    });
  } catch (err) {
    console.error('Ошибка добавления авто:', err);
  }
};

export const deleteUserCar = async (chatId, carId) => {
  try {
    return await axios.post(`${API_BASE}/delete-car`, {
      chatId: chatId,
      carId: carId
    });
  } catch (err) {
    console.error('Ошибка удаления авто:', err);
  }
};

//список авто при регистрации
export const getCars = async () => {
  try {
    return await axios.get(`${API_BASE}/get-cars`);
  } catch (err) {
    console.error('Ошибка загрузки моделей авто:', err);
  }
};

export const getUsersCars = async () => {
  try {
    return await axios.post(`${API_BASE}/get-users-cars`);
  } catch (err) {
    console.error('Ошибка загрузки всех авто пользователей:', err);
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

export const deleteCarImage = async (file, data) => {
  try {
    return await axios.post(`${API_BASE}/upload/remove`, {
      fileName: file,
      data
    });
  } catch (err) {
    console.error('Ошибка удаления файла:', err);
  }
}

