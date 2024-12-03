import React, {useEffect, useState} from 'react';
import "../../../styles/index.scss";
import Header from "../../Header";
import {Rate, notification, Input, Button, Watermark, Checkbox} from 'antd';
import {Swiper, SwiperSlide} from 'swiper/react';
import {addFeedback, getFeedback} from "../../../utils/feedbacksUtils";
import {useUsersStore} from "../../../services/store";
import NoisyCanvas from "../../NoiseCanvas/NoisyCanvas";

const {TextArea} = Input;


const Feedback = () => {

  // const currentUser = useUsersStore((state) => state.currentUser);

  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [descriptionTitle, setDescriptionTitle] = useState('');


  const [currentFeedback, setCurrentFeedback] = useState({});
  const [allFeeds, setAllFeeds] = useState([]);


  const changeRate = (value) => {
    setRating(value)
  }

  const changeDescription = (e) => {
    setDescription(e.target.value)
  }

  const changeAnonymous = (e) => {
    setAnonymous(e.target.checked)
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    if (type === 'success') {
      api[type]({
        message: 'Спасибо за оценку!',
        description: 'Отзыв отправлен на модерацию'
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
        text: description,
        anonymous: anonymous
      };

      try {
        addFeedback(currentUser.id, data)
          .then(res => {
            if (res.status === 200) {
              openNotificationWithIcon('success');
            } else {
              openNotificationWithIcon('error');
            }
          })

      } catch (error) {
        console.log('Ошибка добавления отзыва', error);
      }
    }
  }

  useEffect(() => {
    getFeedback(currentUser.id)
      .then(res => {
        setCurrentFeedback(res.data.currentFeedback)
        setAllFeeds(res.data.feedbacks)
        setAnonymous(res.data.anonymous)
      })
  }, []);

  useEffect(() => {
    if (currentFeedback) {
      setRating(currentFeedback.rate);
      setDescription(currentFeedback.text)
      setAnonymous(currentFeedback.anonymous)
    }
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
          <div className="page-feedback__user-feedback">
            <div className="page-feedback__rate">
              <div className="page-feedback__rate-text">
                <h2>Оцените нашу работу</h2>
                <span>Поделитесь своим мнением</span>
              </div>
              <Rate value={rating} onChange={changeRate} allowClear={false}/>
            </div>
            <div className="page-feedback__checkbox">
              <Checkbox checked={anonymous} onChange={changeAnonymous}>Анонимно</Checkbox>
            </div>
            {rating > 0 ? (
              <div className={`page-feedback__description ${rating > 0 ? 'show' : ''}`}>
                <h3 className="page-feedback__description-title">{descriptionTitle}</h3>
                <TextArea showCount maxLength={200} onChange={changeDescription} value={description} autoSize={true}/>
              </div>
            ) : null}
            {rating > 0  && description?.length > 5 ? (
              <Button onClick={sendFeedback} className={`page-feedback__button ${rating > 0 ? 'show' : ''}`}>
                {currentFeedback ? 'Обновить отзыв' : 'Отправить отзыв'}
              </Button>
            ) : null}
          </div>
          <div className="page-feedback__slider">
            {
              allFeeds?.length > 0 && <h3 className="page-feedback__slider-title">Все отзывы {allFeeds?.length > 0 && <span>- {allFeeds?.length}</span>}</h3>
            }
            <Swiper
              centeredSlides={true}
              spaceBetween={20}
              slidesPerView={"auto"}
              breakpoints={{
                300: {
                  spaceBetween: 10
                },
                550: {
                  spaceBetween: 20
                },
              }}
            >
              {
                allFeeds.map((feedback) => {
                  return (
                    <SwiperSlide key={feedback.id}>
                      <div className="page-feedback__slider-card">
                        <div className="page-feedback__slider-card__rate">
                          <Rate value={feedback.rate} disabled={true}/>
                        </div>
                        <div className="page-feedback__slider-card__header">
                          <div className="page-feedback__slider-card__name">{feedback.anonymous ? <span className="page-feedback__slider-card__name-anon"><NoisyCanvas/></span> : feedback.user}</div>
                          <div className="page-feedback__slider-card__date">{getTime(feedback.date)}</div>
                        </div>
                        <div className="page-feedback__slider-card__text">{feedback.text}</div>
                      </div>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div>
        </div>
      </div>

    </>
  );
};

export default Feedback;
