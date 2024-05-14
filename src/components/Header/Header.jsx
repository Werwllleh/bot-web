import React, {useEffect, useState} from "react";
import MenuBurgerButton from "../MenuBurgerButton/MenuBurgerButton";
import {Link} from "react-router-dom";
import {FormOutlined, MessageOutlined} from "@ant-design/icons";
import {useUsersStore} from "../../services/store";
import {admins} from "../../utils/consts";

const Header = ({ title }) => {

  const currentUser = useUsersStore((state) => state.currentUser);

  const [menuActive, setMenuActive] = useState(false);

  const menuClick = () => {
    setMenuActive(!menuActive)
  }

  const closeMenu = (e) => {
    if (e.target.className === 'header__drawer active') {
      setMenuActive(false)
    }
  };


  return (
    <>
      <header className={`header ${menuActive ? 'active' : ''}`}>
        <div className={"header__menu-burger"}>
          <MenuBurgerButton active={menuActive} onClick={menuClick}/>
        </div>
        <div className={"header__body"}>
          <h1 className={"title"}>{title}</h1>
        </div>
        <div onClick={closeMenu} className={`header__drawer ${menuActive ? 'active' : ''}`}>
          <div className="header__drawer-content">
            <ul className="header__drawer-links">
              <li>
                <Link className="header__drawer-link" to={"/feedback"}>
                  <span className="header__drawer-link-icon"><MessageOutlined /></span>
                  <p className="header__drawer-link-text">Отзывы</p>
                </Link>
              </li>
            </ul>
            {admins.includes(currentUser.id) && !location.pathname.startsWith('/admin') ? (
              <Link className="header__drawer-admin-btn" to={"/admin"}>
                <span className="header__drawer-link-icon"><FormOutlined /></span>
                <p className="header__drawer-link-text">Админка</p>
              </Link>
            ) : null}
          </div>
        </div>
      </header>
    </>

  );
};

export default Header;
