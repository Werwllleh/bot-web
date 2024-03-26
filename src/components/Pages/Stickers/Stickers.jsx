import React from 'react';
import Header from "../../Header/Header";
import s from "../Stickers/Stickers.module.css";
import {stickersInfo} from "../../../utils/stickersUtils";
import StickerItem from "./StickerItem";




const Stickers = ({stickers}) => {

  return (
    <div className={s.stickers__body}>
      <Header title={"Аттрибутика клуба"}/>
      <div className={s.stickers__grid}>
        {
          stickersInfo(stickers).map((sticker) => {
            return <StickerItem key={sticker.title} photo={sticker.photo} title={sticker.title} price={sticker.price}/>
          })
        }
      </div>
    </div>
  );
};

export default Stickers;
