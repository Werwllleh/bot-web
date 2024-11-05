import React, {useRef, useState} from 'react';
import Input from "../../Input";
import {UserOutlined} from "@ant-design/icons";
import CarAddForm from "../../CarAddForm";
import {useUsersStore} from "../../../services/store";
import {createUser} from "../../../api/users";


const Registration = () => {

  const form = useRef();
  const [cars, setCars] = useState([{}]); // Начинаем с одной пустой формы
  const currentUser = useUsersStore((state) => state.currentUser);

  const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const formData = Array.from(data.entries());

    const groupedData = { user: {}, cars: [] };

    // Основная логика для группировки
    formData.forEach(([key, value]) => {
      const match = key.match(/(\D+)(\d*)$/); // Разделение имени ключа и номера
      const propName = match[1]; // Название свойства
      const carIndex = match[2] ? Number(match[2]) - 1 : 0; // Индекс машины (сдвинут на 1 для массива)

      // Если индекс 0, значит это пользовательские данные
      if (carIndex === 0 && !["brand", "model", "car_number", "avatar", "car_year", "images", "notation"].includes(propName)) {
        groupedData.user[propName] = value;
        groupedData.user["chatId"] = currentUser?.id;
      } else {
        if (!["avatar"].includes(propName)) {
          if (!groupedData.cars[carIndex]) groupedData.cars[carIndex] = {};
          groupedData.cars[carIndex][propName] = value;
        }
      }
    });

    if (groupedData) {
      groupedData.cars.map(item => {
        item.images = JSON.stringify(item.images.split(','));
      })
      // console.log(JSON.stringify(['image1.jpg', 'image2.jpg']))
      console.log(groupedData);

      createUser(groupedData).then(res => {
        console.log(res.status)
      })

    }

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
                  <CarAddForm index={index > 0 ? index + 1 : ''} key={index} />
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
