import React, {useEffect, useState} from 'react';
import {CarOutlined, NumberOutlined, SnippetsOutlined, CalendarOutlined} from "@ant-design/icons";
import {getCarInfo, getCars} from "../api/api-cars";
import UploadForm from "./Upload";
import Input from "./Input";
import {validateCarNumber} from "../utils/patterns";
import {notification} from "antd";
import { Select } from 'antd';


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

  const [carNumber, setCarNumber] = useState("");
  const [checkCarNumber, setCheckCarNumber] = useState(false);

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');


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

  useEffect(() => {
    console.log(brand)
    if (brand) {
      console.log()
    }


  }, [brand]);

  return (
    <>
      {contextHolder}
      <div className="car-data-fields">
        <div className="registration__field select-antd">
          <Select
            placeholder="Марка авто"
            onChange={selectBrand}
            value={brand}
            options={cars.brands}
          />
          {/*<Select
            required={true}
            title="Марка авто"
            name={`brand${index}`}
            data={cars !== {} && Object.keys(cars)}
            icon={<CarOutlined/>}
            value={selectedBrand}
            onChange={(brand) => setSelectedBrand(brand)}
          />*/}
        </div>
        {brand !== '' && (
          <div className="registration__field select-antd">
            <Select
              placeholder="Модель авто"
              onChange={selectModel}
              value={model}
              options={cars?.models[brand.toUpperCase()]}
            />
            {/*<Select
              required={true}
              title="Модель авто"
              name={`model${index}`}
              data={models}
              icon={<CarOutlined/>}
              value={selectedModel}
              onChange={(model) => setSelectedModel(model)}
            />*/}
          </div>
        )}
        <div className="registration__field">
          <div className="registration__field-input">
            <Input helpMsg={'Русские символы, формат X777XX21 или формат X777XX121'} data={setCarNumber}
                   name={`car_number${index}`} placeholder={'Номер авто'} icon={<NumberOutlined/>} required={true}
                   pattern={validateCarNumber}/>
          </div>
        </div>
        <div className="registration__field">
          <div className="registration__field-input">
            <Input helpMsg={'Укажите год вашего авто'}
                   name={`car_year${index}`} type={'number'} placeholder={'Год выпуска авто'} icon={<CalendarOutlined/>}
                   required={true}/>
          </div>
        </div>
        <div className={`registration__field ${!checkCarNumber ? 'hide' : ''}`}>
          <UploadForm index={index} data={setCarImages} maxCount={4}/>
        </div>
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
