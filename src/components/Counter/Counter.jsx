import React from 'react';
import s from './Counter.module.css';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useProductsCountStore, useUsersStore} from "../../services/store";

const Counter = ({ product }) => {
  const userCart = useUsersStore((state) => state.cart);
  const updateUserCart = useUsersStore((state) => state.updateCart);

  const item = userCart.find(el => el.title === product);
  const index = userCart.findIndex(el => el.title === product);

  const selectedPlace = useUsersStore((state) => state.selectedPlace);
  const productStore = useProductsCountStore((state) => state.productStore);

  const updateAvailable = useUsersStore((state) => state.updateAvailableProducts);

  const checkProducts = () => {
    if (userCart.length && selectedPlace) {
      let filtered = productStore.filter((info) => info.value === selectedPlace);
      // Проверяем, есть ли все товары из корзины в наличии у продавца
      updateAvailable(userCart.every(item => filtered[0].products[item.id] >= item.count))
    }
  }

  const addItem = () => {
    if (item) {
      const updatedCart = [...userCart];
      updatedCart[index].count += 1;
      updateUserCart(updatedCart);
    }
    checkProducts()
  };

  const removeItem = () => {
    if (item && item.count > 1) {
      const updatedCart = [...userCart];
      updatedCart[index].count -= 1;
      updateUserCart(updatedCart);
    } else {
      const filteredItems = userCart.filter(item => item.title !== product);
      updateUserCart(filteredItems);
    }
    checkProducts()
  };

  return (
    <div className={s.counter}>
      <div className={s.counter__body}>
        <button onClick={removeItem} className={s.counter__button}><RemoveIcon /></button>
        <span className={s.counter__count}>{item ? item.count : 0}&nbsp;шт</span>
        <button onClick={addItem} className={s.counter__button}><AddIcon /></button>
      </div>
    </div>
  );
};

export default Counter;
