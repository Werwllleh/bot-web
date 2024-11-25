import React, {useEffect, useState} from 'react';
import {CarOutlined, NumberOutlined, SnippetsOutlined, CalendarOutlined, UserOutlined} from "@ant-design/icons";
import {getCarInfo, getCars} from "../api/api-cars";
import UploadForm from "./Upload";
import { Input } from 'antd';
import {validateCarNumber, validateName} from "../utils/patterns";
import {notification} from "antd";
import {Select} from 'antd';


const CarAddForm = ({info, index, status}) => {

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


  const [checkCarNumber, setCheckCarNumber] = useState(false);


  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [carYear, setCarYear] = useState(0);
  const [carNote, setCarNote] = useState('');


  /*useEffect(() => {
    if (carNumber.length >= 8 && carNumber.length <= 9 && validateCarNumber.test(carNumber.toUpperCase())) {
      getCarInfo(carNumber).then((res) => {
        if (res.data !== '') {
          setCheckCarNumber(false)
          openNotificationWithIcon('error', 'Авто с данным номером уже зарегистрирован!');
        } else {
          setCheckCarNumber(true)
        }
      })
    } else {
      setCheckCarNumber(false)
    }
  }, [carNumber]);*/

  useEffect(() => {
    getCars().then(res => {
      setCars(res.data)
    })
  }, []);

  const selectBrand = (value) => {
    setBrand(value)
    if (model) {
      setModel('')
    }
  }

  const selectModel = (value) => {
    setModel(value)
  }


  return (
    <>
      {contextHolder}
      <div className="car-data-fields">
        <div className="registration__field">
          <div className="registration__field-icon"><CarOutlined/></div>
          <div className="registration__field-select select-antd">
            <Select
              showSearch
              placeholder="Марка авто"
              onChange={selectBrand}
              value={brand === '' ? null : brand}
              options={cars.brands}
            />
          </div>
        </div>
        {brand !== '' && (
          <div className="registration__field">
            <div className="registration__field-icon"><CarOutlined/></div>
            <div className="registration__field-select select-antd">
              <Select
                showSearch
                placeholder="Модель авто"
                onChange={selectModel}
                value={model === '' ? null : model}
                options={cars?.models[brand.toUpperCase()]}
              />
            </div>
          </div>
        )}
        <div className="registration__field">
          <div className="registration__field-icon"><NumberOutlined/></div>
          <div className="registration__field-input input-antd">
            <Input
              required={true}
              className={`${carNumber !== '' && !validateCarNumber.test(carNumber.toUpperCase()) ? 'error' : '' }`}
              name="carNumber"
              placeholder="Номер авто"
              value={carNumber === '' ? null : carNumber}
              onChange={(e) => setCarNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="registration__field">
          <div className="registration__field-icon"><CalendarOutlined /></div>
          <div className="registration__field-input input-antd">
            <Input
              required={true}
              className={`${carYear === 0 ? '' : Number(carYear) < 1800 || Number(carYear) > new Date().getFullYear() ? 'error' : ''}`}
              name="carYear"
              placeholder="Год выпуска авто"
              value={carYear === 0 ? null : carYear}
              onChange={(e) => setCarYear(e.target.value)}
              type="number"
            />
          </div>
        </div>
        <div className="registration__field">
          <div className="registration__field-upload">
            <UploadForm data={setCarImages} maxCount={4}/>
          </div>
        </div>
        <div className="registration__field">
          <div className="registration__field-icon"><SnippetsOutlined/></div>
          <div className="registration__field-input input-antd">
            <Input
              name="carNote"
              placeholder="Примечание"
              value={carNote === '' ? null : carNote}
              onChange={(e) => setCarNote(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CarAddForm;
