import React, {useEffect, useRef, useState} from 'react';
import {Input} from 'antd';
import {CarOutlined, UserOutlined} from "@ant-design/icons";
import CarAddForm from "../CarAddForm";
import {useUsersStore} from "../../services/store";
import {createUser, getUserInfo} from "../../api/api-users";
import {notification} from "antd";
import {validateCarNumber, validateName} from "../../utils/patterns";
import {deleteCarImage, getCarInfo} from "../../api/api-cars";
import {useNavigate} from "react-router-dom";
import {route} from "../../utils/consts";
import {checkObject} from "../../utils/checkObject";
import Loader from "../Loader/Loader";


const Registration = () => {

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
  const form = useRef();
  const [cars, setCars] = useState([{}]); // Начинаем с одной пустой формы

  const userTelegramData = useUsersStore((state) => state.userTelegramData);
  const userData = useUsersStore((state) => state.userData);

  const updateUserData = useUsersStore((state) => state.updateUserData);
  const updateAuthChecked = useUsersStore((state) => state.updateAuthChecked);
  const updateUsersCars = useUsersStore((state) => state.updateUsersCars);

  const [formValidate, setFormValidate] = useState(true);
  const [formData, setFormData] = useState({});

  const [userName, setUserName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [carAddFormStatus, setCarAddFormStatus] = useState(false);

  const [loading, setLoading] = useState(false)


  const navigate = useNavigate();

  /*const validateRegistrationForm = () => {
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

              if (info !== '') {
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
  };*/

  const submitForm = async (e) => {

    e.preventDefault();

    const data = new FormData(e.target);
    const formData = Array.from(data.entries());

    const groupedData = {user: {}, cars: []};

    if (formValidate && !checkObject(userData)) {
      if (groupedData) {
        groupedData.cars.map(item => {
          if (item.images && item.images.length) {
            item.images = JSON.stringify(item.images.split(','));
          }
        })

        formValidate && await createUser(groupedData).then(res => {
          // console.log(res)
          setLoading(true);
          if (res.status === 200 && res.data === 'OK') {
            getUserInfo(userTelegramData?.id).then(res => {
              if (res.data) {

                setTimeout(() => {
                  setLoading(false);
                  openNotificationWithIcon('success', 'Регистрация прошла успешно!', '');

                  setTimeout(() => {
                    updateAuthChecked(true);
                    updateUserData(res.data);
                    updateUsersCars();
                    navigate(route.CARS.url)
                  }, 1000)
                }, 4000)
              }
            })

          } else if (res.status === 200 && res.data === 'User already exists') {
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
          } else {
            openNotificationWithIcon('error', 'Что-то пошло не так(', '');
          }

        })
      }
    }
  }

  return (
    <>
      {contextHolder}
      {loading && <Loader/>}
      <div className={`registration ${loading ? 'block-blur' : ''}`}>
        <div className="container">
          <h1 className="registration__title h1t">Регистрация</h1>
          <div className="registration__body">
            <form ref={form} onSubmit={submitForm} className="registration__form">
              <div className="registration__form-body">
                <div className="registration__field">
                  <div className="registration__field-icon"><UserOutlined/></div>
                  <div className="registration__field-input input-antd">
                    <Input
                      required={true}
                      className={`${userName !== '' && !validateName.test(userName) ? 'error' : '' }`}
                      name="userName"
                      placeholder="Как тебя зовут"
                      value={userName === '' ? null : userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="registration__car-block">
                  <CarAddForm data={setFormData} status={setCarAddFormStatus}/>
                </div>
              </div>
              {carAddFormStatus && formValidate && (
                <div className="registration__form-footer">
                  <button type="submit" className="registration__form-submit">Отправить</button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
