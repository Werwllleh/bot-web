import React, {useEffect, useState} from 'react';
import s from './Cart.module.css';
import Header from "../../Header/Header";
import {checkAvailable, getTotalSumCart} from "../../../utils/cartUtils";
import CartItem from "../../CartItem/CartItem";
import {Empty, Select, Input, Modal} from "antd";
const { TextArea } = Input;
import InputMask from 'react-input-mask';
import {SITE} from "../../../utils/consts";
import axios from "axios";
import {useProductsCountStore, useUsersStore} from "../../../services/store";

const Cart = ({cart}) => {

  const currentUser = useUsersStore((state) => state.currentUser);
  const productStore = useProductsCountStore((state) => state.productStore);
  const selectedPlace = useUsersStore((state) => state.selectedPlace);
  const available = useUsersStore((state) => state.available);

  const updateSelectedPlace = useUsersStore((state) => state.updateSelectedPlace);
  const updateAvailable = useUsersStore((state) => state.updateAvailableProducts);


  const [requested, setRequested] = useState(false);
  const [orderComment, setOrderComment] = useState('');

  const [phone, setPhone] = useState('');
  const handleInputPhone = ({ target: { value } }) => setPhone(value);



  useEffect(() => {
    updateAvailable(checkAvailable(productStore, cart, selectedPlace))
  }, [cart, available]);


  const handleChange = (value) => {
    updateSelectedPlace(value)
    updateAvailable(checkAvailable(productStore, cart, value))
  };

  const textAreaChange = (e) => {
    setOrderComment(e.currentTarget.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sendOrderData = () => {
    if (currentUser.id && selectedPlace) {
      axios
        .post(SITE + `api/order`, {
          orderData: {
            phone: phone,
            user: currentUser,
            cart: cart,
            selectedPlace: selectedPlace,
            comment: orderComment.length && orderComment,
            cartTotalCount: getTotalSumCart(cart).totalCount,
            cartTotalSum: getTotalSumCart(cart).totalSum,
          },
        })
        .then((res) => {
          console.log(res);
        });
      setRequested(true);
    } else {
      alert('wtf')
    }
  };


  return (
    <>
    <div className={s.cart__body}>
      <Header title={"Корзина"}/>
      {cart.length ? (
        <>
          <ul className={s.cart__items}>
            {cart.map((item) => {
              return <CartItem key={item.title} title={item.title} photo={item.photo} count={item.count}
                               price={item.price}/>
            })}
          </ul>
          <div className="cart__comment">
            <TextArea placeholder="Комментарий к заказу" allowClear onChange={textAreaChange}  />
          </div>
          <div className={s.cart__footer}>
            <div className={s.cart__footer_left}>
              <div className={s.cart__results}>
                <div className={s.cart__total_count}>{getTotalSumCart(cart).totalCount}&nbsp;шт</div>
                <div className={s.cart__total_sum}><span>Итого:</span>&nbsp;{getTotalSumCart(cart).totalSum}&nbsp;₽
                </div>
              </div>
              {selectedPlace !== null ? (
                <span
                  className={s.cart__available}>{available ? 'В наличии' : 'По данном району продукция закончилась, выберите другой'}</span>
              ) : ''}
              {cart.length && currentUser?.id && available ? (
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
        </>
      ) : (
        <div className={s.cart__empty}>
          <Empty description={"Корзина пуста"}/>
        </div>
      )}
    </div>
      <Modal title="Ваш заказ" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText={'Отмена'} okText={'Оформить заказ'}>
        <ul className={s.order__items}>
          {cart.map((item) => {
            return (
              <li key={item.title} className={s.order__item}>
                <div className={s.order__item_body}>
                  <img className={s.order__item_photo} src={`${SITE}api/image/stickers/${item.photo}`} alt={item.title}/>
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
            <div className={s.cart__total_count}>{getTotalSumCart(cart).totalCount}&nbsp;шт</div>
            <div className={s.cart__total_sum}><span>Итого:</span>&nbsp;{getTotalSumCart(cart).totalSum}&nbsp;₽
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
