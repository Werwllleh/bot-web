import React, {useEffect, useState} from 'react';
import {CarOutlined, NumberOutlined, SnippetsOutlined, CalendarOutlined} from "@ant-design/icons";
import {getCarInfo, getCars} from "../api/api-cars";
import UploadForm from "./Upload";
import { Input } from 'antd';
import {validateCarNumber, validateName} from "../utils/patterns";
import {Select} from 'antd';
import dayjs from "dayjs";


const CarAddForm = ({data}) => {

  const [cars, setCars] = useState({});

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [carYear, setCarYear] = useState(0);
  const [carImages, setCarImages] = useState([]);
  const [carNote, setCarNote] = useState('');


  useEffect(() => {
    getCars().then(res => {
      setCars(res.data)
    })
  }, []);

  const selectBrand = (value) => {
    setBrand(value)
    setModel('')
  }

  const selectModel = (value) => {
    setModel(value)
  }

  useEffect(() => {
    data({
      brand: brand,
      model: model,
      carNumber: carNumber,
      carYear: carYear,
      images: carImages,
      carNote: carNote,
    })
  }, [brand, model, carNumber, carYear, carImages, carNote]);


  return (
    <>
      <div className="car-data-fields">
        <div className="registration__field">
          <div className="registration__field-icon"><CarOutlined/></div>
          <div className="registration__field-select select-antd">
            <input name="brand" className="select-antd__value" type="text" defaultValue={brand} required/>
            <Select
              // showSearch
              optionFilterProp="label"
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
              <input name="model" className="select-antd__value" type="text" defaultValue={model} required/>
              <Select
                // showSearch
                optionFilterProp="label"
                placeholder="Модель авто"
                value={model === '' ? null : model}
                onChange={selectModel}
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
              className={`${carYear === 0 ? '' : Number(carYear) < 1800 || Number(carYear) > dayjs().year() ? 'error' : ''}`}
              name="carYear"
              placeholder="Год выпуска авто"
              value={carYear === 0 ? null : carYear}
              onChange={(e) => setCarYear(e.target.value)}
              type="tel"
            />
          </div>
        </div>
        <div className="registration__field">
          <div className="registration__field-upload">
            <UploadForm images={setCarImages} maxCount={4}/>
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
