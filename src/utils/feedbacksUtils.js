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

export const getFeedback = async (chatId) => {
  return (
    await axios.post(`${SITE}api/get-feedback`, {chatId})
  )
}

export const verifyFeedback = async (feedbackId, verifyStatus) => {
  return (
    await axios.post(`${SITE}api/verify-feedback`, {feedbackId, verifyStatus})
  )
}