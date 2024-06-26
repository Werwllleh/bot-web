import React, {useEffect, useState} from 'react';
import Header from "../../Header/Header";
import {getFeedback, historyFeedbacks, verifyFeedback} from "../../../utils/feedbacksUtils";
import {Rate, notification, Empty, Button, Collapse} from 'antd';
import {getTime} from "../../../utils/utils";


const FeedbackList = () => {

  const [feedsList, setFeedsList] = useState([]);
  const [feedsListHistory, setFeedsListHistory] = useState([]);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    if (type === 'success') {
      api[type]({
        message: 'Отзыв одобрен!',
      });
    }
    if (type === 'error') {
      api[type]({
        message: 'Отзыв отклонен',
      });
    }
  };

  useEffect(() => {
    getFeedback()
      .then(res => {
        setFeedsList(res.data.feedbacks)
      })

    historyFeedbacks()
      .then(res => {
        setFeedsListHistory(res.data.feedbacks)
      })

  }, []);

  const changeVerify = (feedbackId, verifyStatus) => {
    verifyFeedback(feedbackId, verifyStatus)
      .then(res => {
        if (res.status === 200) {
          if (verifyStatus) {
            openNotificationWithIcon('success');
          } else {
            openNotificationWithIcon('error');
          }
          setFeedsList(feedsList.filter(feed => feed.id !== feedbackId))
        }
      })
  }

  const items = [
    {
      key: 'new-feeds',
      label: 'Новые отзывы',
      children: (
        <div className="page-admin-feedbacks admin-feedbacks">
          {feedsList.length ? (
            <ul className="admin-feedbacks__list">
              {feedsList.map((item) => {
                return (
                  <li key={item.id} className="admin-feedbacks__item">
                    <div className="admin-feedbacks__item-content">
                      <h5 className="admin-feedbacks__item-name">{item.user} <span className="admin-feedbacks__item-anon">- {item.anonymous ? 'Анонимный' : 'Не анонимный'}</span></h5>
                      <div className="admin-feedbacks__item-date">{getTime(item.date)}</div>
                      <div className="admin-feedbacks__item-rate"><Rate value={item.rate} disabled={true}/></div>
                      <div className="admin-feedbacks__item-text">{item.text}</div>
                    </div>
                    <div className="admin-feedbacks__item-actions">
                      <Button className="admin-feedbacks__item-accept" type="primary"
                              onClick={() => changeVerify(item.id, true)}>Принять</Button>
                      <Button className="admin-feedbacks__item-cancel" type="primary"
                              onClick={() => changeVerify(item.id, false)}>Отклонить</Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div className={"admin-feedbacks__notfound"}>
              <Empty description={"Новых отзывов нет"}/>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'history-feeds',
      label: 'История отзывов',
      children: (
        <div className="admin-feedbacks-history">
          {
            feedsListHistory.length && (
              <ul className="admin-feedbacks__list">
                {feedsListHistory.map((item) => {
                  return (
                    <li key={item.id} className="admin-feedbacks__item">
                      <div className="admin-feedbacks__item-content">
                        <div className="admin-feedbacks__item-status">Статус отзыва - {item.status === true ? 'одобрен' : 'не одобрен'}</div>
                        <h5 className="admin-feedbacks__item-name">{item.user} <span className="admin-feedbacks__item-anon">- {item.anonymous ? 'Анонимный' : 'Не анонимный'}</span></h5>
                        <div className="admin-feedbacks__item-date">{getTime(item.date)}</div>
                        <div className="admin-feedbacks__item-rate"><Rate value={item.rate} disabled={true}/></div>
                        <div className="admin-feedbacks__item-text">{item.text}</div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )
          }
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Header title={'Админка отзывов'}/>
      <div className="container">
        <Collapse accordion items={items} defaultActiveKey={['new-feeds']} />
      </div>
    </>
  );
};

export default FeedbackList;
