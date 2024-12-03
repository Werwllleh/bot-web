import React, {useEffect, useState} from 'react';
import {useUsersStore} from "../../services/store";
import MainModal from "../MainModal/MainModal";
import {getUserInfo} from "../../api/api-users";

const Profile = () => {

  const [isModalActive, setModalActive] = useState(false);
  const [selectedCar, setSelectedCar] = useState(false);

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


  const handleModalOpen = (carId) => {
    setModalActive(true);
    setSelectedCar(userData?.cars.filter(car => car.car_id === carId)[0])
  };
  const handleModalClose = () => {
    setModalActive(false);
  };

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
      </div>
      <MainModal title={'Данные авто'} isOpen={isModalActive} onClose={handleModalClose}>
        <div className="page-profile__modal">
          <div className="page-profile__modal-title">{selectedCar?.car_brand}</div>
          <div className="page-profile__modal-images"></div>
          {selectedCar?.car_note && <div className="page-profile__modal-note">{selectedCar?.car_note}</div>}
        </div>
      </MainModal>
    </>
  );
};

export default Profile;
