import React, {useEffect, useState} from 'react';
import Select from "./Select";
import {CarOutlined, NumberOutlined, SnippetsOutlined, CalendarOutlined} from "@ant-design/icons";
import {getCarInfo, getCars} from "../api/api-cars";
import UploadForm from "./Upload";
import Input from "./Input";
import {validateCarNumber} from "../utils/patterns";
import {notification} from "antd";

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

  /*useEffect(() => {
    console.log(info)
  }, [info]);*/

  useEffect(() => {
    status(checkCarNumber);
  }, [checkCarNumber]);


  useEffect(() => {
    if (carNumber.length >= 8 && carNumber.length <= 9 && validateCarNumber.test(carNumber.toUpperCase())) {
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
              icon={<CarOutlined/>}
              value={selectedModel}
              onChange={(model) => setSelectedModel(model)}
            />
          </div>
        ) : ''}
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
