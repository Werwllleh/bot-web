import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTelegram } from "../../../hooks/useTelegram";
import Accordion from "../../Accordion/Accordion";
import Header from "../../Header/Header";
import s from "./Partners.module.css";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [catNames, setCatNames] = useState([]);

  const { tg } = useTelegram();

  const getData = async () => {
    return await axios.get(
      `https://script.google.com/macros/s/AKfycbx1zqpE9SS0MUTL-GdVqFKAxSQQqz65050GZmoNzmhSGQEDrwjN22iQukmiKoXglktVwQ/exec`
    );
  };

  useEffect(() => {
    tg.expand();
  }, []);

  var factObject = mapObject({}, partners, function (key, item) {
    return [
      item.category,
      {
        name: item.name,
        address: item.address,
        info: item.information,
      },
    ];
  });

  function mapObject(empty, obj, mapFunc) {
    return Object.keys(obj).reduce(function (newObj, key) {
      var kvPair = mapFunc(key, obj[key]);
      newObj[kvPair[0]] = kvPair[1];
      return newObj;
    }, empty);
  }

  useEffect(() => {
    getData().then((res) => {
      setPartners(res.data.partners);
    });
  }, []);

  // setCatNames(Object.keys(factObject));

  console.log(factObject);

  return (
    <div className={s.partners_body}>
      <Header title={"Партнеры клуба"} />
      <div className={s.content_body}>
        <Accordion category={"weewg"} />
        <Accordion category={"rthr"} />
        <Accordion category={"uyiy7u"} />
      </div>
    </div>
  );
};

export default Partners;
