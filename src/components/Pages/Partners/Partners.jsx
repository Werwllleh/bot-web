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
    if (partners[i].partCategory === "Страхование") {
      arrInsurancesServices.push({
        name: partners[i].partName,
        descp: partners[i].partDescp,
        link: partners[i].partLink,
        phone: partners[i].partPhone,
        address: partners[i].partAddress,
      });
    } else if (partners[i].partCategory === "Детейлинг") {
      arrDetailingServices.push({
        name: partners[i].partName,
        descp: partners[i].partDescp,
        link: partners[i].partLink,
        phone: partners[i].partPhone,
        address: partners[i].partAddress,
      });
    } else if (partners[i].partCategory === "Автокосметика") {
      arrAutocosmetics.push({
        name: partners[i].partName,
        descp: partners[i].partDescp,
        link: partners[i].partLink,
        phone: partners[i].partPhone,
        address: partners[i].partAddress,
      });
    } else if (partners[i].partCategory === "Шиномонтаж") {
      arrTireServices.push({
        name: partners[i].partName,
        descp: partners[i].partDescp,
        link: partners[i].partLink,
        phone: partners[i].partPhone,
        address: partners[i].partAddress,
      });
    } else if (partners[i].partCategory === "Автозвук") {
      arrCarAudioServices.push({
        name: partners[i].partName,
        descp: partners[i].partDescp,
        link: partners[i].partLink,
        phone: partners[i].partPhone,
        address: partners[i].partAddress,
      });
    } else if (partners[i].partCategory === "Чип-тюнинг") {
      arrCarBoostServices.push({
        name: partners[i].partName,
        descp: partners[i].partDescp,
        link: partners[i].partLink,
        phone: partners[i].partPhone,
        address: partners[i].partAddress,
      });
    } else if (partners[i].partCategory === "Автосервис") {
      arrCarServices.push({
        name: partners[i].partName,
        descp: partners[i].partDescp,
        link: partners[i].partLink,
        phone: partners[i].partPhone,
        address: partners[i].partAddress,
      });
    } else if (partners[i].partCategory === "Оптика") {
      arrCarHeadlightServices.push({
        name: partners[i].partName,
        descp: partners[i].partDescp,
        link: partners[i].partLink,
        phone: partners[i].partPhone,
        address: partners[i].partAddress,
      });
    } else if (partners[i].partCategory === "Прочие") {
      arrCarOtherServices.push({
        name: partners[i].partName,
        descp: partners[i].partDescp,
        link: partners[i].partLink,
        phone: partners[i].partPhone,
        address: partners[i].partAddress,
      });
    }
  }

  return (
    <div className={s.partners_body}>
      <Header title={"Партнеры клуба"} />
      <div className={s.content_body}>
        {allServices.map((name) => {
          return (
            <Accordion
              children={name}
              key={Object.keys(name)[0]}
              category={Object.keys(name)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Partners;
