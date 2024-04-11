import React, {useState} from 'react';
import s from "../Stickers/Stickers.module.css";
import {Input} from "antd";
import {stickersTitles} from "../../../utils/consts";

const StickersValueInput = ({value}) => {

  const [inputValue, setInputValue] = useState(value[1])

  const changeValue = (e) => {
    setInputValue(e.currentTarget.value)
  }


  return (
    <div className={s.sticker__value}>
      <h4>{stickersTitles[value[0]][0]}, <span>шт</span></h4>
      <Input placeholder={inputValue === 0 ? inputValue : null} value={inputValue > 0 ? inputValue : null} onChange={changeValue} />
    </div>
  );
};


export default StickersValueInput;
