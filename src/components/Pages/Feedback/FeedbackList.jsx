import React, {useEffect, useState} from 'react';
import Header from "../../Header/Header";
import {getFeedback} from "../../../utils/feedbacksUtils";
import Loader from "../../Loader/Loader";
import {Rate, notification, Input, Button, Watermark, Checkbox} from 'antd';
import {getTime} from "../../../utils/utils";


const FeedbackList = () => {

  const [feedsList, setFeedsList] = useState([])

  useEffect(() => {
    getFeedback()
      .then(res => {
        setFeedsList(res.data.feedbacks)
      })

  }, []);

  console.log(feedsList)

  return (
    <>
      <Header title={'Админка отзывов'}/>
      <div className="container">
        <div className="page-admin-feedbacks admin-feedbacks">
          {feedsList.length ? (
            <ul className="admin-feedbacks__list">
              {feedsList.map((item) => {
                return (
                  <li key={item.id} className="admin-feedbacks__item">
                    <div className="admin-feedbacks__item-content">
                      <h5 className="admin-feedbacks__item-name">{item.user}</h5>
                      <div className="admin-feedbacks__item-date">{getTime(item.date)}</div>
                      <div className="admin-feedbacks__item-rate"><Rate value={item.rate} disabled={true}/></div>
                      <div className="admin-feedbacks__item-text">{item.text}</div>
                    </div>
                    <div className="admin-feedbacks__item-actions">
                      <Button type="primary">Принять</Button>
                      <Button type="primary">Отклонить</Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : <Loader />}
        </div>
      </div>

    </>
  );
};

export default FeedbackList;