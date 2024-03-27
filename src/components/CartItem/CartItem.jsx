import React from 'react';
import s from './CartItem.module.css';
import {SITE} from "../../utils/consts";
import Counter from "../Counter/Counter";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {Image} from "antd";
import {useUsersStore} from "../../services/store";


const CartItem = ({title, photo, count, price}) => {

  const userCart = useUsersStore((state) => state.cart);
  const updateUserCart = useUsersStore((state) => state.updateCart);

  const deleteItem = () => {
    const filteredItems = userCart.filter(item => item.title !== title);
    updateUserCart(filteredItems);
  }


  return (
    <li className={s.cart__item}>
      <div className={s.cart__item_info}>
        <div className={s.cart__item_info_left}>
          <div className={s.cart__item_photo}>
            <Image
              preview={{
                mask: false,
                src: `${SITE}api/image/stickers/${photo}`,
                imageRender: () => (
                  <div className="sticker__preview">
                    <img src={`${SITE}api/image/stickers/${photo}`} alt={title}/>
                  </div>
                ),
                toolbarRender: () => null,
              }}
              src={`${SITE}api/image/stickers/${photo}`}
              alt={title}
            />
          </div>
          <h5 className={s.cart__item_title}>{title}</h5>
        </div>
        <div className={s.cart__item_info_right}>
          <div className={s.cart__item_counter}><Counter product={title}/></div>
          <div className={s.cart__item_sum}>{count * price}&nbsp;₽</div>
        </div>
      </div>
      <div className={s.cart__item_delete}>
        <Tooltip onClick={deleteItem} title="Удалить">
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
      </div>
    </li>
  );
};

export default CartItem;
