import React from 'react';
import s from './Counter.module.css';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useUsersStore} from "../../services/store";

const Counter = ({product}) => {

  const userCart = useUsersStore((state) => state.cart);
  const updateUserCart = useUsersStore((state) => state.updateCart);

  // const index = userCart.findIndex(el => el.title === product);

  console.log(userCart)

  console.log(1)

  return (
    <div className={s.counter}>
      <div className={s.counter__body}>
        <button className={s.counter__button}><RemoveIcon /></button>
        <input className={s.counter__input} type="number" value={''} disabled={true}/>
        <button className={s.counter__button}><AddIcon /></button>
      </div>
    </div>
  );
};

export default Counter;