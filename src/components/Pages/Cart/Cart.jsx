import React, {useEffect, useState} from 'react';
import s from './Cart.module.css';
import Header from "../../Header/Header";
import {checkAvailable, getTotalSumCart} from "../../../utils/cartUtils";
import CartItem from "../../CartItem/CartItem";
import {Empty, Select, Input, Modal, notification} from "antd";
const {TextArea} = Input;
import InputMask from 'react-input-mask';
import {API} from "../../../utils/consts";
import axios from "axios";
import {useProductsCountStore, useUsersStore} from "../../../services/store";
import useTelegram from "../../../hooks/useTelegram";

const Cart = () => {

  const {tg} = useTelegram();

  useEffect(() => {
    tg.expand();
  }, []);

  const userCart = useUsersStore((state) => state.cart);
  const currentUser = useUsersStore((state) => state.currentUser);
  const productStore = useProductsCountStore((state) => state.productStore);
  const selectedPlace = useUsersStore((state) => state.selectedPlace);
  const available = useUsersStore((state) => state.available);

  const updateSelectedPlace = useUsersStore((state) => state.updateSelectedPlace);
  const updateAvailable = useUsersStore((state) => state.updateAvailableProducts);
  const updateCart = useUsersStore((state) => state.updateCart);

  const [sellerChatId, setSellerChatId] = useState(null);
  const [orderComment, setOrderComment] = useState('');

  const [phone, setPhone] = useState('');
  const handleInputPhone = ({target: {value}}) => setPhone(value.replace(/[\s_()]/g, ""));

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    if (type === 'success') {
      api[type]({
        message: 'Заявка отправлена',
        description:
          'Спасибо за поддержку 🤗',
      });
    }
    if (type === 'error') {
      api[type]({
        message: 'Введите номер телефона',
        description:
          'Либо убедитесь в правильности ввода',
      });
    }
  };


  useEffect(() => {
    updateAvailable(checkAvailable(productStore, userCart, selectedPlace))
  }, [userCart, available]);


  const handleChange = (value) => {
    updateSelectedPlace(value)
    updateAvailable(checkAvailable(productStore, userCart, value))
  };

  const textAreaChange = (e) => {
    setOrderComment(e.currentTarget.value);
  };

  const sendOrderData = () => {
    try {
      axios
        .post(API + `api/order`, {
          orderData: {
            sellerChatId: Number(productStore.filter((item) => item.value === selectedPlace)[0].chatId),
            phone: phone,
            user: currentUser,
            cart: userCart,
            selectedPlace: selectedPlace,
            comment: orderComment.length && orderComment,
            cartTotalCount: getTotalSumCart(userCart).totalCount,
            cartTotalSum: getTotalSumCart(userCart).totalSum,
          },
        })
      updateCart([]);
    } catch (e) {
      console.log(e)
    }
  };

  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const showModal = () => {
    setIsModalOrderOpen(true);
  };
  const handleSend = () => {
    if (currentUser.id && selectedPlace && phone.length === 12) {
      setIsModalOrderOpen(false);
      sendOrderData();
      openNotificationWithIcon('success');
    } else {
      openNotificationWithIcon('error');
    }

  };
  const handleCancel = () => {
    setIsModalOrderOpen(false);
  };


  return (
    <>
      {contextHolder}
      <div className={s.cart__body}>
        <Header title={"Корзина"}/>
        {userCart.length ? (
          <div className="container">
            <ul className={s.cart__items}>
              {userCart.map((item) => {
                return <CartItem key={item.title} title={item.title} photo={item.photo} count={item.count}
                                 price={item.price}/>
              })}
            </ul>
            <div className="cart__comment">
              <TextArea placeholder="Комментарий к заказу" allowClear onChange={textAreaChange}/>
            </div>
            <div className={s.cart__footer}>
              <div className={s.cart__footer_left}>
                <div className={s.cart__results}>
                  <div className={s.cart__total_count}>{getTotalSumCart(userCart).totalCount}&nbsp;шт</div>
                  <div className={s.cart__total_sum}>
                    <span>Итого:</span>&nbsp;{getTotalSumCart(userCart).totalSum}&nbsp;₽
                  </div>
                </div>
                {selectedPlace !== null ? (
                  <span
                    className={s.cart__available}>{available ? 'В наличии' : 'По данном району продукция закончилась, выберите другой'}</span>
                ) : ''}
                {userCart.length && currentUser?.id && available ? (
                  <button onClick={showModal} className={s.cart__button_order}>Продолжить</button>
                ) : null}
              </div>
              <div className={s.cart__footer_right}>
                <Select
                  className="cart__footer_select_ant"
                  popupClassName="cart__footer_select_popup"
                  placeholder={"Район самовывоза"}
                  value={selectedPlace}
                  onChange={handleChange}
                  options={productStore}
                  optionLabelProp={"label"}
                  optionRender={(option) => {
                    return (
                      <div className="select__place-item">
                        {option?.data.value}
                      </div>
                    )
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className={s.cart__empty}>
            <Empty description={"Корзина пуста"}/>
          </div>
        )}
      </div>
      <Modal title="Ваш заказ" open={isModalOrderOpen} onOk={handleSend} onCancel={handleCancel} cancelText={'Отмена'}
             okText={'Оформить заказ'}>
        <ul className={s.order__items}>
          {userCart.map((item) => {
            return (
              <li key={item.title} className={s.order__item}>
                <div className={s.order__item_body}>
                  <img className={s.order__item_photo} src={`${SITE}api/image/stickers/${item.photo}`}
                       alt={item.title}/>
                  <div className={s.order__item_info}>
                    <h5 className={s.order__item_title}>{item.title}</h5>
                    <div className={s.order__item_count}>
                      <span>{item.count}&nbsp;шт</span>
                      -
                      <p>{item.price}&nbsp;₽</p>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        <div className={s.order__footer}>
          <div className={s.cart__results}>
            <div className={s.cart__total_count}>{getTotalSumCart(userCart).totalCount}&nbsp;шт</div>
            <div className={s.cart__total_sum}><span>Итого:</span>&nbsp;{getTotalSumCart(userCart).totalSum}&nbsp;₽
            </div>
          </div>
          <div className={s.order__phone}>
            <InputMask
              className='input__phone'
              placeholder='Телефон для связи'
              mask='(+7) 999 999 99 99'
              value={phone}
              onChange={handleInputPhone}>
            </InputMask>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Cart;
