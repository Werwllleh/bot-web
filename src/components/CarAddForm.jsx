import React, {useEffect, useRef, useState} from 'react';
import Select from "./Select";
import {CarOutlined, NumberOutlined, SnippetsOutlined, CalendarOutlined, CarTwoTone} from "@ant-design/icons";
import {getCarInfo, getCars} from "../api/api-cars";
import UploadForm from "./Upload";
import Input from "./Input";
import {validateCarNumber} from "../utils/patterns";
import {notification} from "antd";

const CarAddForm = ({index}) => {

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    if (type === 'success') {
      api[type]({
        message: message,
        description: description
      });
    }
    if (type === 'error') {
      api[type]({
        message: message,
        description: description
      });
    }
  };
  const [cars, setCars] = useState({});
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState([]);
  const [carImages, setCarImages] = useState("");

  const [carNumber, setCarNumber] = useState("");
  const [checkCarNumber, setCheckCarNumber] = useState(false);


  useEffect(() => {
    if (carNumber.length >= 8 && carNumber.length <= 9) {
      getCarInfo(carNumber).then((res) => {
        if (res.data) {
          setCheckCarNumber(false)
          openNotificationWithIcon('error', 'Авто с данным номером уже зарегистрирован!');
        } else {
          setCheckCarNumber(true)
        }
      })
    } else {
      setCheckCarNumber(false)
    }
  }, [carNumber]);

  useEffect(() => {
    getCars().then(res => {
      setCars(res.data)
    })
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      setSelectedModel(''); // Обнуляем выбранную модель
      setModels(cars[selectedBrand] || []);

    } else {
      setModels([]); // Если марка не выбрана, очищаем список моделей
    }
  }, [selectedBrand, cars]);

  return (
    <>
      {contextHolder}
      <div className="car-data-fields">
        <div className="registration__field">
          <Select
            required={true}
            title="Марка авто"
            name={`brand${index}`}
            data={cars !== {} && Object.keys(cars)}
            icon={<CarOutlined/>}
            value={selectedBrand}
            onChange={(brand) => setSelectedBrand(brand)}
          />
        </div>
        {models?.length ? (
          <div className="registration__field">
            <Select
              required={true}
              title="Модель авто"
              name={`model${index}`}
              data={models}
              icon={<CarTwoTone/>}
              value={selectedModel}
              onChange={(model) => setSelectedModel(model)}
            />
          </div>
        ) : ''}
        <div className="registration__field">
          <div className="registration__field-input">
            <Input data={setCarNumber} name={`car_number${index}`} placeholder={'Номер авто'} icon={<NumberOutlined/>} required={true} pattern={validateCarNumber}/>
          </div>
        </div>
        <div className="registration__field">
          <div className="registration__field-input">
            <Input name={`car_year${index}`} type={'number'} placeholder={'Год выпуска авто'} icon={<CalendarOutlined/>}
                   required={true}/>
          </div>
        </div>
        {checkCarNumber && (
          <div className="registration__field">
            <UploadForm index={index} data={setCarImages} maxCount={3}/>
          </div>
        )}
        <div className="registration__field">
          <div className="registration__field-input">
            <Input name={`notation${index}`} placeholder={'Примечание'} icon={<SnippetsOutlined/>}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarAddForm;
