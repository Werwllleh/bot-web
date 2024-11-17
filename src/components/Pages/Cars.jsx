import React, {useEffect, useState} from "react";
import {useUsersStore} from "../../services/store";
import Loader from "../Loader/Loader";
import CarImage from "../CarImage";
import MainModal from "../MainModal/MainModal";
import {Image} from 'antd';
import {checkObject} from "../../utils/checkObject";
import {API_BASE} from "../../utils/consts";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";

const Cars = () => {

  const [loading, setLoading] = useState(true);
  const [isModalActive, setModalActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchCarNumber, setSearchCarNumber] = useState('');

  const [carsList, setCarsList] = useState([]);

  const [selectedCarId, setSelectedCarId] = useState(null);
  const [selectedCarInfo, setSelectedCarInfo] = useState({});
  const [imageList, setImageList] = useState([]);


  const usersCars = useUsersStore((state) => state.usersCars);

  const updateUsers = useUsersStore((state) => state.updateUsers);
  const updateUsersCars = useUsersStore((state) => state.updateUsersCars);

  useEffect(() => {
    if (usersCars.length) {
      setLoading(false);
      setCarsList(usersCars)
    } else {
      setLoading(true);
      updateUsers();
      updateUsersCars();
    }
  }, [usersCars, updateUsers, updateUsersCars])

  const handleModalOpen = () => {
    setModalActive(true);
  };
  const handleModalClose = () => {
    setModalActive(false);
  };

  const handleCarSelect = (carId) => {
    if (selectedCarId !== carId) {
      setSelectedCarId(carId);

      // Находим данные о машине

      let carData = usersCars.find(car => car.id === carId);
      // Обновляем пути изображений, чтобы они содержали полный путь
      const imageList = JSON.parse(carData.car_images).map(image => {
        return `${API_BASE}/car/${image}`;
      });

      // Обновляем состояние с новым списком изображений
      setImageList(imageList);

      // Устанавливаем данные выбранной машины
      setSelectedCarInfo(carData);
    } else {
      // Сбрасываем выделение при повторном клике на ту же машину
      setSelectedCarId(null);
      setSelectedCarInfo({});
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (selectedCarId) {
        setSelectedCarId(null);
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [selectedCarId]);

  useEffect(() => {
    console.log(searchCarNumber)
  }, [searchCarNumber]);

  const searchFieldFunc = () => {
    if (isSearchActive) {
      setIsSearchActive(false);
      setSearchCarNumber('');
    } else {
      setIsSearchActive(true);
    }
  }

  useEffect(() => {
    if (searchCarNumber !== '') {
      const filteredData = usersCars?.filter(car => car.car_number.includes(searchCarNumber));
      setCarsList(filteredData);
    } else {
      setCarsList(usersCars);
    }
  }, [searchCarNumber]);

  return (
    <>
      <div className="page-cars">
        <div className="container">
          <h1 className="page-cars__title h1t">Наши авто</h1>
        </div>
        <div className="page-cars__body">
          {loading && <div className="page-cars__loader"><Loader/></div>}
          {!loading && carsList?.length && (
            <div className="page-cars__images">
              {carsList.map((car) => (
                <CarImage openModal={handleModalOpen} car={car} key={car.id} isSelected={selectedCarId === car.id}
                          onSelect={handleCarSelect}/>
              ))}
            </div>
          )}
        </div>
        <div className={`page-cars__search-field ${isSearchActive ? "active" : ""}`}>
          <input value={searchCarNumber} onChange={(e) => setSearchCarNumber(e.target.value.toUpperCase())} type="text"
                 className="page-cars__search-field-input"/>
        </div>
        <button onClick={searchFieldFunc} className="page-cars__search-button">
          {isSearchActive ? <CloseOutlined/> : <SearchOutlined/>}
        </button>
      </div>
      <MainModal className={"car-info-modal"} title={'Об авто'} isOpen={isModalActive} onClose={handleModalClose}>
        {checkObject(selectedCarInfo) && (
          <div className="car-info-modal__content">
            <div className="car-info-modal__images">
              <Image.PreviewGroup
                items={imageList}
              >
                <Image
                  src={imageList[Math.floor(Math.random() * (imageList.length - 1))]}
                />
              </Image.PreviewGroup>
            </div>
            <div className="car-info-modal__info">
              <div className="car-info-modal__info-row">
                <span className="car-info-modal__info-title">Владелец:</span>
                <p className="car-info-modal__info-value">{selectedCarInfo.user.user_name}</p>
              </div>
              <div className="car-info-modal__info-row">
                <span className="car-info-modal__info-title">Авто:</span>
                <p
                  className="car-info-modal__info-value">{`${selectedCarInfo.car_brand} ${selectedCarInfo.car_model}`}</p>
              </div>
              <div className="car-info-modal__info-row">
                <span className="car-info-modal__info-title">Год:</span>
                <p className="car-info-modal__info-value">{selectedCarInfo.car_year}</p>
              </div>
              <div className="car-info-modal__info-row">
                <span className="car-info-modal__info-title">Номер:</span>
                <p className="car-info-modal__info-value">{selectedCarInfo.car_number}</p>
              </div>
              {selectedCarInfo.car_note && <div className="car-info-modal__info-row">
                <span className="car-info-modal__info-title">Примечание:</span>
                <p className="car-info-modal__info-value">{selectedCarInfo.car_note}</p>

              </div>}
            </div>
          </div>
        )}
      </MainModal>
    </>
  );
};

export default Cars;
