import React, {useEffect} from "react";
import {Image} from "antd";
import {API} from "../../utils/consts";

const Cars = () => {

  return (
    <div className="page-cars">
      <div className="container">
        <h1 className="page-cars__title h1t">Наши авто</h1>
        <div className="page-cars__body">
          {/*{data.map((user) => (
              <Image
                preview={{
                  // src: API + "api/image/" + user.carImage,
                  mask: 'Просмотр',
                  imageRender: () => (
                    <div className={s.preview__block}>
                      <div className={s.preview__image}>
                        <img src={`${API}api/image/${user.carImage}`} alt=""/>
                      </div>
                      <div className={s.preview__info}>
                        <ul className={s.preview__list}>
                          <li>
                            <span>Владелец:</span>
                            <h5>{`${user.userName.toUpperCase()}`}</h5>
                          </li>
                          <li>
                            <span>Авто:</span>
                            <h5>{`${user.carbrand.toUpperCase()} ${user.carModel.toUpperCase()}`}</h5>
                          </li>
                          <li>
                            <span>Гос.номер:</span>
                            <h5>{`${user.carGRZ}`}</h5>
                          </li>
                          <li>
                            <span>Год выпуска:</span>
                            <h5>{`${user.carYear}`}</h5>
                          </li>
                          {user.carNote ? (
                            <li>
                              <span>Примечание:</span>
                              <h5>{`${user.carNote}`}</h5>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    </div>
                  ),
                  toolbarRender: () => null,
                }}
                style={{
                  objectFit: "cover",
                  height: "150px",
                  maxWidth: "150px",
                }}
                loading="lazy"
                key={user.chatId}
                onError={(e) => {
                  e.target.src = `${API}api/icons/not_found.png`
                }}
                src={`${API}api/image/small/${user.carImage}_small.jpeg`}
                alt={`${user.carbrand} ${user.carModel}`}
              />
            ))}*/}
        </div>
      </div>
    </div>
  );
};

export default Cars;
