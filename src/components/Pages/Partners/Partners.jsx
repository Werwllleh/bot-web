import React, { useEffect, useState } from "react";
import Accordion from "../../Accordion/Accordion";
import Header from "../../Header/Header";
import Loader from "../../Loader/Loader";
import s from "./Partners.module.css";
import { getPartnersData } from "./partnersApi";

import useTelegram from "../../../hooks/useTelegram";

const Partners = () => {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState([]);

  const { tg } = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  useEffect(() => {
    getPartnersData().then((res) => {
      setPartners(res.data.partners);
      setLoading(false);
    });
  }, []);

  var arrInsurancesServices = [];
  var arrDetailingServices = [];
  var arrAutocosmetics = [];
  var arrTireServices = [];
  var arrCarAudioServices = [];
  var arrCarBoostServices = [];
  var arrCarServices = [];
  var arrCarHeadlightServices = [];
  var arrCarOtherServices = [];
  var arrCarTuning = [];
  var arrCarTinting = [];

  var allServices = [
    { "Помощь на дороге, страхование": arrInsurancesServices },
    { Детейлинг: arrDetailingServices },
    { Автокосметика: arrAutocosmetics },
    { Шиномонтаж: arrTireServices },
    { "Автозвук, шумоизоляция": arrCarAudioServices },
    { "Чип-тюнинг": arrCarBoostServices },
    { Автосервис: arrCarServices },
    { Оптика: arrCarHeadlightServices },
    { Автотюнинг: arrCarTuning },
    { "Тонировка, бронирование": arrCarTinting },
    { "Автоаксессуары и прочее": arrCarOtherServices },
  ];

  for (var i = 0; i < partners.length; i++) {
    if (partners[i].partCategory === "Помощь на дороге, страхование") {
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
    } else if (partners[i].partCategory === "Автозвук, шумоизоляция") {
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
    } else if (partners[i].partCategory === "Автотюнинг") {
      arrCarTuning.push({
        name: partners[i].partName,
        descp: partners[i].partDescp,
        link: partners[i].partLink,
        phone: partners[i].partPhone,
        address: partners[i].partAddress,
      });
    } else if (partners[i].partCategory === "Тонировка, пленка") {
      arrCarTinting.push({
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
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default Partners;
