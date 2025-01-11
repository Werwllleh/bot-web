import React, {useEffect, useState} from 'react';
import {checkObject} from "../utils/checkObject";
import {Input, notification, Select, Switch} from "antd";
import {useForm} from "../hooks/useForm";
import {sendUserMessage} from "../api/api-users";

const {TextArea} = Input;

const UserAboutInfo = ({data}) => {

  const [message, setMessage] = useState('');

  const initialFormValues = {
    message: "",
  };

  const {values, handleChange, setValues} = useForm(initialFormValues);

  /*useEffect(() => {
    console.log(values.message)
  }, [values]);*/

  const sendMessage = async (e) => {
    e.preventDefault();

    if (checkObject(data) && data?.chat_id && values.message !== '') {
      await sendUserMessage(data.chat_id, values.message)
    }

    setValues({
      message: "",
    })
  }

  return (
    <div className="user-about-info">
      <div className="user-about-info__body">
        <div className="page-admin-users__modal-info">
          {checkObject(data) && data.id}
        </div>
        <div className="user-about-info__cars">
          {checkObject(data) && data?.cars.map(car => {
            return (
              <div key={car.id} className="user-about-info__car">
                <p>{`${car.car_brand} ${car.car_model} ${car.car_year} - ${car.car_number}`}</p>
                <p>{`(${JSON.parse(car.car_images).length})`}</p>
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
      </div>
    </div>
  );
};

export default UserAboutInfo;
