import React, {useEffect, useRef, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import {API_BASE} from "../utils/consts";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



const CarImage = ({ car, openModal, isSelected, onSelect }) => {

  const carButtonAbout = useRef();

  const selectCar = (e) => {
    if (e.target !== carButtonAbout.current) {
      onSelect(car.id);
    }
  };

  return (
    <>
      <div key={car.id} className={`page-cars__car ${isSelected ? 'selected' : ''}`} onClick={(e) => selectCar(e, car.id)}>
        <div className="page-cars__car-body">
          <div className="page-cars__car-images">
            <Swiper
              modules={[Pagination]}
              pagination={{clickable: true}}
              slidesPerView="auto"
              spaceBetween={0}
              loop={true}
              // onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {JSON.parse(car.car_images).map((image) => {
                return (
                  <SwiperSlide key={image}>
                    <img src={`${API_BASE}/car/${image}`} alt="" className="page-cars__car-image"/>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
        <div className={`page-cars__car-bg`}>
          <button ref={carButtonAbout} onClick={openModal}
                  className={`page-cars__car-about`}>Подробнее
          </button>
        </div>
      </div>
    </>
  );
};

export default CarImage;
