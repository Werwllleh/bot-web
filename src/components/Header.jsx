import React, {useEffect, useState} from "react";
import MenuBurgerButton from "./MenuBurgerButton/MenuBurgerButton";
import {Link} from "react-router-dom";
import {FormOutlined, MessageOutlined} from "@ant-design/icons";
import {useUsersStore} from "../services/store";
import {admins, socialLinks} from "../utils/consts";
import MainLogo from "./MainLogo";

const Header = ({ color, title }) => {

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
      <header className={`header`} style={{backgroundColor: color}}>
        <div className="header__body">
          <div className="header__logo">
            <MainLogo/>
          </div>
          <div className="header__links">
            {socialLinks.map(social => (
              <Link key={social.title} to={social.link}>{social.icon}</Link>
            ))}
          </div>
        </div>
      </header>
    </>

  );
};

export default Header;
