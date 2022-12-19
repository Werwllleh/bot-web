import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTelegram } from "../../../hooks/useTelegram";
import Accordion from "../../Accordion/Accordion";
import Header from "../../Header/Header";
import s from "./Partners.module.css";
import { getPartnersData } from "./partnersApi";

const Partners = () => {
  const [partners, setPartners] = useState([]);

  const { tg } = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  useEffect(() => {
    getPartnersData().then((res) => {
      setPartners(res.data.partners);
    });
  }, []);

  let arrInsurancesServices = [];
  let arrDetailingServices = [];
  let arrAutocosmetics = [];
  let arrTireServices = [];
  let arrCarAudioServices = [];
  let arrCarBoostServices = [];
  let arrCarServices = [];
  let arrCarHeadlightServices = [];
  let arrCarOtherServices = [];

  let allServices = [
    { Страхование: arrInsurancesServices },
    { Детейлинг: arrDetailingServices },
    { Автокосметика: arrAutocosmetics },
    { Шиномонтаж: arrTireServices },
    { Автозвук: arrCarAudioServices },
    { "Чип-тюнинг": arrCarBoostServices },
    { Автосервис: arrCarServices },
    { Оптика: arrCarHeadlightServices },
    { Прочие: arrCarOtherServices },
  ];

  for (let i = 0; i < partners.length; i++) {
    if (partners[i].category === "Страхование") {
      arrInsurancesServices.push({
        name: partners[i].name,
        info: partners[i].information,
        address: partners[i].address,
      });
    } else if (partners[i].category === "Детейлинг") {
      arrDetailingServices.push({
        name: partners[i].name,
        info: partners[i].information,
        address: partners[i].address,
      });
    } else if (partners[i].category === "Автокосметика") {
      arrAutocosmetics.push({
        name: partners[i].name,
        info: partners[i].information,
        address: partners[i].address,
      });
    } else if (partners[i].category === "Шиномонтаж") {
      arrTireServices.push({
        name: partners[i].name,
        info: partners[i].information,
        address: partners[i].address,
      });
    } else if (partners[i].category === "Автозвук") {
      arrCarAudioServices.push({
        name: partners[i].name,
        info: partners[i].information,
        address: partners[i].address,
      });
    } else if (partners[i].category === "Чип-тюнинг") {
      arrCarBoostServices.push({
        name: partners[i].name,
        info: partners[i].information,
        address: partners[i].address,
      });
    } else if (partners[i].category === "Автосервис") {
      arrCarServices.push({
        name: partners[i].name,
        info: partners[i].information,
        address: partners[i].address,
      });
    } else if (partners[i].category === "Оптика") {
      arrCarHeadlightServices.push({
        name: partners[i].name,
        info: partners[i].information,
        address: partners[i].address,
      });
    } else if (partners[i].category === "Прочие") {
      arrCarOtherServices.push({
        name: partners[i].name,
        info: partners[i].information,
        address: partners[i].address,
      });
    }
  }

  // console.log(allServices);

  /* allServices.map((name) => {
    let catName = Object.keys(name);
    let catVals = Object.values(name);
    catVals[0].map((el) => {
      console.log(el.name);
    });
    console.log(catVals[0]);
  }); */

  /* for (let i = 0; i < allServices.length; i++) {
    let valArr = Object.values(allServices[i]);
    for (let k = 0; k < valArr.length; k++) {
      for (let j = 0; j < valArr[k].length; j++) {
        console.log(Object.keys(allServices[i]));
        console.log(valArr[k][j]);
      }
    }
  } */

  return (
    <div className={s.partners_body}>
      <Header title={"Партнеры клуба"} />
      <div className={s.content_body}>
        {allServices.map((name) => {
          return (
            <Accordion
              children={name}
              key={Object.keys(name)}
              category={Object.keys(name)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Partners;
