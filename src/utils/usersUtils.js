import {API} from "./consts";
import axios from "axios";

export const getUsersData = async () => {
  return (
    await axios.post(`${API}api/data`)
  )
}

export const postUsersUpdatedData = async (chatId, column, value) => {
  return (
    await axios.post(`${API}api/updated-data`, {
      chatId: chatId,
      column: column,
      value: value
    })
  )
}

export const postUserDelete = async (userId) => {
  return (
    await axios.post(`${API}api/delete-user`, {
      userId: userId,
    })
  )
}
