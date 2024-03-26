import React from 'react';
import s from './Cart.module.css';
import Header from "../../Header/Header";
import {getTotalSumCart} from "../../../utils/cartUtils";
import {SITE} from "../../../utils/consts";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {Image} from "antd";
import Counter from "../../Counter/Counter";

const Cart = ({cart}) => {

  // getTotalSumCart(cart)

  // console.log(cart)

  return (
    <div className={s.cart__body}>
      <Header title={"Корзина"}/>
      <ul className={s.cart__items}>
        {cart.map((item) => {
          return (
            <li key={item.title} className={s.cart__item}>
              <div className={s.cart__item_info}>
                <div className={s.cart__item_info_left}>
                  <div className={s.cart__item_photo}>
                    <Image
                      preview={{
                        mask: false,
                        src: `${SITE}api/image/stickers/${item.photo}`,
                        imageRender: () => (
                          <div className="sticker__preview">
                            <img src={`${SITE}api/image/stickers/${item.photo}`} alt={item.title}/>
                          </div>
                        ),
                        toolbarRender: () => null,
                      }}
                      src={`${SITE}api/image/stickers/${item.photo}`}
                      alt={item.title}
                    />
                  </div>
                  <h5 className={s.cart__item_title}>{item.title}</h5>
                </div>
                <div className={s.cart__item_info_right}>
                  <div className={s.cart__item_counter}><Counter product={item.title} /></div>
                  <div className={s.cart__item_sum}>{item.count * item.price}&nbsp;₽</div>
                </div>
              </div>
              <div className={s.cart__item_delete}>
                <Tooltip onClick={() => console.log('click')} title="Удалить">
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </li>
          )
        })}
      </ul>
      <div className={s.cart__results}>

      </div>
      <div className={s.cart__footer}></div>
    </div>
  );
};

export default Cart;