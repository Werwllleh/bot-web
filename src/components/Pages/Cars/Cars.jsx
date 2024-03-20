import React, {useEffect} from "react";
import useTelegram from "../../../hooks/useTelegram";
import s from "./Cars.module.css";

import {ImageList} from "@mui/material";
import {Image} from "antd";
import Header from "../../Header/Header";
import {SITE} from "../../../utils/consts";

const Cars = ({data}) => {

  const {tg} = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  return (
    <div className={s.cars_body}>
      <Header title={"Автомобили нашего клуба"}/>
      <div className={s.image_grid}>
        <ImageList
          variant="standart"
          cols={3}
          gap={8}
          style={{alignItems: "center"}}
        >
          {data.map((user) => (
            <Image
              preview={{
                // src: SITE + "api/image/" + user.carImage,
                mask: 'Просмотр',
                imageRender: () => (
                  <div className={s.preview__block}>
                    <div className={s.preview__image}>
                      <img src={`${SITE}api/image/${user.carImage}`} alt=""/>
                    </div>
                    <div className={s.preview__info}>
                      <ul className={s.preview__list}>
                        <li>
                          <span>Владелец:</span>
                          <h5>{`${user.userName.toUpperCase()}`}</h5>
                        </li>
                        <li>
                          <span>Авто:</span>
                          <h5>{`${user.carbrand.toUpperCase()} ${user.carModel.toUpperCase()}`}</h5>
                        </li>
                        <li>
                          <span>Гос.номер:</span>
                          <h5>{`${user.carGRZ}`}</h5>
                        </li>
                        <li>
                          <span>Год выпуска:</span>
                          <h5>{`${user.carYear}`}</h5>
                        </li>
                        {user.carNote ? (
                          <li>
                            <span>Примечание:</span>
                            <h5>{`${user.carNote}`}</h5>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                ),
              }}
              style={{
                objectFit: "cover",
                height: "150px",
                maxWidth: "150px",
              }}
              loading="lazy"
              key={user.chatId}
              onError={(e) => {
                e.target.src = `${SITE}api/icons/not_found.png`
              }}
              src={`${SITE}api/image/small/${user.carImage}_small.jpeg`}
              alt={`${user.carbrand} ${user.carModel}`}
            />
          ))}
        </ImageList>
      </div>
    </div>
  );
};

export default Cars;
