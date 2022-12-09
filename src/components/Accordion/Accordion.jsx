import React, { useEffect, useState } from "react";
import s from "./Accordion.module.css";

const Accordion = () => {
  const [isActive, setIsActive] = useState(false);

  const onChange = (e) => {
    setIsActive(!isActive);
  };

  return (
    <div className={s.accordion}>
      <div className={s.accordion_item}>
        <div onClick={onChange} className={s.accordion_title}>
          <div className={isActive ? s.arrow_active : s.arrow}></div>
          Название партнера
        </div>
        {isActive && <div className={s.accordion_content}>Описание</div>}
      </div>
    </div>
  );
};
export default Accordion;
