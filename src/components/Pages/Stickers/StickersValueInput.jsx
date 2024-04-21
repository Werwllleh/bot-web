import React, {useState} from 'react';
import s from "../Stickers/Stickers.module.css";
import {Input} from "antd";
import {stickersTitles} from "../../../utils/consts";

const StickersValueInput = ({onInputChange, index, value}) => {

  const [inputValue, setInputValue] = useState(value[1]);


  const changeValue = (e) => {
    setInputValue(e.currentTarget.value);
    onInputChange(index, e.currentTarget.value); // Вызываем функцию обратного вызова и передаем новое значение
  };


  return (
    <div className={s.sticker__value}>
      <h4>{stickersTitles[value[0]][0]}, <span>шт</span></h4>
      <Input type={'number'} placeholder={value[1]}
             value={inputValue > 0 ? inputValue : null} onChange={changeValue}/>
    </div>
  );
};


export default StickersValueInput;
