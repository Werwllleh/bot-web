import React, {useEffect, useState} from 'react';
import {useUsersStore} from "../../services/store";
import MainModal from "../MainModal/MainModal";
import {getUserInfo, updateUser} from "../../api/api-users";
import {DeleteFilled, PlusOutlined} from '@ant-design/icons';
import {checkObject} from "../../utils/checkObject";
import CarAddForm from "../CarAddForm";
import {addUserCar, deleteUserCar, getCarInfo, getCars} from "../../api/api-cars";
import {Form, Input, message, notification} from "antd";
import ProfileEditForm from "../ProfileEditForm";
import * as error from "antd";

const Profile = () => {

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

  const [userForm] = Form.useForm();

  const [isModalActive, setModalActive] = useState(false);

  const [carForm, setCarForm] = useState({});
  const [selectedCar, setSelectedCar] = useState({});

  const userTelegramData = useUsersStore((state) => state.userTelegramData);

  const userData = useUsersStore((state) => state.userData);
  const updateUserData = useUsersStore((state) => state.updateUserData);
  const updateUsersCars = useUsersStore((state) => state.updateUsersCars);

  useEffect(() => {
    if (userTelegramData?.id) {

      getUserInfo(userTelegramData?.id).then(res => {
        if (res.data !== '') {
          updateUserData(res.data)
        }
      })
    }
  }, [userTelegramData]);

  useEffect(() => {
    console.log(userData)
  }, [userData])

  /*useEffect(() => {
    console.log(selectedCar)
  }, [selectedCar])*/

  const handleModalOpen = (carId) => {
    setModalActive(true);
    setSelectedCar(userData?.cars.filter(car => car.car_id === carId)[0])
  };
  const handleModalClose = () => {
    setModalActive(false);
    setTimeout(() => {
      setSelectedCar({});
      setCarForm({})
    }, 200)

  };

  const addCarForm = () => {
    setModalActive(true);
  }

  const deleteCar = async (carId) => {
    await deleteUserCar(userData.chat_id, carId);
    await getUserInfo(userTelegramData?.id).then(res => {
      if (res.data !== '') {
        updateUserData(res.data);
        updateUsersCars();
      }
    })
  }

  const saveNewCar = async (e) => {
    e.preventDefault();

    const carInfo = await getCarInfo(carForm.carNumber);

    if (carInfo.data) {
      return showNotification('error', 'Авто с данным номером уже зарегистрирован')
    }

    const addNewCar = await addUserCar(userData.chat_id, carForm);

    if (addNewCar.status === 200) {
      showNotification('success', 'Авто добавлен');
      handleModalClose();
      getUserInfo(userTelegramData?.id).then(res => {
        if (res.data !== '') {
          updateUserData(res.data);
          updateUsersCars();
        }
      })
    } else {
      showNotification('error', 'Ошибка при добавлении авто')
    }

  }

  const handleSubmit = async (values) => {
    console.log(values);

    try {


      await updateUser(userData.chat_id, values)
        .then(res => {
          if (res.status === 200) {
            getUserInfo(userTelegramData?.id).then(res => {
              if (res.data !== '') {
                updateUserData(res.data);
              }
            })
            return showNotification('success', res.data)
          }
        })
        .catch(err => {
          console.error(err)
        })
    } catch (err) {
      message.error(error.message || 'Ошибка обновления данных.');
    }

  }


  return (
    <>
      {contextHolder}
      <div className="page-profile">
        <div className="container">
          <h1 className="page-profile__title h1t">Твой профиль</h1>
          <div className="page-profile__body">
            <div className="page-profile__info">
              <Form
                form={userForm}
                onFinish={handleSubmit}
                variant="borderless"
                className="page-profile__userform"
                layout="vertical"
                initialValues={{
                  userName: userData?.user_name,
                  userInstagram: userData?.user_instagram !== null ? `@${userData?.user_instagram}` : ''
                }}
              >
                <div className="input-antd">
                  <Form.Item
                    label="Имя:"
                    name="userName"
                    rules={[
                      {
                        required: true,
                        validator: (_, value) => {
                          if (value.trim() !== '' && value.trim().length >= 2) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Мало символов!'));
                        },
                      },
                    ]}
                  >
                    <Input/>
                  </Form.Item>
                </div>
                <div className="input-antd">
                  <Form.Item
                    label="Профиль в Instagram:"
                    name="userInstagram"
                    rules={[
                      {
                        validator: (_, value) => {
                          if (value.trim() === '@') {
                            return Promise.reject(new Error('Введи имя профиля!'));
                          }
                          if (value.trim() === '') {
                            return Promise.resolve();
                          }
                          if (value.startsWith('@') && value.trim().length >= 2) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Имя пользователя должно начинаться с @!'));
                        },
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) => {
                        const {value} = e.target;
                        if (!value.startsWith('@')) {
                          e.target.value = `@${value}`;
                        }
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="page-profile__userform-submit">
                  <button className="style-btn" type="submit">
                    Обновить данные
                  </button>
                </div>
              </Form>
              <div className="page-profile__row">
                <div className="page-profile__row-title">Твои авто</div>
                <div className="page-profile__row-value">
                  <div className="page-profile__cars">
                    {userData?.cars?.length && userData?.cars.map(car => {
                      return (
                        <div key={car.car_id} className="page-profile__car">
                          <button onClick={() => handleModalOpen(car.car_id)}
                                  className="page-profile__car-about style-btn">
                            {`${car.car_brand} ${car.car_model} - ${car.car_number}`}
                          </button>
                          {userData?.cars?.length > 1 &&
                            <button onClick={() => deleteCar(car.car_id)} className="page-profile__car-delete">
                              <DeleteFilled/></button>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={addCarForm} className="page-profile__add-car style-btn">Добавить авто <PlusOutlined/>
        </button>
      </div>
      <MainModal title={checkObject(selectedCar) ? 'Данные авто' : 'Добавить авто'} isOpen={isModalActive}
                 onClose={handleModalClose}>
        {checkObject(selectedCar) ? (
          <div className="page-profile__modal">
            <ProfileEditForm selectedCar={selectedCar} updateSelectedCar={setSelectedCar}/>
          </div>
        ) : (
          <div className="page-profile__modal">
            <div className="page-profile__modal-add modal-add">
              <div className="modal-add__body">
                <form onSubmit={saveNewCar} className="modal-add__form">
                  <div className="modal-add__form-fileds">
                    <CarAddForm data={setCarForm}/>
                  </div>
                  <button type="submit" className="modal-add__form-submit style-btn">Добавить</button>
                </form>
              </div>
            </div>
          </div>
        )}

      </MainModal>
    </>
  );
};

export default Profile;
