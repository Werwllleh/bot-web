import {SITE} from "./consts";
import axios from "axios";

export const getUsersData = async () => {
  return (
    await axios.post(`${SITE}api/data`)
  )
}

export const postUsersUpdatedData = async (chatId, column, value) => {
  return (
    await axios.post(`${SITE}api/updated-data`, {
      chatId: chatId,
      column: column,
      value: value
    })
  )
}
