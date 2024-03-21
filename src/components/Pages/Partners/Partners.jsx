import React, {useEffect, useState} from "react";
import Accordion from "../../Accordion/Accordion";
import Header from "../../Header/Header";
import Loader from "../../Loader/Loader";
import s from "./Partners.module.css";

import useTelegram from "../../../hooks/useTelegram";


const Partners = ({data}) => {

  const {tg} = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);


  return (
    <div className={s.partners_body}>
      <Header title={"Партнеры клуба"}/>
      <div className={s.content_body}>
        <div className="content_accordion">
          <Accordion data={data}/>
        </div>
      </div>
    </div>
  );
};

export default Partners;
