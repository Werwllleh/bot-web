import React from 'react';
import s from './Cart.module.css';
import Header from "../../Header/Header";
import {getTotalSumCart} from "../../../utils/cartUtils";
import CartItem from "../../CartItem/CartItem";
import InventoryIcon from '@mui/icons-material/Inventory';
import {Select} from "antd";

const Cart = ({cart}) => {

  // getTotalSumCart(cart)
  // console.log(getTotalSumCart(cart))

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };


  return (
    <div className={s.cart__body}>
      <Header title={"Корзина"}/>
      {cart.length ? (
        <>
          <ul className={s.cart__items}>
            {cart.map((item) => {
              return <CartItem key={item.title} title={item.title} photo={item.photo} count={item.count} price={item.price} />
            })}
          </ul>
          <div className={s.cart__footer}>
            <div className={s.cart__footer_left}>
              <div className={s.cart__results}>
                <div className={s.cart__total_count}>{getTotalSumCart(cart).totalCount}&nbsp;шт</div>
                <div className={s.cart__total_sum}><span>Итого:</span>&nbsp;{getTotalSumCart(cart).totalSum}&nbsp;₽</div>
              </div>
              <button className={s.cart__button_order}>Оформить заказ</button>
            </div>
            <div className={s.cart__footer_select}>
              <Select
                // defaultValue="lucy"
                placeholder={'Район самовывоза'}
                onChange={handleChange}
                options={[
                  {
                    value: 'jack',
                    label: 'Jack',
                  },
                  {
                    value: 'lucy',
                    label: 'Lucy',
                  },
                  {
                    value: 'Yiminghe',
                    label: 'yiminghe',
                  },
                  {
                    value: 'disabled',
                    label: 'Disabled',
                    disabled: true,
                  },
                ]}
              />
            </div>
          </div></>
      ) : (
        <div className={s.cart__empty}>
          <span className={s.cart__empty_icon}><InventoryIcon /></span>
          <p>Корзина пуста</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
