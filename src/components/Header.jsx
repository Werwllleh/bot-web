import React, {useEffect, useState} from "react";
import MenuBurgerButton from "./MenuBurgerButton/MenuBurgerButton";
import {Link} from "react-router-dom";
import {FormOutlined, MessageOutlined} from "@ant-design/icons";
import {useUsersStore} from "../services/store";
import {admins, route, socialLinks} from "../utils/consts";
import MainLogo from "./MainLogo";

const Header = ({ color, title }) => {

  const userData = useUsersStore((state) => state.userData);

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
            {userData && (
              <div className="header__profile">
                <Link style={{backgroundColor: userData?.user_color}} className="header__profile-link" to={route.PROFILE.url}>
                  <span>{userData.user_name?.slice(0, 2).toUpperCase()}</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>

  );
};

export default Header;
