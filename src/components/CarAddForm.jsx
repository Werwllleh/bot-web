import React, {useEffect, useState} from 'react';
import Select from "./Select";
import {CarOutlined, NumberOutlined, SnippetsOutlined, CalendarOutlined, CarTwoTone} from "@ant-design/icons";
import {getCars} from "../api/api-cars";
import UploadForm from "./Upload";
import Input from "./Input";

const CarAddForm = ({ index }) => {

  const [cars, setCars] = useState({});
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [models, setModels] = useState([]);
  const [carImages, setCarImages] = useState("");

  const validateCarNumber = new RegExp(
    /^[АВЕКМНОРСТУХ]{1}[0-9]{2}[1-9]{1}[АВЕКМНОРСТУХ]{2}[0-9]{2,3}$/
  );

  // useEffect(() => {
  //   console.log(carImages)
  // }, [carImages]);

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
            icon={<CarTwoTone />}
            value={selectedModel}
            onChange={(model) => setSelectedModel(model)}
          />
        </div>
      ) : ''}
      <div className="registration__field">
        <div className="registration__field-input">
          <Input name={`car_number${index}`} placeholder={'Номер авто'} icon={<NumberOutlined/>} required={true}
                 pattern={validateCarNumber}/>
        </div>
      </div>
      <div className="registration__field">
        <div className="registration__field-input">
          <Input name={`car_year${index}`} type={'number'} placeholder={'Год выпуска авто'} icon={<CalendarOutlined />} required={true}/>
        </div>
      </div>
      <div className="registration__field">
        <UploadForm index={index} data={setCarImages} maxCount={3}/>
      </div>
      <div className="registration__field">
        <div className="registration__field-input">
          <Input name={`notation${index}`} placeholder={'Примечание'} icon={<SnippetsOutlined/>}/>
        </div>
      </div>
    </div>
  );
};

export default CarAddForm;
