import React, {useEffect, useState} from 'react';
import {checkObject} from "../utils/checkObject";
import {Image, Input, notification, Select, Switch} from "antd";
import {useForm} from "../hooks/useForm";
import {deleteUser, sendUserMessage} from "../api/api-users";
import {useUsersStore} from "../services/store";
import Loader from "./Loader/Loader";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";
import {API_BASE} from "../utils/consts";

import 'swiper/css';
import 'swiper/css/pagination';

const {TextArea} = Input;

const UserAboutInfo = ({data, closeModal}) => {

  const {updateUsers, updateUsersCars} = useUsersStore();


  const [message, setMessage] = useState('');

  const initialFormValues = {
    message: "",
  };

  const {values, handleChange, setValues} = useForm(initialFormValues);

  /*useEffect(() => {
    console.log(values.message)
  }, [values]);*/

  useEffect(() => {
    console.log(data)

  }, [data]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (checkObject(data) && data?.chat_id && values.message !== '') {
      await sendUserMessage(data.chat_id, values.message)
    }

    setValues({
      message: "",
    })
  }

  const deleteUserFunc = async () => {
    if (data?.chat_id) {
      await deleteUser(data.chat_id);
      closeModal();
      await updateUsers();
      await updateUsersCars();
    }
  }

  return (
    <div className="user-about-info">
      <div className="user-about-info__body">
        {checkObject(data) ? (
          <>
            <div className="user-about-info__id">
              USER ID - {data?.id}
            </div>
            <div className="user-about-info__cars">
              {data?.cars?.map(car => {
                const imageList = JSON.parse(car?.car_images).map(image => {
                  return `${API_BASE}/car/${image}`;
                });

                return (
                  <div key={car.id} className="user-about-info__car">
                    <p className="user-about-info__car--info">{`${car.car_brand} ${car.car_model} ${car.car_year}`}</p>
                    {imageList.length ? (
                      <div className="user-about-info__swiper">
                        <Image.PreviewGroup
                          items={imageList}
                          movable={false}
                        >
                          <Swiper
                            modules={[Pagination]}
                            pagination={{clickable: true}}
                            autoHeight={true}
                            slidesPerView="auto"
                            spaceBetween={0}
                          >
                            {imageList.map((image) => {
                              return (
                                <SwiperSlide key={image}>
                                  <Image
                                    className="user-about-info__swiper--image"
                                    src={image}
                                    preview={{
                                      mask: false,
                                      movable: false
                                    }}
                                  />
                                </SwiperSlide>
                              )
                            })}
                          </Swiper>
                        </Image.PreviewGroup>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </div>
            <div className="user-about-info__message">
              <form onSubmit={sendMessage} className="user-about-info__form">
                <TextArea
                  autoSize={true}
                  className="user-about-info__form-text"
                  name="message"
                  placeholder="Текст сообщения"
                  value={values.message ?? ''}
                  onChange={handleChange}
                />
                <button className="style-btn user-about-info__form-submit">Отправить</button>
              </form>
            </div>
            <div className="user-about-info__delete">
              <button onClick={deleteUserFunc} className="style-btn user-about-info__delete_button">Удалить
                пользователя
              </button>
            </div>
          </>
        ) : <Loader/>}
      </div>
    </div>
  );
};

export default UserAboutInfo;
