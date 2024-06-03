import React, {useState} from 'react';
import {DatePicker, Input, Select, Watermark, ConfigProvider} from "antd";
const { TextArea } = Input;
import Header from "../../Header/Header";
import ruRu from 'antd/locale/ru_RU';
import {places} from "../../../utils/consts";


const NotifyPage = () => {

  const [typeNotify, setTypeNotify] = useState('');
  const [textNotify, setTextNotify] = useState('');
  const [placeNotify, setPlaceNotify] = useState('');
  const [dateNotify, setDateNotify] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');



  const typeChange = (value) => {
    setTypeNotify(value);
  };

  const onTextChange = (e) => {
    setTextNotify(e.target.value);
  }

  const placeChange = (value) => {
    setPlaceNotify(value);
  };

  const dateChange = (date, dateString) => {
    setDateNotify(dateString);
    console.log(date, dateString);
  };

  const onLatitude = (e) => {
    setLatitude(e.target.value)
  };
  const onLongitude = (e) => {
    setLongitude(e.target.value)
  };



  return (
    <div className="container">
      <div className="notifications-page">
        <div className="admin-page__bg">
          <Watermark content="vagcheb"/>
        </div>
        <Header title={"Уведомления"}/>
        <div className="notification-add">
          <div className="notification-add__select">
            <Select
              placeholder="Тип уведомления"
              onChange={typeChange}
              options={[
                {
                  value: 'meet',
                  label: 'Встреча',
                },
                {
                  value: 'mailing',
                  label: 'Рассылка',
                }
              ]}
            />
          </div>
          <div className="notification-add__input">
            <TextArea onChange={onTextChange} placeholder="Текст уведомления" allowClear />
          </div>
          <div className="notification-add__flex">
            <div className="notification-new__date">
              <ConfigProvider locale={ruRu}>
                <DatePicker onChange={dateChange} showTime/>
              </ConfigProvider>
            </div>
            <div className="notification-add__select">
              <Select
                placeholder="Место"
                onChange={placeChange}
                options={places}
              />
            </div>
          </div>
          {placeNotify === 'other' && (
            <div className="notification-add__input coordinates">
              <Input onChange={onLatitude} placeholder="Широта" allowClear />
              <Input onChange={onLongitude} placeholder="Долгота" allowClear />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotifyPage;
