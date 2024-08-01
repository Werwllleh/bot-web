import React, {useState} from 'react';
import {BottomNavigation, BottomNavigationAction} from "@mui/material";

import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Link, useLocation} from "react-router-dom";
import {getTotalSumCart} from "../../utils/cartUtils";

const BottomNavigationBar = ({cart}) => {

  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <BottomNavigation sx={{width: 1, maxWidth: 500}} value={value} onChange={handleChange}>
      <Link className="bottom-navbar__link" to={'/'}>
        <BottomNavigationAction
          label="Авто"
          value="/"
          icon={<TimeToLeaveIcon/>}
          selected={location.pathname === '/'}
        />
      </Link>
      <Link className="bottom-navbar__link" to={'/searchcar'}>
        <BottomNavigationAction
          label="Поиск"
          value="/searchcar"
          icon={<SearchIcon/>}
          selected={location.pathname === '/searchcar'}
        />
      </Link>
      <Link className="bottom-navbar__link" to={'/partners'}>
        <BottomNavigationAction
          label="Партнеры"
          value="/partners"
          icon={<AssignmentIcon/>}
          selected={location.pathname === '/partners'}
        />
      </Link>
      <Link className="bottom-navbar__link" to={'/stickers'}>
        <BottomNavigationAction
          label="Товары"
          value="/stickers"
          icon={<StoreIcon/>}
          selected={location.pathname === '/stickers'}
        />
      </Link>
      <Link className="bottom-navbar__link" to={'/cart'}>
        {getTotalSumCart(cart).totalCount ? (
          <span className="cart-count">{getTotalSumCart(cart).totalCount}</span>
        ) : null}
        <BottomNavigationAction
          label="Корзина"
          value="/cart"
          icon={<ShoppingCartIcon/>}
          selected={location.pathname === '/cart'}
        />
      </Link>
    </BottomNavigation>
  );
};

export default BottomNavigationBar;
