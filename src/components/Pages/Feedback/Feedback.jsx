import React, {useEffect, useState} from 'react';
import "../../../styles/index.scss";
import Header from "../../Header/Header";
import {Rate, notification, Input, Button, Watermark} from 'antd';
import {addFeedback, getFeedback} from "../../../utils/feedbacksUtils";
import {useUsersStore} from "../../../services/store";

const {TextArea} = Input;


const Feedback = () => {

  const currentUser = useUsersStore((state) => state.currentUser);

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [descriptionTitle, setDescriptionTitle] = useState('');

  const [currentFeedback, setCurrentFeedback] = useState({});
  const [allFeeds, setAllFeeds] = useState([]);


  const changeRate = (value) => {
    setRating(value)
  }

  const changeDescription = (e) => {
    setDescription(e.target.value)
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    if (type === 'success') {
      api[type]({
        message: 'Спасибо за отзыв!',
      });
    }
    if (type === 'error') {
      api[type]({
        message: 'Возникла ошибка',
        description: 'Попробуйте позже'
      });
    }
  };

  useEffect(() => {
    if (rating > 0 && rating <= 2) {
      setDescriptionTitle('Что Вам не понравилось? 😔')
    }
    if (rating > 2 && rating <= 4) {
      setDescriptionTitle('Что нам нужно улучшить? ✍️')
    }
    if (rating > 4) {
      setDescriptionTitle('Спасибо за высокую оценку! Какие есть пожелания? 🙂')
    }

  }, [rating]);

  const sendFeedback = () => {
    if (currentUser.id) {
      const data = {
        rate: rating,
        text: description
      };

      try {
        addFeedback(currentUser.id, data)
          .then(data => console.log(data))
        openNotificationWithIcon('success');
      } catch (error) {
        console.log('Ошибка добавления отзыва', error);
      }

    }
  }

  useEffect(() => {
    getFeedback(currentUser)
      .then(res => {
        setCurrentFeedback(res.data.currentFeedback)
        setAllFeeds(res.data.feedbacks)
      })
  }, []);

  useEffect(() => {
    if (currentFeedback) {
      setRating(currentFeedback.rate);
      setDescription(currentFeedback.text)
    }
    console.log(currentFeedback)
    console.log(allFeeds)
  }, [currentFeedback, allFeeds]);

  return (
    <>
      {contextHolder}
      <Header title={'Отзывы'}/>
      <div className="container">
        <div className="page-feedback">
          <div className="page-feedback__bg">
            <Watermark content="vagcheb"/>
          </div>
          <div className="page-feedback__rate">
            <div className="page-feedback__rate-text">
              <h2>Оцените нашу работу</h2>
              <span>Поделитесь своим мнением</span>
            </div>
            <Rate value={rating} onChange={changeRate} allowClear={false}/>
          </div>
          {rating > 0 ? (
            <div className={`page-feedback__description ${rating > 0 ? 'show' : ''}`}>
              <h3 className="page-feedback__description-title">{descriptionTitle}</h3>
              <TextArea showCount maxLength={200} onChange={changeDescription} value={description} autoSize={true}/>
            </div>
          ) : null}
          {rating > 0 && description.length > 7 ? (
            <Button onClick={sendFeedback} className={`page-feedback__button ${rating > 0 ? 'show' : ''}`}>
              {currentFeedback ? 'Обновить отзыв' : 'Отправить отзыв'}
            </Button>
          ) : null}
        </div>
      </div>

    </>
  );
};

export default Feedback;
