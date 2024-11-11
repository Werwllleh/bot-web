import React, {useEffect, useRef, useState} from 'react';
import Input from "../../Input";
import {UserOutlined} from "@ant-design/icons";
import CarAddForm from "../../CarAddForm";
import {useUsersStore} from "../../../services/store";
import {createUser, getUserInfo} from "../../../api/users";
import {notification} from "antd";
import {validateCarNumber, validateName} from "../../../utils/patterns";
import {deleteCarImage, getCarInfo} from "../../../api/api-cars";
import {useNavigate} from "react-router-dom";


const Registration = () => {

  const form = useRef();
  const [cars, setCars] = useState([{}]); // Начинаем с одной пустой формы
  const currentUser = useUsersStore((state) => state.currentUser);
  const [formValidate, setFormValidate] = useState(true)

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

  const navigate = useNavigate();

  const handleAddCar = (index) => {
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

  const validateRegistrationForm = () => {
    const regForm = form.current;
    let delay = 0; // Задержка для первого уведомления

    const inputs = regForm.querySelectorAll('input');

    const addErrorClass = (input) => {
      if (!input.classList.contains('error')) {
        input.classList.add('error');
      }
    };

    const removeErrorClass = (input) => {
      if (input.classList.contains('error')) {
        input.classList.remove('error');
      }
    };

    const showNotification = (type, message, description, delay) => {
      setTimeout(() => {
        openNotificationWithIcon(type, message, description);
      }, delay);
    };

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const inputName = input.getAttribute('name');

      if (inputName) {
        if (inputName.includes('name')) {
          if (!validateName.test(input.value)) {
            addErrorClass(input);
            setFormValidate(false);
            showNotification('error', 'Имя не заполнено или заполнено некорректно', '', delay);
            delay += 500;
          }
        }

        if (inputName.includes('brand') || inputName.includes('model')) {
          if (input.value === '') {
            addErrorClass(input);
            setFormValidate(false);
            showNotification('error', 'Марка или модель не заполнены', '', delay);
            delay += 500;
          }
        }

        if (inputName.includes('car_number')) {
          if (!validateCarNumber.test(input.value.toUpperCase())) {
            addErrorClass(input);
            setFormValidate(false);
            showNotification('error', 'Номер авто заполнен некорректно', 'Русскими буквами в формате А777АА21 или А777АА121', delay);
            delay += 500;
          } else {
            getCarInfo(input.value.toUpperCase().trim()).then(res => {
              const info = res.data;

              if (info) {
                addErrorClass(input);
                setFormValidate(false);
                showNotification('error', `Авто с номером ${input.value.toUpperCase().trim()} уже зарегистрирован`, '', delay);
                delay += 500;
              }
            })
          }
        }

        if (inputName.includes('car_year')) {
          const currentYear = new Date().getFullYear();
          if (Number(input.value) < 1800 || Number(input.value) > currentYear) {
            addErrorClass(input);
            setFormValidate(false);
            showNotification('error', 'Год указан некорректно', '', delay);
            delay += 500;
          }
        }
      }

      if (input.classList.contains('error')) {
        setFormValidate(false); // Если хотя бы один инпут содержит класс error, устанавливаем validateStatus в false
      }
    }
  };

  const submitForm = async (e) => {

    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Array.from(data.entries());

    const groupedData = {user: {}, cars: []};

    validateRegistrationForm();

    if (formValidate) {
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
          if (item.images && item.images.length) {
            item.images = JSON.stringify(item.images.split(','));
          }
        })

        // const checkUser = await getUserInfo(currentUser?.id);
        // console.log(checkUser.data);

        await createUser(groupedData).then(res => {
          console.log(res)
          if (res.status === 200 && res.data === 'OK') {
            openNotificationWithIcon('success', 'Регистрация прошла успешно!', '');
          } else {
            openNotificationWithIcon('error', 'Что-то пошло не так(', '');
          }
          /*else if (res.status === 200 && res.data === 'User already exists') {
            if (groupedData.cars.length) {
              groupedData.cars.map(car => {
                let images = JSON.parse(car.images);
                if (images.length) {
                  images.map(async (image) => {
                    await deleteCarImage(image)
                  })
                }
                car.images = [];
              })
            }
            openNotificationWithIcon('error', 'Пользователь уже зарегистрирован!', 'Переходим на главную...');
            setTimeout(() => {
              // navigate('/')
            }, 2000)
          }*/
        })
      }
    }
  }

  return (
    <>
      {contextHolder}
      <div className="registration">
        <div className="container">
          <div className="registration__body">
            <form ref={form} onSubmit={submitForm} className="registration__form">
              <div className="registration__form-body">
                <div className="registration__field">
                  <div className="registration__field-input">
                    <Input name={"name"} pattern={validateName} placeholder={'Как тебя зовут?'} icon={<UserOutlined/>}
                           required={true}/>
                  </div>
                </div>
                {cars.map((_, index) => (
                  <div key={index} className="registration__car-block">
                    <CarAddForm index={index > 0 ? index + 1 : ''} key={index}/>
                    <div className="registration__car-block-controls">
                      <button type="button" className="registration__car-block-controls-add"
                              onClick={() => handleAddCar(index)}>Добавить еще авто
                      </button>
                      {index !== 0 && (
                        <button type="button" className="registration__car-block-controls-delete"
                                onClick={() => handleRemoveCar(index)}>Удалить авто</button>
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
    </>
  );
};

export default Registration;
