import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {getCurrentAttribute} from "../../../api/api-attributes";
import Loader from "../../Loader/Loader";
import {checkObject} from "../../../utils/checkObject";
import {Image} from "antd";

import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";
import {EffectFade} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import {CMS} from "../../../utils/consts";

const AttributeDetail = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState('');

  const [attributeData, setAttributeData] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {

    if (checkObject(attributeData)) {
      const imagesData = attributeData.images;
      const imagesLinks = [];

      imagesData.map(image => {
        imagesLinks.push(CMS + image.formats.small.url)
      })

      setImages(imagesLinks);
    }

  }, [attributeData])

  useEffect(() => {
    setSlug(location.pathname && location.pathname.split("/attributes/")[1])
  }, [location]);

  useEffect(() => {
    if (slug !== '') {
      getCurrentAttribute(slug)
        .then((response) => {
          if (response.status === 200) {
            setAttributeData(response.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(true);
        })
    }

  }, [slug]);


  return (
    <div className="page-attribute-detail">
      <div className="container">
        <div className="page-attribute-detail__body">
          {loading && <Loader/>}
          {!loading && checkObject(attributeData) && (
            <div className="page-attribute-detail__about">
              <div className="page-attribute-detail__images">
                <Image.PreviewGroup
                  items={images}
                  movable={false}
                >
                  <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    effect="fade"
                    pagination={{clickable: true}}
                    autoHeight={true}
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
                            src={image}
                            preview={{
                              mask: false,
                              movable: false,
                              toolbarRender: () => null,
                              /*imageRender: () => (
                                <div className="product__image-preview">
                                  <img src={image} alt=""/>
                                </div>
                              )*/
                            }}
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </Image.PreviewGroup>
              </div>
              <div className="page-attribute-detail__info">
                <h1 className="page-attribute-detail__info-title h1t">
                  <span className="page-attribute-detail__info-title-type">{attributeData.type}</span>
                  <span className="page-attribute-detail__info-title-title">{attributeData.title}</span>
                </h1>
                <p className="page-attribute-detail__info-description">{attributeData.description}</p>
              </div>
              <div className="page-attribute-detail__specification">
                <div className="page-attribute-detail__specification-row">
                  <p className="page-attribute-detail__specification-name">Стоимость</p>
                  <span className="page-attribute-detail__specification-value">{attributeData.price} ₽</span>
                </div>
              </div>
            </div>
          )}
          <div className="page-attribute-detail__note">
            По вопросам приобретения писать <Link className="page-attribute-detail__note-link" to="https://t.me/c/2219612991/118">админам</Link>
          </div>
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="page-attribute-detail__backButton style-btn">Назад</button>
    </div>
  );
};

export default AttributeDetail;
