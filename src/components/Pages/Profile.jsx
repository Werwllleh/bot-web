import React, {useEffect, useState} from 'react';
import {useUsersStore} from "../../services/store";
import MainModal from "../MainModal/MainModal";
import {getUserInfo} from "../../api/api-users";
import {PlusOutlined} from '@ant-design/icons';
import {checkObject} from "../../utils/checkObject";
import CarAddForm from "../CarAddForm";

const Profile = () => {

  const [isModalActive, setModalActive] = useState(false);

  const [carForm, setCarForm] = useState({});
  const [selectedCar, setSelectedCar] = useState({});

  const userTelegramData = useUsersStore((state) => state.userTelegramData);

  const userData = useUsersStore((state) => state.userData);
  const updateUserData = useUsersStore((state) => state.updateUserData);

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
    console.log(carForm)
  }, [carForm]);


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

  return (
    <>
      <div className="page-profile">
        <div className="container">
          <h1 className="page-profile__title h1t">Твой профиль</h1>
          <div className="page-profile__body">
            <div className="page-profile__info">
              <div className="page-profile__row">
                <div className="page-profile__row-title">Имя</div>
                <div className="page-profile__row-value">
                  <div className="page-profile__username">
                    {userData?.user_name}
                  </div>
                </div>
              </div>
              <div className="page-profile__row">
                <div className="page-profile__row-title">Твои авто</div>
                <div className="page-profile__row-value">
                  <div className="page-profile__cars">
                    {userData?.cars.length && userData?.cars.map(car => {
                      return (
                        <button onClick={() => handleModalOpen(car.car_id)} key={car.car_id}
                                className="page-profile__car">
                          {`${car.car_brand} ${car.car_model} - ${car.car_number}`}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={addCarForm} className="page-profile__add-car style-btn">Добавить авто <PlusOutlined /> </button>
      </div>
      <MainModal title={checkObject(selectedCar) ? 'Данные авто' : 'Добавить авто'} isOpen={isModalActive} onClose={handleModalClose}>
        {checkObject(selectedCar) ? (
          <div className="page-profile__modal">
            <div className="page-profile__modal-info modal-info">
              <div className="page-profile__modal-title">{selectedCar?.car_brand}</div>
              <div className="page-profile__modal-images"></div>
              {selectedCar?.car_note && <div className="page-profile__modal-note">{selectedCar?.car_note}</div>}
            </div>
          </div>
        ) : (
          <div className="page-profile__modal">
            <div className="page-profile__modal-add modal-add">
              <div className="modal-add__body">
                <form action="" className="modal-add__form">
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
