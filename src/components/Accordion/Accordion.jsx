import React, { useState } from "react";
import s from "./Accordion.module.css";

const Accordion = ({ category, children }) => {
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
          {children[category].map((i) => {
            return (
              <>
                <div key={i.name} className={s.partnerInfo}>
                  <div className={s.partName}>{i.name}</div>
                  <div className={s.partInfo}>{i.info}</div>
                  <div className={s.partAddress}>{i.address}</div>
                  <div className={s.linePart}></div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Accordion;
