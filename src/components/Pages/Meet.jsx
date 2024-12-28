import React, {useEffect, useState} from 'react';
import MapCustom from "./MapCustom";
import dayjs from "dayjs";


const Meet = () => {

  const mapState = {
    center: [56.151192, 47.211558],
    zoom: 15,
    controls: [],
  };

  const [meetData, setMeetData] = useState({
    date: '',
    description: '',
  });

  useEffect(() => {
    setMeetData({
      date: dayjs('2024-12-29 20:00'),
      description: <>
        <p>❄️Новогодняя встреча клуба❄️</p>
        <p>🎁Конкурсы, подарки🎁</p>
        <p>🎉И конечно же салют🎉</p>
      </>,
    })
    setDateExpired(dayjs().isBefore(dayjs('2024-12-29 20:00')))
  }, []);

  const [dateExpired, setDateExpired] = useState(false);


  return (
    <>
      <div className="page-meet">
        <div className="container">
          <h1 className="page-meet__title h1t">Встреча клуба</h1>
          <div className="page-meet__body">
            {dateExpired ? (
              <div className="page-meet__info">
                <div className="page-meet__map">
                  <MapCustom state={mapState}/>
                </div>
                <div className="page-meet__about">
                  <h2 className="page-meet__about-date">
                    {dayjs(meetData?.date).format('YYYY-MM-DD HH:mm')}
                  </h2>
                  <div className="page-meet__about-description">
                    {meetData?.description}
                  </div>
                </div>
              </div>
            ) : (
              <div className="page-meet__expired">
                Информация о встрече появится позже
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Meet;
