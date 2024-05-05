import axios from "axios";
import {SITE} from "./consts";

export const addFeedback = async (chatId, data) => {
  return (
    await axios.post(`${SITE}api/add-feedback`, {
      chatId: chatId,
      data: data,
    })
  )
}
