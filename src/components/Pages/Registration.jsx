import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Input} from 'antd';
import {CarOutlined, UserOutlined} from "@ant-design/icons";
import CarAddForm from "../CarAddForm";
import {useUsersStore} from "../../services/store";
import {createUser, getUserInfo} from "../../api/api-users";
import {notification} from "antd";
import {validateCarNumber, validateName} from "../../utils/patterns";
import {addUserCar, deleteCarImage, getCarInfo} from "../../api/api-cars";
import {useNavigate} from "react-router-dom";
import {route} from "../../utils/consts";
import {checkObject} from "../../utils/checkObject";
import Loader from "../Loader/Loader";
import * as yup from "yup";


const Registration = () => {

  const [api, contextHolder] = notification.useNotification();
  const showNotification = (type, message, description) => {
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

  const userTelegramData = useUsersStore((state) => state.userTelegramData);
  const userData = useUsersStore((state) => state.userData);

  const updateUserData = useUsersStore((state) => state.updateUserData);
  const updateAuthChecked = useUsersStore((state) => state.updateAuthChecked);
  const updateUsersCars = useUsersStore((state) => state.updateUsersCars);

  const [carForm, setCarForm] = useState({});

  const [userName, setUserName] = useState('');

  const [loading, setLoading] = useState(false);

  const registrationSchema = yup.object().shape({
    user: yup.string().required('Поле имя обязательное')
      .test(
        'only-russian-letters', // Название теста (опционально)
        'В поле имя только русские символы', // Сообщение об ошибке
        (value) => {
          if (!value) return false; // Сразу возвращаем ошибку, если значение отсутствует
          return validateName.test(value); // Проверяем значение
        }
      ),
    car: yup.object().shape({
      brand: yup.string().required('Укажите марку поле'),
      model: yup.string().required('Укажите модель авто'),
      carNumber: yup.string().required('Укажите номер авто').min(8, 'Проверьте количество символов номера авто').max(9, 'Проверьте количество символов номера авто').test(
        'pattern car number', // Название теста (опционально)
        'Формат номера А001АА21 или А001АА121, русскими символами', // Сообщение об ошибке
        (value) => {
          if (!value) return false; // Сразу возвращаем ошибку, если значение отсутствует
          return validateCarNumber.test(value.toUpperCase()); // Проверяем значение
        }
      ),
      carYear: yup.number().required('Укажите год выпуска авто')
        .test(
          'check car year', // Название теста (опционально)
          'Введите корректный год', // Сообщение об ошибке
          (value) => {
            if (!value) return false; // Сразу возвращаем ошибку, если значение отсутствует

            const currentYear = new Date().getFullYear();
            return value >= 1800 && value <= currentYear
          }
        ),
      images: yup.array().required('Загрузите фотографии авто'),
      carNote: yup.string(),
    }),
  })

  const navigate = useNavigate();

  const addCarFunc = async (telegramId, carData) => {
    const checkUserData = await getUserInfo(telegramId)

    if (checkUserData) {

      const checkAuto = await getCarInfo(carData.carNumber);

      const chat_id = checkUserData.data.chat_id;
      const userData = checkUserData.data;

      if (checkAuto.data === '') {
        await addUserCar(chat_id, carData)
          .then(result => {
            if (result.status === 200) {
              showNotification('success', 'Авто добавлено!');
              updateUsersCars();
              updateUserData(userData);

              setTimeout(() => {
                updateAuthChecked(true);
                setLoading(false);
                // navigate(route.CARS.url);
                navigate(-1);
              }, 1500)
            }
          })
          .catch((err) => {
            // console.log(err)
          })
      } else {
        setLoading(false);
        showNotification('error', 'Авто c таким номером уже существует!');
      }
    }
  }


  const submitForm = async (e) => {

    e.preventDefault();

    const submitForm = {
      user: userName,
      car: carForm
    }

    await registrationSchema.validate(submitForm)
      .then(async () => {
        setLoading(true)

        try {
          await createUser(userTelegramData?.id, submitForm.user)
            .then(async (res) => {
              // console.log(res)
              if (res.status === 200) {
                showNotification('success', 'Пользователь успешно добавлен');
                await addCarFunc(userTelegramData?.id, submitForm.car);
                updateUsersCars();
              }
            })
            .catch(async (err) => {
              const errorMsg = err.response?.data?.message;
              if (errorMsg !== undefined) {
                if (errorMsg === 'User was created') {
                  await addCarFunc(userTelegramData?.id, submitForm.car);
                } else {
                  showNotification(
                    'error',
                    'Произошла ошибка',
                    'Обновите страницу и попробуйте еще раз');
                  setLoading(false)
                }
              }
            })
        } catch (err) {
          // console.log(err)
          setLoading(false);
        }

      })
      .catch((error) => {
        if (error?.errors?.length) {
          const errorText = error?.errors[0];
          // console.error(errorText);
          showNotification('error', errorText)
        }
      });
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
                      className={`${userName !== '' && !validateName.test(userName) ? 'error' : ''}`}
                      name="userName"
                      placeholder="Как тебя зовут"
                      value={userName === '' ? null : userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="registration__car-block">
                  <CarAddForm data={setCarForm}/>
                </div>
              </div>
              <div className="registration__form-footer">
                <button type="submit" className="registration__form-submit style-btn">Отправить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
