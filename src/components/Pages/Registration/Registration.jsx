import React, {useEffect, useState} from 'react';
import Input from "../../Input";
import {CarOutlined, SnippetsOutlined, UserOutlined} from "@ant-design/icons";
import Select from "../../Select";
import {getCars} from "../../../api/api-cars";

const Registration = () => {

  const [cars, setCars] = useState({});
  const [selectedBrand, setSelectedBrand] = useState('');
  const [models, setModels] = useState([]);



  useEffect(() => {
    getCars().then(res => {
      setCars(res.data)
    })
  }, []);

  useEffect(() => {
    console.log(selectedBrand)

    if (selectedBrand !== '') {
      setModels(cars[selectedBrand])
    } else {
      setSelectedBrand('')
      setModels([])
    }

  }, [selectedBrand]);


  const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    console.log(Array.from(data.entries()))
  }

  return (
    <div className="registration">
      <div className="container">
        <div className="registration__body">
          <form onSubmit={submitForm} className="registration__form">
            <div className="registration__form-body">
              <div className="registration__field">
                <div className="registration__field-input">
                  <Input name={"name"} placeholder={'Как тебя зовут?'} icon={<UserOutlined/>} required={true}/>
                </div>
              </div>
              <div className="registration__field">
                <Select
                  title="Марка авто"
                  name={"brand"}
                  data={cars !== {} && Object.keys(cars)}
                  icon={<CarOutlined/>}
                  onChange={(brand) => setSelectedBrand(brand)}
                />
              </div>
              {models.length ? (
                  <Select
                    title="Модель авто"
                    name={"model"}
                    data={models}
                    icon={<CarOutlined/>}
                  />
                ) : ''}
              <div className="registration__field">
                <div className="registration__field-input">
                  <Input name={"notation"} placeholder={'Примечание'} icon={<SnippetsOutlined/>}/>
                </div>
              </div>
            </div>
            <div className="registration__form-footer">
              <button type="submit" className="registration__form-submit">Отправить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
