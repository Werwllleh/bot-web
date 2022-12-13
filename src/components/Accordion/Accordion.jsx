import React, { useState } from "react";
import Slider from "../Slider/Slider";
import s from "./Accordion.module.css";

const Accordion = ({ category }) => {
  const [isActive, setIsActive] = useState(false);

  const onChange = (e) => {
    setIsActive(!isActive);
  };

  return (
    <div className={s.accordion}>
      <div className={s.accordion_item}>
        <div onClick={onChange} className={s.accordion_title}>
          <div className={isActive ? s.arrow + " " + s.active : s.arrow}></div>
          {category}
        </div>
        <div
          className={
            isActive
              ? s.accordion_content + " " + s.show
              : s.accordion_content + " " + s.hide
          }
        >
          <Slider />
        </div>
      </div>
    </div>
  );
};
export default Accordion;
