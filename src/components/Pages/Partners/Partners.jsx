import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTelegram } from "../../../hooks/useTelegram";
import Accordion from "../../Accordion/Accordion";
import Header from "../../Header/Header";
import s from "./Partners.module.css";

const Partners = () => {
  const [partners, setPartners] = useState([]);

  const { tg } = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://script.google.com/macros/s/AKfycbx1zqpE9SS0MUTL-GdVqFKAxSQQqz65050GZmoNzmhSGQEDrwjN22iQukmiKoXglktVwQ/exec`
      )
      .then((res) => {
        setPartners(res.data.partners);
      });
  }, []);

  // console.log(partners);

  /* for (let i = 0; i < partners.length; i++) {
    for (let key in partners[i]) {
      if (partners[i].hasOwnProperty.call(partners[i], key)) {
        const category = partners[i][key];
        console.log(category);
      }
    }
  } */

  for (let i = 0; i < partners.length; i++) {
    // console.log(partners[i]);
    let vals = Object.values(partners[i]);
    for (let k = 0; k < vals; k++) {
      console.log(k);
    }
  }

  return (
    <div className={s.partners_body}>
      <Header title={"Партнеры клуба"} />
      <div className={s.content_body}>
        <Accordion />
      </div>
    </div>
  );
};

export default Partners;
