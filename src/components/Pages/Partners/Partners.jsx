import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTelegram } from "../../../hooks/useTelegram";
import Accordion from "../../Accordion/Accordion";
import Header from "../../Header/Header";
import s from "./Partners.module.css";

const Partners = () => {
  const [partners, setPartners] = useState([]);

  const { tg } = useTelegram();

  const getData = async () => {
    return await axios.get(
      `https://script.google.com/macros/s/AKfycbx1zqpE9SS0MUTL-GdVqFKAxSQQqz65050GZmoNzmhSGQEDrwjN22iQukmiKoXglktVwQ/exec`
    );
  };

  useEffect(() => {
    tg.expand();
  }, []);

  useEffect(() => {
    getData().then((res) => {
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
      arrInsurancesServices.push([
        partners[i].name,
        partners[i].information,
        partners[i].address,
      ]);
    } else if (partners[i].category === "Детейлинг") {
      arrDetailingServices.push([
        partners[i].name,
        partners[i].information,
        partners[i].address,
      ]);
    } else if (partners[i].category === "Автокосметика") {
      arrAutocosmetics.push([
        partners[i].name,
        partners[i].information,
        partners[i].address,
      ]);
    } else if (partners[i].category === "Шиномонтаж") {
      arrTireServices.push([
        partners[i].name,
        partners[i].information,
        partners[i].address,
      ]);
    } else if (partners[i].category === "Автозвук") {
      arrCarAudioServices.push([
        partners[i].name,
        partners[i].information,
        partners[i].address,
      ]);
    } else if (partners[i].category === "Чип-тюнинг") {
      arrCarBoostServices.push([
        partners[i].name,
        partners[i].information,
        partners[i].address,
      ]);
    } else if (partners[i].category === "Автосервис") {
      arrCarServices.push([
        partners[i].name,
        partners[i].information,
        partners[i].address,
      ]);
    } else if (partners[i].category === "Оптика") {
      arrCarHeadlightServices.push([
        partners[i].name,
        partners[i].information,
        partners[i].address,
      ]);
    } else if (partners[i].category === "Прочие") {
      arrCarOtherServices.push([
        partners[i].name,
        partners[i].information,
        partners[i].address,
      ]);
    }
  }

  return (
    <div className={s.partners_body}>
      <Header title={"Партнеры клуба"} />
      <div className={s.content_body}>
        {allServices.map((name) => {
          return (
            <Accordion key={Object.keys(name)} category={Object.keys(name)} />
          );
        })}
      </div>
    </div>
  );
};

export default Partners;
