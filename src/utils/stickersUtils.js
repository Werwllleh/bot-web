import axios from "axios";
import {API, stickersTitles} from "./consts";


export const getStickersData = async () => {
  return (
    await axios.get(`${API}api/stickers`)
  )
}

export const updateStickersData = async (chatId, data) => {
  return (
    await axios.post(`${API}api/stickers-update`, {
      chatId: chatId,
      data: data,
    })
  )
}

export const stickersInfo = (stickersArr) => {

  const stickersData = [];

  stickersArr.map((itemFile) => {

    let title = itemFile.split('.')[0];

    Object.entries(stickersTitles).map((item) => {
      if (title === item[0]) {
        stickersData.push({
          id: title,
          photo: itemFile,
          title: item[1][0],
          price: item[1][1],
          ozon: item[1][2]
        })
      }
    });
  });

  return stickersData;

}

export const getSellerStickersCount = (array, currentId) => {
  return array?.filter(item => Number(item.chatId) === currentId)[0]
}
