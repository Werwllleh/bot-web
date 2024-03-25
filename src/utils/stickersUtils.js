import axios from "axios";
import {SITE, stickersTitles} from "./consts";


export const getStickersData = async () => {
  return (
    await axios.get(`${SITE}api/stickers`)
  )
}

export const stickersInfo = (stickersArr) => {

  const stickersData = [];

  stickersArr.map((itemFile) => {

    let title = itemFile.split('.')[0];

    Object.entries(stickersTitles).map((item) => {
      if (title === item[0]) {
        stickersData.push({
          photo: itemFile,
          title: item[1][0],
          price: item[1][1]
        })
      }
    });
  });

  return stickersData;

}