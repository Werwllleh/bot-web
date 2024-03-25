import React from 'react';
import Header from "../../Header/Header";
import {Image} from "antd";
import s from "../Stickers/Stickers.module.css";
import {SITE} from "../../../utils/consts";
import {stickersInfo} from "../../../utils/stickersUtils";



const StickerItem = ({photo, title}) => {
  return (
    <div className={s.sticker}>
      <div className={"sticker__photo"}>
        <Image
          preview={{
            mask: false,
            // src: `${SITE}api/image/stickers/${photo}`,
            imageRender: () => (
              <div className={s.sticker__preview}>
                <img src={`${SITE}api/image/stickers/${photo}`} alt=""/>
              </div>
            ),
            toolbarRender: () => null,
          }}
          src={`${SITE}api/image/stickers/${photo}`}
          alt={title}
        />
      </div>
      <div className={s.sticker__info}>
        <h2 className={s.sticker__title}>{title}</h2>
      </div>
    </div>
  )
}

const Stickers = ({stickers}) => {

  return (
    <div className={s.stickers__body}>
      <Header title={"Аттрибутика клуба"}/>
      <div className={s.stickers__grid}>
        {
          stickersInfo(stickers).map((sticker) => {
            return <StickerItem key={sticker.title} photo={sticker.photo} title={sticker.title} />
          })
        }
      </div>
    </div>
  );
};

export default Stickers;