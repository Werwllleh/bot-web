import React from 'react';
import s from './Cart.module.css';
import Header from "../../Header/Header";
import {getTotalSumCart} from "../../../utils/cartUtils";
import CartItem from "../../CartItem/CartItem";
import InventoryIcon from '@mui/icons-material/Inventory';

const Cart = ({cart}) => {

  // getTotalSumCart(cart)
  // console.log(getTotalSumCart(cart))

  // console.log(cart)

  return (
    <div className={s.cart__body}>
      <Header title={"Корзина"}/>
      {cart.length ? (
        <ul className={s.cart__items}>
          {cart.map((item) => {
            return <CartItem key={item.title} title={item.title} photo={item.photo} count={item.count} price={item.price} />
          })}
        </ul>
      ) : (
        <div className={s.cart__empty}>
          <span className={s.cart__empty_icon}><InventoryIcon /></span>
          <p>Корзина пуста</p>
        </div>
      )}
      <div className={s.cart__results}>

      </div>
      <div className={s.cart__footer}></div>
    </div>
  );
};

export default Cart;