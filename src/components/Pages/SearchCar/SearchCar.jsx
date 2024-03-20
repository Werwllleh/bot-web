import React, {useEffect, useState} from "react";
import useTelegram from "../../../hooks/useTelegram";
import s from "./SearchCar.module.css";
import {Image} from "antd";
import {SITE} from "../../../utils/consts";

import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/parallax';

const SearchCar = ({data}) => {

  const [searcheble, setSearcheble] = useState('');
  const [foundCars, setFoundCars] = useState([]);

  const onSearcheble = (e) => {
    setSearcheble(e.target.value.toUpperCase());
  };

  useEffect(() => {
    setFoundCars(data.filter(user => searcheble.length && user?.carGRZ?.startsWith(searcheble) || user?.carGRZ?.includes(searcheble)))
  }, [searcheble]);

  const {tg} = useTelegram();

  let patternCarNum = new RegExp(
    /^[АВЕКМНОРСТУХ]{1}[0-9]{3}[АВЕКМНОРСТУХ]{2}[0-9]{2,3}$/
  );

  useEffect(() => {
    tg.expand();
  }, []);

  const isRussian = (str) => {
    return /[а-яё0-9]/i.test(str);
  }

  return (
    <>
      <div className={s.search__body}>
        <div className={s.search__header}>
          <h1 className={s.title}>Поиск авто</h1>
          <input
            maxLength={9}
            className={`${s.input} ${!isRussian(searcheble) && searcheble.length ? s.error : ''}`}
            type="text"
            placeholder="Введи номер авто"
            value={searcheble}
            onChange={onSearcheble}
          />
          {foundCars.length && searcheble.length ? (
            <div className={s.cards__count}>
              {`Количество найденных авто: ${foundCars.length}`}
            </div>
          ) : null}
        </div>
        {
          foundCars.length && searcheble.length ? (
            <div className={s.cards}>
              <Swiper
                centeredSlides={true}
                breakpoints={{
                  320: {
                    slidesPerView: 1.25,
                    spaceBetween: 20
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
                                src: SITE + `api/image/` + card.carImage,
                              }}
                              width={300}
                              src={
                                SITE + `api/image/small/` +
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
                                  Примечание: <span>{card.carNote}</span>
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
          ) : !foundCars.length && searcheble.length ? (
            <div className={s.notFoundImg}>
              <img src={SITE + "api/icons/404.png"} alt="Not found"/>
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
