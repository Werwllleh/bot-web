import axios from "axios";
import {API_BASE} from "../utils/consts";


export const createUser = async (chatId, data) => {
  try {
    return await axios.post(`${API_BASE}/create-user`, {
      chat_id: chatId,
      username: data
    })
  } catch (err) {
    console.error('Ошибка создания пользователя: ', err);
    throw err; // Пробрасываем ошибку, чтобы её можно было обработать в компоненте
  }
}

export const updateUser = async (chatId, data) => {
  try {
    return await axios.post(`${API_BASE}/update-user`, {
      chat_id: chatId,
      data: data
    })
  } catch (err) {
    console.error('Ошибка обновления данных: ', err);
    throw err; // Пробрасываем ошибку, чтобы её можно было обработать в компоненте
  }
}

export const getUserInfo = async (chatId) => {
  try {
    return await axios.post(`${API_BASE}/about-user`, {
      chatId: chatId
    })
  } catch (err) {
    console.error('Ошибка получения данных пользователя: ', err);
    throw err; // Пробрасываем ошибку, чтобы её можно было обработать в компоненте
  }
}

export const deleteUser = async (chatId) => {
  try {
    return await axios.post(`${API_BASE}/delete-user`, {
      chatId: chatId
    })
  } catch (err) {
    console.error('Ошибка удаления пользователя: ', err);
    throw err; // Пробрасываем ошибку, чтобы её можно было обработать в компоненте
  }
}

export const getAllUsers = async () => {
  try {
    return await axios.post(`${API_BASE}/all-users`)
  } catch (err) {
    console.error('Ошибка получения данных всех пользователей: ', err);
    throw err; // Пробрасываем ошибку, чтобы её можно было обработать в компоненте
  }
}

export const sendUserMessage = async (chatId, message) => {
  try {
    return await axios.post(`${API_BASE}/send-message`, {
      chatId: chatId,
      message: message
    })
  } catch (err) {
    console.error('Ошибка отправки сообщения: ', err);
    throw err; // Пробрасываем ошибку, чтобы её можно было обработать в компоненте
  }
}
