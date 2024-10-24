import React, {useRef, useState} from 'react';
import Input from "../../Input";
import {UserOutlined} from "@ant-design/icons";
import CarAddForm from "../../CarAddForm";


const Registration = () => {

  const form = useRef();
  const [cars, setCars] = useState([{}]); // Начинаем с одной пустой формы

  const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    console.log(Array.from(data.entries()))
  }

  const handleAddCar = (index) => {

    const data = new FormData(form.current);
    console.log(Array.from(data.entries()))

    const newCars = [...cars];
    newCars.splice(index + 1, 0, {}); // Вставляем новую форму после текущей
    setCars(newCars);
  };

  const handleRemoveCar = (index) => {
    if (cars.length > 1) {
      const newCars = cars.filter((_, i) => i !== index); // Удаляем форму по индексу
      setCars(newCars);
    }
  };

  return (
    <div className="registration">
      <div className="container">
        <div className="registration__body">
          <form ref={form} onSubmit={submitForm} className="registration__form">
            <div className="registration__form-body">
              <div className="registration__field">
                <div className="registration__field-input">
                  <Input name={"name"} placeholder={'Как тебя зовут?'} icon={<UserOutlined/>} required={true}/>
                </div>
              </div>
              {cars.map((_, index) => (
                <div key={index} className="registration__car-block">
                  <CarAddForm index={index > 0 ? index : ''} key={index} />
                  <div className="registration__car-block-controls">
                    <button type="button" className="registration__car-block-controls-add" onClick={() => handleAddCar(index)}>Добавить еще авто</button>
                    {index !== 0 && (
                      <button type="button" className="registration__car-block-controls-delete" onClick={() => handleRemoveCar(index)}>Удалить авто</button>
                    )}
                  </div>
                </div>
              ))}
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
