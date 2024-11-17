import React, {useRef} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectFade} from 'swiper/modules';
import {Pagination, Autoplay} from "swiper/modules";
import {API_BASE} from "../utils/consts";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';



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
          <div className={`page-cars__car-images`}>
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              effect="fade"
              pagination={{clickable: true}}
              slidesPerView="auto"
              spaceBetween={0}
              loop={JSON.parse(car.car_images).length > 1}
              autoplay={{
                delay: Math.floor(4000 + Math.random() * 4000), // Рандомное значение от 1500 до 3000
                disableOnInteraction: true, // Автоплей будет отключаться при взаимодействии
              }}

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
