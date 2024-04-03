import React, {useEffect, useState} from 'react';
import s from './Cart.module.css';
import Header from "../../Header/Header";
import {checkAvailable, getTotalSumCart} from "../../../utils/cartUtils";
import CartItem from "../../CartItem/CartItem";
import {Empty, Select} from "antd";
import {SITE} from "../../../utils/consts";
import axios from "axios";
import {useProductsCountStore, useUsersStore} from "../../../services/store";

const Cart = ({cart}) => {

  const currentUser = useUsersStore((state) => state.currentUser);

  const selectedPlace = useUsersStore((state) => state.selectedPlace);
  const updateSelectedPlace = useUsersStore((state) => state.updateSelectedPlace);

  const available = useUsersStore((state) => state.available);
  const updateAvailable = useUsersStore((state) => state.updateAvailableProducts);


  const [requested, setRequested] = useState(false);

  const productStore = useProductsCountStore((state) => state.productStore);

  useEffect(() => {
    updateAvailable(checkAvailable(productStore, cart, selectedPlace))
  }, [cart, available]);


  const handleChange = (value) => {
    updateSelectedPlace(value)
    updateAvailable(checkAvailable(productStore, cart, value))
  };


  const sendOrderData = () => {
    if (currentUser.id && selectedPlace) {
      axios
        .post(SITE + `api/order`, {
          orderData: {
            user: currentUser,
            cart: cart,
            selectedPlace: selectedPlace,
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
                <button onClick={sendOrderData} className={s.cart__button_order}>Оформить заказ</button>
              ) : null}
            </div>
            <div className={s.cart__footer_select}>
              <span className={s.cart__footer_select_title}>Район самовывоза:</span>
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
  );
};

export default Cart;
