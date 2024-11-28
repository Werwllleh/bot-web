import React, {useEffect, useState} from "react";
import MenuBurgerButton from "./MenuBurgerButton/MenuBurgerButton";
import {Link, NavLink} from "react-router-dom";
import {CloseOutlined, FormOutlined, MessageOutlined} from "@ant-design/icons";
import {useUsersStore} from "../services/store";
import {adminPages, menu, route, socialLinks} from "../utils/consts";
import MainLogo from "./MainLogo";
import {checkObject} from "../utils/checkObject";

const Header = ({color}) => {

  const userData = useUsersStore((state) => state.userData);
  const isAdmin = useUsersStore((state) => state.isAdmin);

  const [isMenuActive, setIsMenuActive] = useState(false);

  const showMenu = () => {
    setIsMenuActive(!isMenuActive);
  }

  return (
    <>
      <header className={`header`} style={{backgroundColor: color}}>
        <div className="header__body">
          <div className="header__logo">
            <Link to={route.CARS.url}><MainLogo/></Link>
          </div>
          <div className="header__right">
            <div className="header__links">
              {socialLinks.map(social => (
                <Link className="header__link-social" key={social.title} to={social.link}>{social.icon}</Link>
              ))}
            </div>
            {checkObject(userData) && (
              <button className={`header__menu ${isMenuActive ? 'active' : ''}`} onClick={showMenu}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            )}
          </div>
        </div>
      </header>
      <div className="menu">
        <div onClick={() => setIsMenuActive(false)} className={`bg-wrap ${isMenuActive ? 'active' : ''}`}></div>
        <div className={`menu__wrap ${isMenuActive ? 'active' : ''}`}>
          <div onClick={() => setIsMenuActive(false)} className="menu__close">
            <CloseOutlined/>
          </div>
          <div className="menu__body">
            <div className="menu__header"></div>
            <div className="menu__profile">
              {checkObject(userData) && (
                <div className="header__profile">
                  <Link onClick={() => setIsMenuActive(false)} style={{backgroundColor: userData?.user_color}}
                        className="header__profile-link"
                        to={route.PROFILE.url}>
                    <span>{userData.user_name?.slice(0, 2).toUpperCase()}</span>
                  </Link>
                </div>
              )}
            </div>
            <nav className="menu__nav">
              <ul className="menu__nav-list">
                {menu.map(route => {
                  return (
                    <li key={route.url} className="menu__nav-item">
                      <NavLink className={({ isActive }) => `menu__nav-link${isActive ? " active" : ""}`} onClick={() => setIsMenuActive(false)}
                            to={route.url}>{route.title}</NavLink>
                    </li>
                  )
                })}
              </ul>
              {isAdmin && (
                <div className="menu__admin">
                  {/*<h5 className="menu__admin-title">Админ панель</h5>*/}
                  <ul className="menu__nav-list menu__admin-list">
                    {adminPages.map(route => {
                      return (
                        <li key={route.url} className="menu__nav-item">
                          <NavLink
                            className={({ isActive }) => `menu__nav-link${isActive ? " active" : ""}`}
                            onClick={() => setIsMenuActive(false)}
                            to={route.url}
                          >
                            {route.title}
                          </NavLink>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </nav>
            <div className="menu__footer">
              <div className="menu__socials">
                <p>Мы в соцсетях:</p>
                <div className="menu__socials-links">
                  {socialLinks.map(social => (
                    <Link onClick={() => setIsMenuActive(false)} className="menu__socials-link" key={social.title}
                          target="_blank" to={social.link}>{social.icon}</Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Header;
