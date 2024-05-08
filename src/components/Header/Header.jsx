import React, {useState} from "react";
import MenuBurgerButton from "../MenuBurgerButton/MenuBurgerButton";
import {Drawer} from 'antd';

const Header = ({ title }) => {

  const [menuActive, setMenuActive] = useState(false);

  const menuClick = () => {
    setMenuActive(!menuActive)
  }

  const closeMenu = () => {
    setMenuActive(false);
  };


  return (
    <>
      <header className={"header"}>
        <div className={"header__menu-burger"}>
          <MenuBurgerButton active={menuActive} onClick={menuClick}/>
        </div>
        <div className={"header__body"}>
          <h1 className={"title"}>{title}</h1>
          {/*<button className={s.header__cart}>*/}
          {/*  <ShoppingCartOutlined />*/}
          {/*  {userCart.length ? (*/}
          {/*    <span className={s.header__cart_count}>{userCart.length ? userCart.length : null }</span>*/}
          {/*  ) : null }*/}
          {/*</button>*/}
        </div>
        <div className={`header__drawer ${menuActive ? 'active' : ''}`}>
          <div className="header__drawer-content">
            wefwefwef
          </div>
        </div>
      </header>

    </>

  );
};

export default Header;
