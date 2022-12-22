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
                  {i.name ? <div className={s.partName}>{i.name}</div> : null}
                  {i.descp ? (
                    <div className={s.partDescp}>{i.descp}</div>
                  ) : null}
                  {i.link ? (
                    <div className={s.partLink}>
                      <a target={"_blank"} href={"http://" + i.link}>
                        {i.link}
                      </a>
                    </div>
                  ) : null}
                  {i.phone ? (
                    <div className={s.partPhone}>
                      <a href={"tel:+" + i.phone}>{i.phone}</a>
                    </div>
                  ) : null}
                  {i.address ? (
                    <div className={s.partAddress}>{i.address}</div>
                  ) : null}
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
