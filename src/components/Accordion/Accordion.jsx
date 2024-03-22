import React from 'react';
import { Collapse } from 'antd';
import { CaretRightFilled } from '@ant-design/icons';
import s from "./Accordion.module.css";
import Loader from "../Loader/Loader";
import {linksArrayFunc, phoneArrayFunc} from "../../utils/partnersUtils";



const Accordion = ({data}) => {

  let accordionItems = [];

  Object.entries(data).forEach((entry, index) => {

    console.log(accordionItems)

    const [category, items] = entry;

    accordionItems.push({
      key: index,
      label: category,
      children: items.map((el) => (
        <div key={el.name} className={s.partnerInfo}>
          {el.name && <div className={s.partName}>{el.name}</div>}
          {el.description && <div className={s.partDescp}>{el.description}</div>}
          {el.link && (
            <div className={s.partLink}>
              {
                linksArrayFunc(el.link).map((item) => {
                  return <a key={item} target={"_blank"} href={"http://" + item}>{item}</a>
                })
              }
            </div>
          )}
          {el.phone && (
            <div className={s.partPhones}>
              {phoneArrayFunc(el.phone).map((item) => {
                return <a key={item}>{item}</a>
              })}
            </div>
          )}
          {el.address && <div className={s.partAddress}>{el.address}</div>}
        </div>
      )),
    });
  });

  return (
      accordionItems.length !== 0 ? (
        <Collapse accordion items={accordionItems} expandIcon={() => <span><CaretRightFilled /></span>} />
      ) : <Loader />
    )
};

export default Accordion;
