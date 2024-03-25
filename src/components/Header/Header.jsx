import React from "react";
import s from "./Header.module.css";

const Header = ({ title }) => {

  return (
    <header className={s.header}>
      <div className={s.header__body}>
        <h1 className={s.title}>{title}</h1>
        {/*<button className={s.header__cart}>*/}
        {/*  <ShoppingCartOutlined />*/}
        {/*  {userCart.length ? (*/}
        {/*    <span className={s.header__cart_count}>{userCart.length ? userCart.length : null }</span>*/}
        {/*  ) : null }*/}
        {/*</button>*/}
      </div>
    </header>
  );
};

export default Header;
