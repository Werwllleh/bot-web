import React, {useCallback, useEffect, useState} from "react";
import useTelegram from "../../../hooks/useTelegram";
import s from "./SearchCar.module.css";
import {Image} from "antd";
import {API} from "../../../utils/consts";

import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/parallax';
import Header from "../../Header/Header";
import {debounce} from "lodash";

const SearchCar = ({data}) => {

  const [searchable, setSearchable] = useState('');
  const [foundCars, setFoundCars] = useState([]);

  const onSearchable = (e) => {
    setSearchable(e.target.value);
  };

  useEffect(() => {
    setFoundCars(data.filter(user =>
      searchable.length &&
      (user?.carGRZ?.startsWith(searchable) || user?.carGRZ?.includes(searchable))
    ));
  }, [searchable, data]);

  const { tg } = useTelegram();

  useEffect(() => {
    tg.expand();
  }, [tg]);

  const isRussian = (str) => {
    return /[а-яё0-9]/i.test(str);
  }

  return (
    <>
      <div className={s.search__body}>
        <div className={s.search__header}>
          <Header title={"Поиск авто"}/>
          <input
            maxLength={9}
            className={`${s.input} ${!isRussian(searchable) && searchable.length ? s.error : ''}`}
            type="text"
            placeholder="Введи номер авто"
            value={searchable}
            onChange={onSearchable}
          />
          {foundCars.length && searchable.length ? (
            <div className={s.cards__count}>
              {`Количество найденных авто: ${foundCars.length}`}
            </div>
          ) : null}
        </div>
        {
          foundCars.length && searchable.length ? (
            <div className={s.cards}>
              <Swiper
                centeredSlides={true}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                    spaceBetween: 10
                  },
                  450: {
                    slidesPerView: 1.5,
                    spaceBetween: 30
                  },
                  768: {
                    slidesPerView: 2.5,
                    spaceBetween: 30
                  },
                  1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 30
                  },
                  1280: {
                    slidesPerView: 3.9,
                    spaceBetween: 30
                  },
                  1440: {
                    slidesPerView: 4.3,
                    spaceBetween: 30
                  },
                  1600: {
                    slidesPerView: 5.6,
                    spaceBetween: 30
                  },
                }}
              >
                {
                  foundCars.map((card) => {
                    return (
                      <SwiperSlide key={card.chatId}>
                        <div className={s.card}>
                          <div className={s.image_body}>
                            <Image
                              preview={{
                                src: API + `api/image/` + card.carImage,
                              }}
                              width={300}
                              src={
                                API + `api/image/small/` +
                                card.carImage +
                                "_" +
                                "small.jpeg"
                              }
                              alt=""
                            />
                          </div>
                          <div className={s.textBody}>
                            <ul className={s.list}>
                              <li>Владелец: <span>{card.userName}</span></li>
                              <li>Авто: <span>{card.carbrand} {card.carModel}</span></li>
                              <li>Гос.номер: <span>{card.carGRZ}</span></li>
                              <li>Год выпуска: <span>{card.carYear}</span></li>
                              {card.carNote ? (
                                <li>
                                  Примечание: <br/> <span>{card.carNote}</span>
                                </li>
                              ) : null}
                            </ul>
                          </div>
                        </div>
                      </SwiperSlide>
                    )
                  })
                }
              </Swiper>
            </div>
          ) : !foundCars.length && searchable.length ? (
            <div className={s.notFoundImg}>
              <img src={API + "api/icons/404.png"} alt="Not found"/>
              <p>Авто не найдено</p>
            </div>
          ) : (
            <></>
          )
        }
      </div>
    </>
  );
};

export default SearchCar;
