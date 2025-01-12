import React, {useEffect, useState} from 'react';
import {Image} from "antd";
import {CMS} from "../utils/consts";
import {Link} from "react-router-dom";

import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";
import {EffectFade} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const AttributeItem = ({data}) => {

  const [images, setImages] = useState([]);

  useEffect(() => {

    const imagesData = data.images;
    const imagesLinks = [];

    imagesData.map(image => {
      imagesLinks.push(CMS + image.formats.small.url)
    })

    setImages(imagesLinks);

  }, [data])

  useEffect(() => {
    // console.log(images)
  }, [images])



  return (
    <Link
      className="product"
      to={`/attributes/${data.slug}`}
      key={data.documentId}
    >
      <div className="product__body">
        <div className="product__images">
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            effect="fade"
            pagination={{clickable: true}}
            autoHeight={false}
            slidesPerView="auto"
            spaceBetween={0}
            loop={images.length > 1}
            autoplay={{
              delay: Math.floor(4000 + Math.random() * 4000), // Рандомное значение от 1500 до 3000
              disableOnInteraction: true, // Автоплей будет отключаться при взаимодействии
            }}
          >
            {images.map((image) => {
              return (
                <SwiperSlide key={image}>
                  <Image
                    className="product__image"
                    src={image}
                    preview={false}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
        <h4 className="product__title">{`${data.type} ${data.title}`}</h4>
      </div>
    </Link>
  );
};

export default AttributeItem;
