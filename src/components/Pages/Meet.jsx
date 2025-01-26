import React, {useEffect, useState} from 'react';
import MapCustom from "./MapCustom";
import dayjs from "dayjs";
import {useMeetStore} from "../../services/store";
import Loader from "../Loader/Loader";
import {checkObject} from "../../utils/checkObject";
import {marked} from "marked";


const Meet = () => {

  const meetDate = useMeetStore((state) => state.meetData);
  const meetDateLoading = useMeetStore((state) => state.loading);

  /*useEffect(() => {
    console.log(meetDate)
    console.log(meetDateLoading)
  }, [meetDate, meetDateLoading]);*/

  const [meetData, setMeetData] = useState({
    date: '',
    description: '',
  });

  const [mapState, setMapState] = useState({
    center: [],
    zoom: 15,
    controls: [],
  })


  useEffect(() => {
    if (!meetDateLoading && checkObject(meetDate)) {
      console.log(meetDate);

      setMeetData({
        date: dayjs(meetDate.date),
        description: meetDate.description,
      });

      setDateExpired(dayjs().isBefore(dayjs(meetDate.date)));

      // Проверяем, что coordinates существует и не пустое
      if (meetDate.coordinates && meetDate.coordinates.trim() !== '') {
        setMapState(prevState => ({
          ...prevState,
          center: meetDate.coordinates.split(',').map(item => Number(item)),
        }));
      }
    }
  }, [meetDate, meetDateLoading]);

  const [dateExpired, setDateExpired] = useState(false);


  return (
    <>
      <div className="page-meet">
        <div className="container">
          <h1 className="page-meet__title h1t">Встреча клуба</h1>
          {meetDateLoading && <Loader />}
          {!meetDateLoading && (
            <div className="page-meet__body">
              {dateExpired && mapState.center !== [] ? (
                <div className="page-meet__info">
                  <div className="page-meet__map">
                    <MapCustom state={mapState}/>
                  </div>
                  <div className="page-meet__about">
                    <h2 className="page-meet__about-date">
                      {dayjs(meetData?.date).format('DD.MM.YYYY HH:mm')}
                    </h2>
                    <div className="page-meet__about-description"
                         dangerouslySetInnerHTML={{ __html: marked.parse(meetData?.description || '') }} />
                  </div>
                </div>
              ) : (
                <div className="page-meet__expired">
                  Информация о встрече появится позже
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Meet;
