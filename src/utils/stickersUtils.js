import axios from "axios";
import {SITE, stickersTitles} from "./consts";


export const getStickersData = async () => {
  return (
    await axios.get(`${SITE}api/stickers`)
  )
}

export const updateStickersData = async (data) => {
  return (
    await axios.post(`https://script.google.com/macros/s/AKfycbwTu6m3wl_ZHt1_MHMbdQFi18KsDSCAF-9tz4U_5EclwrUAXy5LiTBCdb9imwvUS7Ev5w/exec`, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
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
          price: item[1][1]
        })
      }
    });
  });

  return stickersData;

}
