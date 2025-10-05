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
import toast from "react-hot-toast";

import 'swiper/css';
import 'swiper/css/pagination';

const {TextArea} = Input;

const UserAboutInfo = ({data, closeModal}) => {

  const {updateUsers, updateUsersCars} = useUsersStore();

  // cars, message, actions
  const [viewType, setViewType] = useState('cars')

  const [message, setMessage] = useState('');

  const initialFormValues = {
    message: "",
  };

  const {values, handleChange, setValues} = useForm(initialFormValues);

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
      const res =  await deleteUser(data.chat_id);

      if (res.status === 200) {
        toast.success(res.data);
        closeModal();
      } else {
        toast.error(res.data);
      }

      await updateUsers();
      await updateUsersCars();
    }
  }

  const changeViewType = (value) => {
    setViewType(value)
  }

  return (
    <div className="user-about-info">
      <div className="user-about-info__body">
        {checkObject(data) ? (
          <>
            <div className="user-about-info__actions">
              <button onClick={() => changeViewType('cars')} className={`${viewType === 'cars' ? 'active' : ''}`}>Авто</button>
              <button onClick={() => changeViewType('message')} className={`${viewType === 'message' ? 'active' : ''}`}>Сообщение</button>
              <button onClick={() => changeViewType('actions')} className={`${viewType === 'actions' ? 'active' : ''}`}>Действия</button>
            </div>
            <div className="user-about-info__view">
              {viewType === 'cars' && (
                <>
                  <div className="user-about-info__id">
                    USER ID - {data?.id}
                  </div>
                  <div className="user-about-info__cars">
                    {data?.cars?.map(car => {
                      const imageList = JSON.parse(car?.car_images).map(image => {
                        return `${API_BASE}/car/${image}`;
                      });

                      if (!imageList.length) return;

                      return (
                        <div key={car.id} className="user-about-info__car">
                          {imageList.length ? (
                            <div className="user-about-info__swiper">
                              <Image.PreviewGroup
                                items={imageList}
                                movable={false}
                              >
                                <Swiper
                                  observer={true}
                                  observeParents={true}
                                  modules={[Pagination]}
                                  pagination={{clickable: true}}
                                  slidesPerView={'auto'}
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
                          <p className="user-about-info__car--info">
                            {`${car.car_brand} ${car.car_model} ${car.car_year}`}
                            <br/>
                            <b>{car.car_number}</b>
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
              {viewType === 'message' && (
                <>
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
                </>
              )}
              {viewType === 'actions' && (
                <>
                  <div className="user-about-info__delete">
                    <button onClick={deleteUserFunc} className="style-btn user-about-info__delete_button">Удалить
                      пользователя
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : <Loader/>}
      </div>
    </div>
  );
};

export default UserAboutInfo;
