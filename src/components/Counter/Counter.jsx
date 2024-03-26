import React from 'react';
import s from './Counter.module.css';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useUsersStore} from "../../services/store";

const Counter = ({ product }) => {
  const userCart = useUsersStore((state) => state.cart);
  const updateUserCart = useUsersStore((state) => state.updateCart);

  const item = userCart.find(el => el.title === product);
  const index = userCart.findIndex(el => el.title === product);

  const addItem = () => {
    if (item) {
      const updatedCart = [...userCart];
      updatedCart[index].count += 1;
      updateUserCart(updatedCart);
    }
  };

  const removeItem = () => {
    if (item && item.count > 1) {
      const updatedCart = [...userCart];
      updatedCart[index].count -= 1;
      updateUserCart(updatedCart);
    }
  };

  return (
    <div className={s.counter}>
      <div className={s.counter__body}>
        <button onClick={removeItem} className={s.counter__button}><RemoveIcon /></button>
        <span>{item ? item.count : 0}</span>
        <button onClick={addItem} className={s.counter__button}><AddIcon /></button>
      </div>
    </div>
  );
};

export default Counter;