import axios from "axios";
import {API} from "./consts";

export const addFeedback = async (chatId, data) => {
  return (
    await axios.post(`${API}api/add-feedback`, {
      chatId: chatId,
      data: data,
    })
  )
}

export const getFeedback = async (chatId) => {
  return (
    await axios.post(`${API}api/get-feedback`, {chatId})
  )
}

export const verifyFeedback = async (feedbackId, verifyStatus) => {
  return (
    await axios.post(`${API}api/verify-feedback`, {feedbackId, verifyStatus})
  )
}

export const historyFeedbacks = async () => {
  return (
    await axios.post(`${API}api/history-feedbacks`)
  )
}
