import React, {useEffect, useState} from 'react';
import {DatePicker, Input, Select, Watermark, ConfigProvider, Switch, Button} from "antd";
const { TextArea } = Input;
import Header from "../../Header/Header";
import ruRu from 'antd/locale/ru_RU';
import {places} from "../../../utils/consts";
import {setLocation} from "../../../utils/locationUtils";


const LocationPage = () => {

  const [switchChoose, setSwitchChoose] = useState(false);
  const [placeMeet, setPlaceMeet] = useState('');
  const [dateMeet, setDateMeet] = useState('');
  const [textMeet, setTextMeet] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');


  const onSwitch = (checked) => {
    setSwitchChoose(checked)
  };

  const onTextChange = (e) => {
    setTextMeet(e.target.value);
  }

  const placeChange = (value) => {
    setPlaceMeet(value);
  };

  const dateChange = (date, dateString) => {
    setDateMeet(dateString);
    console.log(date, dateString);
  };

  const onLatitude = (e) => {
    setLatitude(e.target.value)
  };
  const onLongitude = (e) => {
    setLongitude(e.target.value)
  };

  useEffect(() => {
    if (switchChoose === false) {
      setPlaceMeet('')
    }
    console.log(switchChoose)

  }, [switchChoose]);

  const sendObject = {
    date: dateMeet,
    place: placeMeet,
    text: textMeet,
    coordinates: [latitude, longitude]
  }

  const save = () => {
    setLocation('gogo')
      .then(data => console.log(data))
    console.log(sendObject)
  }




  return (
    <div className="container">
      <div className="location-page">
        <div className="admin-page__bg">
          <Watermark content="vagcheb"/>
        </div>
        <Header title={"Место встречи"}/>
        <div className="location-page__body">
          <Switch className={"location-page__switch"} value={switchChoose} onChange={onSwitch} checkedChildren="Указать место" unCheckedChildren="Сбросить" defaultChecked />
          <div className={`location-page__options ${switchChoose ? 'active' : ''}`}>
            <ConfigProvider locale={ruRu}>
              <DatePicker rootClassName={"location-page__date"} onChange={dateChange} showTime/>
            </ConfigProvider>
            <Select
              className={"location-page__select"}
              placeholder={"Место"}
              onChange={placeChange}
              options={places}
            />
          </div>
          {placeMeet === 'other' && (
            <div className="location-page__coordinates">
              <Input onChange={onLatitude} placeholder="Широта" allowClear />
              <Input onChange={onLongitude} placeholder="Долгота" allowClear />
            </div>
          )}
          <TextArea rootClassName={"location-page__text"} onChange={onTextChange} placeholder="Текст уведомления" allowClear />
          <Button type="primary" onClick={save}>Сохранить</Button>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
